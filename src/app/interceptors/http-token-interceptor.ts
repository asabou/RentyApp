import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { AUTHORIZATION } from "../login/shared/login.service";
import { catchError } from "rxjs/operators";
import { SessionObjectService } from "../login/shared/session-object.service";
import { ToastrManager } from "ng6-toastr-notifications";
import { Message } from "../utils/message.model";
import { SERVER_URL } from "../app.component";
import { Router } from "@angular/router";

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
    constructor(private sessionObjectService: SessionObjectService,
        private toastr: ToastrManager,
        private router: Router) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let url: string = req.url;
        if (!url.includes(SERVER_URL + "/anon")) {
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
        if (url.includes(SERVER_URL + "/anon")) {
           return next.handle(req).pipe(
               catchError((error, caught) => {
                   return this.handleError(error);
               })
           );
        }
        return next.handle(req);
    }

    private handleError(err: HttpErrorResponse): Observable<any> {
        let status = err.status;
        if (status === 0 || status === 500) {
            this.toastr.errorToastr("Server is down!", Message.ERROR);
            return throwError(err);
        }
        if (status === 401 || status == 403) {
            if (err.error["message"]) {
                this.toastr.errorToastr(err.error["message"], Message.ERROR);
            } else {
                this.toastr.errorToastr(err.error, Message.ERROR);
            }
            //this.router.navigate([""]);
            return throwError(err);
        }
        if (status === 400) {
            if (err.error["message"]) {
                this.toastr.warningToastr(err.error["message"], Message.WARNING);
            } else {
                this.toastr.warningToastr(err.error, Message.ERROR);
            }
            this.router.navigate([""]);
            return throwError(err);
        }
        return null;
    }

}