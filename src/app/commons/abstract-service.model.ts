import { HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserSearchObject } from "../admin/users/shared/user-search.model";
import { PlaceSearchObj } from "../owner/entertainment-places/entertainment-place-search/shared/place-search.model";
import { EntertainmentActivityPlaceSearchObject } from "../owner/shared/entertainment-activity-place-search.model";
import { EntertainmentPlaceSearchObject } from "../owner/shared/entertainment-place-search.model";
import { ServicesUtils } from "../utils/services-utils.model";

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

    public getHttpParamsForEntertainmentActivityPlaceSearchObject(searchObj: EntertainmentActivityPlaceSearchObject): HttpParams {
        let params = new HttpParams();
        params = params.append("entertainmentActivity", searchObj.entertainmentActivity.toString());
        params = params.append("entertainmentPlace", searchObj.entertainmentPlace.toString());
        return params;
    }

    public getHttpParamsFromPlaceSearchObj(searchObj: PlaceSearchObj): HttpParams {
        let params = new HttpParams();
        if (!ServicesUtils.isNullOrUndefinedOrEmpty(searchObj.name)) {
            params = params.append("name", searchObj.name);
        } else {
            params = params.append("name", null);
        }

        if (!ServicesUtils.isNullOrUndefinedOrEmpty(searchObj.activity)) {
            params = params.append("activity", searchObj.activity);
        } else {
            params = params.append("actvity", null);
        }
        return params;
    }

}