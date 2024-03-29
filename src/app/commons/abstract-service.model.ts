import { HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserSearchObject } from "../admin/users/shared/user-search.model";
import { PlaceSearchObj } from "../owner/entertainment-places/entertainment-place-search/shared/place-search.model";
import { EntertainmentActivityPlaceSearchObject } from "../owner/shared/entertainment-activity-place-search.model";
import { EntertainmentPlaceSearchObject } from "../owner/shared/entertainment-place-search.model";
import { StatisticsSearchObj } from "../owner/statistics/shared/statistics-search.model";
import { DateUtils } from "../utils/date-utils.model";
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
        if (!!searchObj.name) {
            params = params.append("name", searchObj.name);
        }
        if (!!searchObj.activity) {
            params = params.append("activity", searchObj.activity);
        }
        return params;
    }

    public getHttpParamsFromStatisticsSearchObj(searchObj: StatisticsSearchObj): HttpParams {
        let params = new HttpParams();
        if (!!searchObj.dateFrom) {
            params = params.append("dateFrom", DateUtils.getDateAsString(searchObj.dateFrom));
        }
        if (!!searchObj.dateTo) {
            params = params.append("dateTo", DateUtils.getDateAsString(searchObj.dateTo));
        }
        if (!!searchObj.placeId) {
            params = params.append("placeId", searchObj.placeId.toString())
        }
        return params;
    }

}