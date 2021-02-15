    import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SERVER_URL } from "src/app/app.component";
import { AbstractService } from "src/app/commons/abstract-service.model";
import { ReservationInput } from "src/app/renter/reservation-scheduler/shared/reservation-input.model";
import { EntertainmentActivityOutput } from "../entertainment-activity/entertainment-activity-edit/shared/entertainment-activity-output.model";
import { EntertainmentActivity } from "../entertainment-activity/shared/entertainment-activity.model";
import { EntertainmentPlaceOutput } from "./entertainment-place-output.model";
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

    deleteEntertainmentPlace(id: string): Observable<Object> {
        let url = OWNER_URL + "/delete-entertainment-place/" + id;
        return this.http.delete(url);
    }

    getAllActiveReservationsFromOwner(): Observable<ReservationInput[]> {
        let url = OWNER_URL + "/all-active-reservations-from-owner";
        return this.http.get<ReservationInput[]>(url);
    }

    updateEntertainmentPlaces(place: EntertainmentPlace): Observable<Object> {
        let url = OWNER_URL + "/update-entertainment-place";
        return this.http.post<EntertainmentPlace>(url, place);
    }

    updateEntertainmentActivity(entAct: EntertainmentActivityOutput): Observable<Object> {
        let url = OWNER_URL + "/update-entertainment-activity";
        return this.http.post<EntertainmentActivityOutput>(url, entAct);
    }

    getEntertainmentActivityFromPlace(entAct: EntertainmentActivityOutput): Observable<EntertainmentActivityOutput> {
        let url = OWNER_URL + "/entertainment-activity-from-place";
        return this.http.post<EntertainmentActivityOutput>(url, entAct);
    }

    deleteEntertainmentActivityFromPlace(entAct: EntertainmentActivityOutput): Observable<Object> {
        let url = OWNER_URL + "/delete-entertainment-activity-from-place";
        return this.http.post<EntertainmentActivityOutput>(url, entAct);
    }

    createEntertainmentActivityForPlace(entAct: EntertainmentActivityOutput): Observable<Object> {
        let url = OWNER_URL + "/create-entertainment-activity-for-place";
        return this.http.post<EntertainmentActivityOutput>(url, entAct);
    }
}