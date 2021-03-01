import { Router } from "@angular/router";
import { ToastrManager } from "ng6-toastr-notifications";
import { Message } from "../utils/message.model";

export abstract class AbstractGuard {
    constructor(private toastr: ToastrManager, private router: Router) {}

    showWarningAndNavigateBack() {
        this.toastr.warningToastr(Message.YOU_ARE_NOT_ALLOWED_TO_ACCESS_THIS_ROUTE + "\n" + Message.PLEASE_LOGIN_WITH_A_USER_WHO_HAVE_THE_RIGHTS, Message.WARNING);
        this.router.navigate(['/']);
    }
}