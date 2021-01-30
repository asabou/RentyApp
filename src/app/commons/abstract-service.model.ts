import { HttpParams } from "@angular/common/http";
import { UserSearchObject } from "../admin/users/shared/user-search.model";
import { User } from "../admin/users/shared/user.model";
import { EntertainmentPlaceSearchObject } from "../owner/shared/entertainment-place-search.model";

export class AbstractService {
    public getHttpParamsForUserSearchObject(searchObj: UserSearchObject): HttpParams {
        let params = new HttpParams();
        if (!!searchObj.id) {
            params = params.append("id", searchObj.id);
        }
        if (!!searchObj.username) {
            params = params.append("username", searchObj.username);
        } 
        return params;
    }

    public getHttpParamsForEntertainmentPlaceSearchObject(searchObj: EntertainmentPlaceSearchObject): HttpParams {
        let params = new HttpParams();
        if (!!searchObj.id) {
            params = params.append("id", searchObj.id);
        }
        if (!!searchObj.name) {
            params = params.append("name", searchObj.name);
        }
        return params;
    }
}