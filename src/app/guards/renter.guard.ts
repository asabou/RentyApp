import { Inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { ToastrManager } from "ng6-toastr-notifications";
import { Observable } from "rxjs";
import { LoginService } from "../login/shared/login.service";
import { AbstractGuard } from "./abstract-guard.model";

@Injectable()
export class RenterGuard extends AbstractGuard implements CanActivate {

    @Inject('loginService') private loginService: LoginService;
    
    constructor(toastr: ToastrManager, router: Router) {
        super(toastr, router);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        let hasAccess = this.loginService.hasRenterRights();
        if (!hasAccess) {
           this.showWarningAndNavigateBack();
        }
        return hasAccess;
    }
    
}