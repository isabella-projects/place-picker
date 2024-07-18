import {
    Component,
    DestroyRef,
    inject,
    OnInit,
    signal,
    ViewEncapsulation,
} from '@angular/core';

import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';

import { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
    selector: 'app-available-places',
    standalone: true,
    templateUrl: './available-places.component.html',
    styleUrl: './available-places.component.css',
    imports: [PlacesComponent, PlacesContainerComponent],
    encapsulation: ViewEncapsulation.None,
})
export class AvailablePlacesComponent implements OnInit {
    places = signal<Place[] | undefined>(undefined);
    isFetching = signal<boolean>(false);
    error = signal<string>('');

    private placesService = inject(PlacesService);
    private destroyRef = inject(DestroyRef);

    ngOnInit(): void {
        this.isFetching.set(true);

        const subscription = this.placesService
            .loadAvailablePlaces()
            .subscribe({
                next: (places) => {
                    this.places.set(places);
                },
                error: (error: Error) => {
                    this.error.set(error.message);
                },
                complete: () => this.isFetching.set(false),
            });

        this.destroyRef.onDestroy(() => {
            subscription.unsubscribe();
        });
    }

    onSelectPlace(selectedPlace: Place) {
        const subscription = this.placesService
            .addPlaceToUserPlaces(selectedPlace)
            .subscribe();
        this.destroyRef.onDestroy(() => {
            subscription.unsubscribe();
        });
    }
}
