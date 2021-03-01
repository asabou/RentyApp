import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractComponent } from 'src/app/commons/abstract.component';
import { LoginService } from 'src/app/login/shared/login.service';
import { RenterService } from 'src/app/renter/shared/renter.service';
import { Constants } from 'src/app/utils/constants.model';
import { DialogUtils } from 'src/app/utils/dialog-utils.model';
import { ServicesUtils } from 'src/app/utils/services-utils.model';
import { EntertainmentActivityPlaceSearchObject } from '../shared/entertainment-activity-place-search.model';
import { OwnerService } from '../shared/owner.service';
import { EntertainmentActivityEditComponent } from './entertainment-activity-edit/entertainment-activity-edit.component';
import { EntertainmentActivityOutput } from './entertainment-activity-edit/shared/entertainment-activity-output.model';
import { EntertainmentActivityInput } from './shared/entertainment-activity-input.model';

@Component({
  selector: 'app-entertainment-activity',
  templateUrl: './entertainment-activity.component.html',
  styleUrls: ['./entertainment-activity.component.scss']
})
export class EntertainmentActivityComponent extends AbstractComponent implements OnInit {
 
  @Input() entertainmentActivity: EntertainmentActivityInput;
  hasRights = false;
  entActivityPlaceSearchObj: EntertainmentActivityPlaceSearchObject = new EntertainmentActivityPlaceSearchObject();
  entActivityEditRef: MatDialogRef<EntertainmentActivityEditComponent>;
  @Output() afterUpdate: EventEmitter<any> = new EventEmitter<any>();
	
  constructor(private loginService: LoginService,
    private renterService: RenterService,
    private activeRoute: ActivatedRoute,
    private ownerService: OwnerService, 
    private router: Router,
    private matDialog: MatDialog) {
      super();
     }

  ngOnInit(): void {
    this.getAllData();
  }

  getEntityId(): number {
    return ServicesUtils.convertStringToNumber(this.activeRoute.snapshot.paramMap.get(Constants.ID));
  }

  onBookOnlineClick(): void {
    this.router.navigate(['reservation-scheduler'], { queryParams: { entertainmentPlace: this.entActivityPlaceSearchObj.entertainmentPlace , entertainmentActivity: this.entActivityPlaceSearchObj.entertainmentActivity, price: this.entertainmentActivity.entertainmentActivityPrice }});
  }

  onEditActivityClick() {
    this.openEntertainmentActivityEditDialog();
  }

  onDeleteActivityClick() {
    this.deleteActivityFromPlace();
  }

  private deleteActivityFromPlace() {
    let entAct = new EntertainmentActivityOutput();
    entAct.entertainmentActivityId = this.entActivityPlaceSearchObj.entertainmentActivity;
    entAct.entertainmentPlaceId = this.entActivityPlaceSearchObj.entertainmentPlace;
    this.ownerService.deleteEntertainmentActivityFromPlace(entAct).subscribe(data => {
      this.afterUpdate.emit();
    });
  }

  private openEntertainmentActivityEditDialog() {
    let dialogConfig = DialogUtils.createDefaultPanelDialogConfig(295);
    dialogConfig.data = this.entActivityPlaceSearchObj;
    this.entActivityEditRef = this.matDialog.open(
      EntertainmentActivityEditComponent,
      dialogConfig
    );
    this.entActivityEditRef.afterClosed().subscribe(data => {
      this.entActivityEditRef = null;
      this.getAllData();
      this.afterUpdate.emit();
    });
  }

  getAllData(): void {
    this.renterService.findEntertainmentPlace(this.getEntityId().toString()).subscribe(entPlace => {
      this.hasRights = this.loginService.hasOwnerRights() && !this.loginService.hasAdminRights() && entPlace.userDetails.id === this.loginService.getUserIdFromToken();
      this.entActivityPlaceSearchObj.entertainmentPlace = ServicesUtils.convertStringToNumber(this.getEntityId().toString());
      this.entActivityPlaceSearchObj.entertainmentActivity = this.entertainmentActivity.entertainmentActivityId;
    });
  }

  afterDelete(id: string): void {
    throw new Error('Method not implemented.');
  }

  getTableId(): string {
    throw new Error('Method not implemented.');
  }

}
