import { Router } from "@angular/router";
import { ToastrManager } from "ng6-toastr-notifications";
import { Message } from "../utils/message.model";

export abstract class AbstractGuard {
    constructor(private toastr: ToastrManager, private router: Router) {}

    showWarningAndNavigateBack() {
        this.toastr.warningToastr(Message.YOU_ARE_NOT_ALLOWED_TO_ACCESS_THIS_ROUTE, Message.WARNING);
        this.router.navigate(['/']);
    }
}