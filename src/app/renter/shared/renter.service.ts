import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserDetails } from "src/app/admin/users/shared/user-details.model";
import { User } from "src/app/admin/users/shared/user.model";
import { SERVER_URL } from "src/app/app.component";
import { AbstractService } from "src/app/commons/abstract-service.model";
import { EntertainmentActivityInput } from "src/app/owner/entertainment-activity/shared/entertainment-activity-input.model";
import { EntertainmentActivity } from "src/app/owner/entertainment-activity/shared/entertainment-activity.model";
import { EntertainmentActivityPlaceSearchObject } from "src/app/owner/shared/entertainment-activity-place-search.model";
import { EntertainmentPlace } from "src/app/owner/shared/entertainment-place.model";
import { ReservationInput } from "../reservation-scheduler/shared/reservation-input.model";
import { ReservationOutput } from "../reservation-scheduler/shared/reservation-output.model";

export const RENTER_URL = SERVER_URL + "/renter";

@Injectable()
export class RenterService extends AbstractService {
    constructor(private http: HttpClient) {
        super();
    }

    deleteAccount(): Observable<Object> {
        let url = RENTER_URL + "/delete-account";
        return this.http.delete(url);
    }

    updateAccount(userDetails: UserDetails): Observable<Object> {
        let url = RENTER_URL + "/update-account";
        return this.http.put(url, userDetails); 
    }

    createReservation(reservation: ReservationOutput): Observable<Object> {
        let url = RENTER_URL + "/create-reservation";
        return this.http.post<ReservationOutput>(url, reservation);
    }

    cancelReservation(id: number): Observable<Object> {
        let url = RENTER_URL + "/cancel-reservation/" + id;
        return this.http.delete(url);
    }

    getAllActiveReservationsFromRenter(): Observable<ReservationInput[]> {
        let url = RENTER_URL + "/all-active-reservations";
        return this.http.get<ReservationInput[]>(url);
    }

    getAllActiveReservations(): Observable<ReservationInput[]> {
        let url = RENTER_URL + "/get-all-active-reservations";
        return this.http.get<ReservationInput[]>(url);
    }

    findAllActiveReservationsForActivityAndPlace(searchObj: EntertainmentActivityPlaceSearchObject): Observable<ReservationOutput[]> {
        let url = RENTER_URL + "/active-reservations-for-activity-place";
        let params = this.getHttpParamsForEntertainmentActivityPlaceSearchObject(searchObj);
        return this.http.get<ReservationOutput[]>(url, { params: params });
    }

    searchEntertainmentPlaceByFilter(filter: string): Observable<EntertainmentPlace[]> {
        let url = RENTER_URL + "/search-entertainment-place/" + filter;
        return this.http.get<EntertainmentPlace[]>(url);
    }

    resetPassword(user: User): Observable<Object> {
        let url = RENTER_URL + "/reset-password";
        return this.http.put<User>(url, user);
    }

    getEntertainmentActivitiesByEntertainmentPlaceId(id: string): Observable<EntertainmentActivityInput[]> {
        let url = RENTER_URL + "/entertainment-activities-by-entertainment-place/" + id;
        return this.http.get<EntertainmentActivityInput[]>(url);
    }

    findEntertainmentPlace(id: string): Observable<EntertainmentPlace> {
        let url = RENTER_URL + "/find-entertainment-place/" + id;
        return this.http.get<EntertainmentPlace>(url);
    }

    findEntertainmentActivity(id: string): Observable<EntertainmentActivity> {
        let url = RENTER_URL + "/find-entertainment-activity/" + id;
        return this.http.get<EntertainmentActivity>(url);
    }
}