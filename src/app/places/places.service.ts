import { inject, Injectable, signal } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, throwError } from 'rxjs';

import { Place, PlaceResponse } from './place.model';

import { ErrorService } from '../shared/error.service';

@Injectable({
    providedIn: 'root',
})
export class PlacesService {
    private errorService = inject(ErrorService);
    private httpClient = inject(HttpClient);
    private userPlaces = signal<Place[]>([]);

    loadedUserPlaces = this.userPlaces.asReadonly();

    loadAvailablePlaces() {
        return this.fetchPlaces(
            'http://localhost:3000/places',
            'Something went wrong fetching the available places! Pleas try again later!',
        );
    }

    loadUserPlaces() {
        return this.fetchPlaces(
            'http://localhost:3000/user-places',
            'Something went wrong fetching the favorite places! Pleas try again later!',
        ).pipe(
            tap({
                next: (userPlaces) => this.userPlaces.set(userPlaces),
            }),
        );
    }

    addPlaceToUserPlaces(place: Place) {
        const prevPlaces = this.userPlaces();

        if (!prevPlaces.some((p) => p.id === place.id)) {
            this.userPlaces.set([...prevPlaces, place]);
        }

        return this.httpClient
            .put('http://localhost:3000/user-places', {
                placeId: place.id,
            })
            .pipe(
                catchError((_error) => {
                    this.userPlaces.set(prevPlaces);
                    this.errorService.showError(
                        'Failed to store selected place.',
                    );
                    return throwError(
                        () => new Error('Failed to store selected place.'),
                    );
                }),
            );
    }

    removeUserPlace(place: Place) {
        const prevPlaces = this.userPlaces();

        if (prevPlaces.some((p) => p.id === place.id)) {
            this.userPlaces.set(prevPlaces.filter((p) => p.id !== place.id));
        }

        return this.httpClient
            .delete('http://localhost:3000/user-places/' + place.id)
            .pipe(
                catchError((_error) => {
                    this.userPlaces.set(prevPlaces);
                    this.errorService.showError(
                        'Failed to remove the selected place.',
                    );
                    return throwError(
                        () => new Error('Failed to remove selected place.'),
                    );
                }),
            );
    }

    private fetchPlaces(url: string, errorMsg: string) {
        return this.httpClient.get<PlaceResponse>(url).pipe(
            map((response) => response.places),
            catchError((_error) => throwError(() => new Error(errorMsg))),
        );
    }
}
