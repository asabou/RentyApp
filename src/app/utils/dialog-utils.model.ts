import { MatDialogConfig } from "@angular/material/dialog";

export class DialogUtils {
    static createDefaultPanelDialogConfig(width: number) {
        let dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.disableClose = true;
        dialogConfig.hasBackdrop = true;
        dialogConfig.width = width + "px";
        return dialogConfig;
    }
}