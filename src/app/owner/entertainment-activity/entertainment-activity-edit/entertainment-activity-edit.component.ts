import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrManager } from 'ng6-toastr-notifications';
import { forkJoin } from 'rxjs';
import { RenterService } from 'src/app/renter/shared/renter.service';
import { Message } from 'src/app/utils/message.model';
import { EntertainmentActivityPlaceSearchObject } from '../../shared/entertainment-activity-place-search.model';
import { OwnerService } from '../../shared/owner.service';
import { EntertainmentActivity } from '../shared/entertainment-activity.model';
import { EntertainmentActivityOutput } from './shared/entertainment-activity-output.model';

@Component({
  selector: 'app-entertainment-activity-edit',
  templateUrl: './entertainment-activity-edit.component.html',
  styleUrls: ['./entertainment-activity-edit.component.scss']
})
export class EntertainmentActivityEditComponent implements OnInit {

  entActivityPlaceSearchObj: EntertainmentActivityPlaceSearchObject;
  entActivityOutput: EntertainmentActivityOutput = new EntertainmentActivityOutput();
  canRender = false;
  entActivity: EntertainmentActivity;

  constructor(private ownerService: OwnerService,
    private renterService: RenterService,
    private dialogRef: MatDialogRef<EntertainmentActivityEditComponent>, 
    private toastr: ToastrManager, 
    @Inject(MAT_DIALOG_DATA) data) { 
      this.entActivityPlaceSearchObj = data;
  }

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData() {
    this.entActivityOutput.entertainmentActivityId = this.entActivityPlaceSearchObj.entertainmentActivity;
    this.entActivityOutput.entertainmentPlaceId = this.entActivityPlaceSearchObj.entertainmentPlace;
    forkJoin([this.ownerService.getEntertainmentActivityFromPlace(this.entActivityOutput), this.renterService.findEntertainmentActivity(this.entActivityPlaceSearchObj.entertainmentActivity.toString())]).subscribe(([entActivityOut, entActivity]) => {
      this.entActivityOutput = entActivityOut;
      this.entActivity = entActivity;
      this.canRender = true;
    });
  }

  onCancelModifications() {
    this.dialogRef.close();
  }

  onSaveModifications() {
    this.updateEntertainmentActivity();
    this.dialogRef.close();
  }

  private updateEntertainmentActivity(): void {
    this.ownerService.updateEntertainmentActivity(this.entActivityOutput).subscribe(data => {
      this.toastr.infoToastr(Message.ENTITY_UPDATED_SUCCESSFULLY, Message.INFORMATION);
    });
  }

  isSaveDisabled(): boolean {
    return (!this.entActivityOutput.price || !this.entActivityOutput.maxPeopleAllowed);
  }

}
