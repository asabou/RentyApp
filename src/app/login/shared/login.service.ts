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
            this.sessionObjectService.setTableColumns();
        }
    }

    private decodeToken(token: string) {
        return ServicesUtils.jwtDecode(token);
    }

    getUsernameFromToken(): string {
        let token = this.sessionObjectService.getToken();
        let decodedToken = this.decodeToken(token);
        return decodedToken["sub"].toString();
    }

    getUserIdFromToken() {
        let token = this.sessionObjectService.getToken();
        let tokenDecoded = this.decodeToken(token);
        return tokenDecoded["userId"];
    }

    isRoleInRoles(rol: string) {
        if (this.isTokenExpired()) {
            return false;
        }
        else {
            let sessionObject: SessionObject = this.sessionObjectService.getSessionObject();
            let token = sessionObject.token;
            let tokenDecoded = this.decodeToken(token);
            let roles: Role[] = tokenDecoded["authorities"];
            for (let role of roles) {
                if (role.role === rol) {
                    return true;
                }
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
        let sessionObject = this.sessionObjectService.getSessionObject();
        if (this.isNullOrUndefinedTokenFromSessionObject(sessionObject)) {
            return true;
        } else {
            let token = sessionObject.token;
            token = this.decodeToken(token);
            let date = token["exp"];
            return date.valueOf() > new Date().valueOf();
        }
    }

    private isNullOrUndefinedTokenFromSessionObject(sessionObject: SessionObject) {
        return ServicesUtils.isNullOrUndefined(sessionObject) || ServicesUtils.isNullOrUndefined(sessionObject.token);
    }

}