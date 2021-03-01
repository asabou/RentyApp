import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AnonService } from 'src/app/anon/shared/anon.service';
import { EntertainmentPlace } from '../../shared/entertainment-place.model';
import { OwnerService } from '../../shared/owner.service';
import { EntertainmentActivityOutput } from '../entertainment-activity-edit/shared/entertainment-activity-output.model';
import { EntertainmentActivity } from '../shared/entertainment-activity.model';

@Component({
  selector: 'app-entertainment-activity-add',
  templateUrl: './entertainment-activity-add.component.html',
  styleUrls: ['./entertainment-activity-add.component.scss']
})
export class EntertainmentActivityAddComponent implements OnInit {
  
  entertainmentActivity: EntertainmentActivityOutput;
  activities: EntertainmentActivity[] = [];

  constructor(private ownerService: OwnerService, private anonService: AnonService) { 
    this.entertainmentActivity = new EntertainmentActivityOutput();
  }

  ngOnInit(): void {
    this.getAllData();
  }

  @Output() afterAdd: EventEmitter<any> = new EventEmitter<any>();
  @Input() entertainmentPlace: EntertainmentPlace;

  onSaveEntertainmentActivityClick(): void {
    this.entertainmentActivity.entertainmentPlaceId = this.entertainmentPlace.id;
    this.ownerService.createEntertainmentActivityForPlace(this.entertainmentActivity).subscribe(data => {
      this.afterAdd.emit();
    });
  }

  onCancel(): void {
    this.entertainmentActivity.clearFields();
  }

  getAllData(): void {
    this.anonService.getAllEntertainmentActivities().subscribe(entAct => {
      this.activities = entAct;
    });
  }

  isSaveDisabled(): boolean {
    return (!this.entertainmentActivity.entertainmentActivityId || !this.entertainmentActivity.price || !this.entertainmentActivity.maxPeopleAllowed);
  }

}
