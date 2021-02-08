import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SERVER_URL } from "src/app/app.component";
import { AbstractService } from "src/app/commons/abstract-service.model";
import { ReservationInput } from "src/app/renter/reservation-scheduler/shared/reservation-input.model";
import { ReservationOutput } from "src/app/renter/reservation-scheduler/shared/reservation-output.model";
import { EntertainmentPlaceOutput } from "./entertainment-place-output.model";
import { EntertainmentPlaceSearchObject } from "./entertainment-place-search.model";
import { EntertainmentPlace } from "./entertainment-place.model";

export const OWNER_URL = SERVER_URL + "/owner";

@Injectable()
export class OwnerService extends AbstractService {
    constructor(private http: HttpClient) {
        super();
    }

    createEntertainmentPlace(place: EntertainmentPlaceOutput): Observable<Object> {
        let url = OWNER_URL + "/create-entertainment-place";
        return this.http.post(url, place);
    }

    findAllOwnedEntertainmentPlaces(): Observable<EntertainmentPlace[]> {
        let url = OWNER_URL + "/all-owned-entertainment-places";
        return this.http.get<EntertainmentPlace[]>(url);
    }

    deleteEntertainmentPlace(searchObj: EntertainmentPlaceSearchObject): Observable<Object> {
        let url = OWNER_URL + "/delete-entertainment-place";
        let params = this.getHttpParamsForEntertainmentPlaceSearchObject(searchObj);
        return this.http.delete(url, { params: params });
    }

    getAllActiveReservationsFromOwner(): Observable<ReservationInput[]> {
        let url = OWNER_URL + "/all-active-reservations-from-owner";
        return this.http.get<ReservationInput[]>(url);
    }
}