import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { ToastrManager } from "ng6-toastr-notifications";
import { Observable } from "rxjs";
import { LoginService } from "../login/shared/login.service";
import { AbstractGuard } from "./abstract-guard.model";

@Injectable({
    providedIn: 'root'
})
export class OwnerGuard extends AbstractGuard implements CanActivate {

    constructor(private loginService: LoginService, 
        toastr: ToastrManager, 
        router: Router) {
            super(toastr, router);
        }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        let hasAccess = this.loginService.hasOwnerRights();
        if (!hasAccess) {
            this.showWarningAndNavigateBack();
        }
        return hasAccess;
    }

}