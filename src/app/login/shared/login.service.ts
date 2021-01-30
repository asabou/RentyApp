import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SERVER_URL } from "src/app/app.component";
import { AppUser } from "./app-user.model";
import { SessionObjectService } from "./session-object.service";
import { ServicesUtils } from "src/app/utils/services-utils.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { Role } from "src/app/admin/roles/shared/role.model";
import { SessionObject } from "./session-object.model";

export const LOGIN_URL = SERVER_URL + "/login";

export const AUTHORIZATION = "Authorization";

@Injectable()
export class LoginService {
    constructor(private http: HttpClient, private sessionObjectService: SessionObjectService) {
    }

    login(appUser: AppUser): Observable<any> {
        this.sessionObjectService.createSessionObject();

        let credentials = appUser.username;
        credentials += ":";
        credentials += appUser.password;

        let httpHeaders = new HttpHeaders();
        httpHeaders = httpHeaders.set(AUTHORIZATION, "Basic " + btoa(credentials));
        
        return this.http.post<any>(LOGIN_URL, null, {
            headers: httpHeaders,
            observe: 'response'
        })
        .pipe(
            tap((data: any) => {
                this.updateUserAuth(data.headers);
            })
        );
    }

    logout() {
        this.sessionObjectService.destroySessionObject();
    }

    updateUserAuth(headers: HttpHeaders) {
        if (headers.get(AUTHORIZATION)) {
            const token = headers.get(AUTHORIZATION).split(" ")[1];
            this.sessionObjectService.setToken(token);
        }
    }

    getTokenDecoded() {
        return ServicesUtils.jwtDecode(this.sessionObjectService.getToken());
    }

    getUsernameFromToken() {
        let decodedToken = this.getTokenDecoded();
        return decodedToken["sub"];
    }

    getUserIdFromToken() {
        let tokenDecoded = this.getTokenDecoded();
        return tokenDecoded["userId"];
    }

    isRoleInRoles(rol: string) {
        let tokenDecoded = this.getTokenDecoded();
        let roles: Role[] = tokenDecoded["authorities"];
        for (let role of roles) {
            if (role.role === rol) {
                return true;
            }
        }
        return false;
    }

    hasAdminRights() {
        return this.isRoleInRoles("ADMIN");
    }

    hasOwnerRights() {
        return this.isRoleInRoles("OWNER");
    }

    hasRenterRights() {
        return this.isRoleInRoles("RENTER");
    }

    isTokenExpired() {
        let sessionObject: SessionObject = this.sessionObjectService.getSessionObject();
        if (sessionObject) {
            let token = sessionObject.token;
            if (token) {
                let date: Date = token["exp"];
                return date.valueOf() < new Date().valueOf();
            }
        }
        return true;
    }

}