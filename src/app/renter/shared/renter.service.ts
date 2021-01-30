import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserDetails } from "src/app/admin/users/shared/user-details.model";
import { User } from "src/app/admin/users/shared/user.model";
import { SERVER_URL } from "src/app/app.component";
import { EntertainmentActivity } from "src/app/owner/shared/entertainment-activity.model";
import { EntertainmentPlace } from "src/app/owner/shared/entertainment-place.model";
import { ReservationInput } from "./reservation-input.model";
import { ReservationOutput } from "./reservation-output.model";

export const RENTER_URL = SERVER_URL + "/renter";

@Injectable()
export class RenterService {
    constructor(private http: HttpClient) {}

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
        let url = RENTER_URL + "/cancel-reservation" + id;
        return this.http.delete(url);
    }

    getAllActiveReservationsByUserId(id: number): Observable<ReservationInput[]> {
        let url = RENTER_URL + "/all-active-reservations/" + id;
        return this.http.get<ReservationInput[]>(url);
    }

    searchEntertainmentPlaceByFilter(filter: string): Observable<EntertainmentPlace[]> {
        let url = RENTER_URL + "/search-entertainment-place/" + filter;
        return this.http.get<EntertainmentPlace[]>(url);
    }

    resetPassword(user: User): Observable<Object> {
        let url = RENTER_URL + "/reset-password";
        return this.http.put<User>(url, user);
    }

    getEntertainmentActivitiesByEntertainmentPlaceId(id: number): Observable<EntertainmentActivity[]> {
        let url = RENTER_URL + "/entertainment-activities-by-entertainment-place/" + id;
        return this.http.get<EntertainmentActivity[]>(url);
    }
}