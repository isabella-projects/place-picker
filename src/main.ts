import { bootstrapApplication } from '@angular/platform-browser';
import {
    HttpEventType,
    HttpHandlerFn,
    HttpRequest,
    provideHttpClient,
    withInterceptors,
} from '@angular/common/http';

import { AppComponent } from './app/app.component';
import { tap } from 'rxjs';

function loggingInterceptor(
    request: HttpRequest<unknown>,
    next: HttpHandlerFn,
) {
    /* Example of sending a cloned and changed headers
    const req = request.clone({
        headers: request.headers.set('X-DEBUG', 'TESTING'),
    });
    */

    /* Logging the outcoming request (showing available and favourite places) */
    console.log('[Outgoing Request]');
    console.log(request);

    return next(request).pipe(
        tap({
            next: (event) => {
                if (event.type === HttpEventType.Response) {
                    /* Logging the response status and the body (places object) with available and favourite places */
                    console.log('[Incoming Response]');
                    console.log(event.status);
                    console.log(event.body);
                }
            },
        }),
    );
}

bootstrapApplication(AppComponent, {
    providers: [provideHttpClient(withInterceptors([loggingInterceptor]))],
}).catch((err) => console.error(err));
