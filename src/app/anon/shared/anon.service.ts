import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserDetails } from "src/app/admin/users/shared/user-details.model";
import { SERVER_URL } from "src/app/app.component";
import { EntertainmentActivity } from "src/app/owner/entertainment-activity/shared/entertainment-activity.model";
import { EntertainmentPlace } from "src/app/owner/shared/entertainment-place.model";

export const ANON_URL = SERVER_URL + "/anon";

@Injectable()
export class AnonService {
    constructor(private http: HttpClient) {}

    createRenterUser(userDetails: UserDetails): Observable<Object> {
        let url = ANON_URL + "/create-account";
        return this.http.post<UserDetails>(url, userDetails);
    }

    getAllEntertainmentPlaces(): Observable<EntertainmentPlace[]> {
        let url = ANON_URL + "/all-entertainment-places";
        return this.http.get<EntertainmentPlace[]>(url);
    }

    searchEntertainmentPlacesByFilter(filter: string): Observable<EntertainmentPlace[]> {
        let url = ANON_URL + "/all-entertainment-places-by/" + filter;
        return this.http.get<EntertainmentPlace[]>(url);
    }

    getEntertainmentActivitiesByEntertainmentPlaceId(id: number): Observable<EntertainmentActivity[]> {
        let url = ANON_URL + "/entertainment-activities-by-entertainment-place/" + id;
        return this.http.get<EntertainmentActivity[]>(url);
    }
}