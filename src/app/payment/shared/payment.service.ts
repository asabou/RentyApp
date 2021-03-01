import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SERVER_URL } from "src/app/app.component";
import { LoginService } from "src/app/login/shared/login.service";
import { SessionObjectService } from "src/app/login/shared/session-object.service";

export const PAYMENT_URL = SERVER_URL + "/payment";

@Injectable()
export class PaymentService {
    constructor(private http: HttpClient) {}

    chargeCard(token: string, amount: number): Observable<Object> {
        let httpHeaders = new HttpHeaders({"token": token, "amount": amount.toString()});
        let url = PAYMENT_URL + "/charge";
        return this.http.post(url, null, { headers: httpHeaders });
    }
}