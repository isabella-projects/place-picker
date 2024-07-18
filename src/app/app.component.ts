import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';

import { AvailablePlacesComponent } from './places/available-places/available-places.component';
import { UserPlacesComponent } from './places/user-places/user-places.component';
import { ErrorService } from './shared/error.service';
import { ErrorModalComponent } from './shared/modal/error-modal/error-modal.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
        DatePipe,
        AvailablePlacesComponent,
        UserPlacesComponent,
        ErrorModalComponent,
    ],
})
export class AppComponent {
    currentYear: Date = new Date();

    private errorService = inject(ErrorService);
    error = this.errorService.error;
}
