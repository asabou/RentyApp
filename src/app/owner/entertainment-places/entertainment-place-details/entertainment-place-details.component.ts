import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { RenterService } from 'src/app/renter/shared/renter.service';
import { Constants } from 'src/app/utils/constants.model';
import { EntertainmentActivityInput } from '../../entertainment-activity/shared/entertainment-activity-input.model';
import { EntertainmentPlace } from '../../shared/entertainment-place.model';

@Component({
  selector: 'app-entertainment-place-details',
  templateUrl: './entertainment-place-details.component.html',
  styleUrls: ['./entertainment-place-details.component.scss']
})
export class EntertainmentPlaceDetailsComponent implements OnInit {

  canRender = false;
  entertainmentPlace: EntertainmentPlace;
  entertainmentActivities: EntertainmentActivityInput[];

  constructor(private activeRoute: ActivatedRoute, private renterService: RenterService) { 
  }

  getAllData(): void {
    let id = this.getEntityId();
    forkJoin([this.renterService.findEntertainmentPlace(id), this.renterService.getEntertainmentActivitiesByEntertainmentPlaceId(id)]).subscribe(([entPlace, entActivities]) => {
      this.entertainmentPlace = entPlace;
      this.entertainmentActivities = entActivities;
      this.canRender = true;
    });
  }

  getEntityId(): string {
    return this.activeRoute.snapshot.paramMap.get(Constants.ID);
  }

  ngOnInit(): void {
    this.getAllData();
  }

  afterUpdate(data: any) {
    this.canRender = false;
    this.getAllData();
  }

}
