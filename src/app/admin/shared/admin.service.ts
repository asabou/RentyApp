import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SERVER_URL } from "src/app/app.component";
import { AbstractService } from "src/app/commons/abstract-service.model";
import { Role } from "../roles/shared/role.model";
import { UserDetails } from "../users/shared/user-details.model";
import { UserSearchObject } from "../users/shared/user-search.model";
import { User } from "../users/shared/user.model";

export const ADMIN_URL = SERVER_URL + "/admin"

@Injectable()
export class AdminService extends AbstractService {
    constructor(private http: HttpClient) {
        super();
    }
    
    createAdminAccount(userDetails: UserDetails): Observable<Object> {
        let url = ADMIN_URL + "/create-user-admin";
        return this.http.post<UserDetails>(url, userDetails);
    }

    createOwnerAccount(userDetails: UserDetails): Observable<Object> {
        let url = ADMIN_URL + "/create-user-owner";
        return this.http.post<UserDetails>(url, userDetails);
    }

    deleteAccount(searchObj: UserSearchObject): Observable<Object> {
        let url = ADMIN_URL + "/delete-account";
        let params = this.getHttpParamsForUserSearchObject(searchObj);
        return this.http.delete<UserSearchObject>(url, { params: params });
    }

    updateRoleForUser(searchObj: UserSearchObject, roles: Role[]): Observable<Object> {
        let url = ADMIN_URL + "/update-roles-for-user";
        let params = this.getHttpParamsForUserSearchObject(searchObj);
        return this.http.put(url, roles, { params: params });
    }

    getAllUsers(): Observable<User[]> {
        let url = ADMIN_URL + "/all-users";
        return this.http.get<User[]>(url);
    }
    

}