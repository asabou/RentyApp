import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { AUTHORIZATION } from "../login/shared/login.service";
import { catchError } from "rxjs/operators";
import { SessionObjectService } from "../login/shared/session-object.service";
import { ToastrManager } from "ng6-toastr-notifications";
import { Message } from "../utils/message.model";

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
    constructor(private sessionObjectService: SessionObjectService,
        private toastr: ToastrManager) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authValue = req.headers.get(AUTHORIZATION);
        if (authValue && authValue.startsWith("Basic")) {
            return next.handle(req).pipe(
                catchError((error, caught) => {
                    return this.handleError(error);
                })
            );
        }

        const authReq = req.clone({
            headers: req.headers.set(AUTHORIZATION, "Bearer " + this.sessionObjectService.getToken())
        });
        return next.handle(authReq).pipe(
            catchError((error, caught) => {
                return this.handleError(error);
            })
        )
    }

    private handleError(err: HttpErrorResponse): Observable<any> {
        let status = err.status;
        if (status === 0) {
            this.toastr.errorToastr("Server is down!", Message.ERROR).config = {
                toastTimeout: 0,
                showCloseButton: true
            };
            return throwError(err);
        } else {
            this.toastr.errorToastr(err.error, Message.ERROR).config = {
                toastTimeout: 0,
                showCloseButton: true
            };
            return throwError(err);
        }
        return null;
    }

}