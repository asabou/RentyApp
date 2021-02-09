import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { LoginService } from 'src/app/login/shared/login.service';
import { DialogUtils } from 'src/app/utils/dialog-utils.model';
import { ImageBytesService } from 'src/app/utils/image-bytes.service';
import { Message } from 'src/app/utils/message.model';
import { EntertainmentPlace } from '../../shared/entertainment-place.model';
import { OwnerService } from '../../shared/owner.service';
import { EntertainmentPlaceEditComponent } from '../entertainment-place-edit/entertainment-place-edit.component';

@Component({
  selector: 'app-entertainment-place-item',
  templateUrl: './entertainment-place-item.component.html',
  styleUrls: ['./entertainment-place-item.component.scss']
})
export class EntertainmentPlaceItemComponent implements OnInit {
  hasRights: boolean = false;
  image: any;
  @Output() entPlaceDelete: EventEmitter<any> = new EventEmitter<any>();
  @Output() entPlaceEdit: EventEmitter<any> = new EventEmitter<any>();
  @Input() entertainmentPlace: EntertainmentPlace;
  entPlaceEditRef: MatDialogRef<EntertainmentPlaceEditComponent>

  constructor(private loginService: LoginService, 
    private imageBytesService: ImageBytesService,
    private router: Router,
    private toastr: ToastrManager,
    private ownerService: OwnerService,
    private matDialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.hasRights = this.loginService.hasOwnerRights() && !this.loginService.hasAdminRights() || this.loginService.getUserIdFromToken() === this.entertainmentPlace.userDetails.id;
    this.image = this.imageBytesService.getImageFromBytes(this.entertainmentPlace.profileImage);
  }

  onViewActivitiesClick() {
    this.router.navigate(['entertainment-place-details', this.entertainmentPlace.id]);
  }

  onEntertainmentPlaceEditClick() {
    this.openEntertainmentPlaceEditDialog();
  }

  onEntertainmentPlaceDeleteClick() {
    this.ownerService.deleteEntertainmentPlace(this.entertainmentPlace.id.toString()).subscribe(data => {
      this.toastr.infoToastr(Message.ENT_PLACE_DELETED_SUCCESFULLY, Message.INFORMATION);
      this.entPlaceDelete.emit();
    });
  }

  private openEntertainmentPlaceEditDialog(): void {
    let dialogConfig = DialogUtils.createDefaultPanelDialogConfig(590);
    dialogConfig.data = this.entertainmentPlace.id;
    this.entPlaceEditRef = this.matDialog.open(EntertainmentPlaceEditComponent, dialogConfig);
    this.entPlaceEditRef.afterClosed().subscribe(data => {
      this.entPlaceEditRef = null;
      this.entPlaceEdit.emit();
    });
  }
}
