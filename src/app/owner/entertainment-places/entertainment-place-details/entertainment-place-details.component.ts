import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AbstractComponent } from 'src/app/commons/abstract.component';
import { RenterService } from 'src/app/renter/shared/renter.service';
import { Constants } from 'src/app/utils/constants.model';
import { ServicesUtils } from 'src/app/utils/services-utils.model';
import { EntertainmentActivityInput } from '../../entertainment-actvity/shared/entertainment-activity-input.model';
import { EntertainmentPlace } from '../../shared/entertainment-place.model';

@Component({
  selector: 'app-entertainment-place-details',
  templateUrl: './entertainment-place-details.component.html',
  styleUrls: ['./entertainment-place-details.component.scss']
})
export class EntertainmentPlaceDetailsComponent extends AbstractComponent implements OnInit {

  canRender = false;

  getAllData(): void {
    let id = this.getEntityId();
    forkJoin([this.renterService.findEntertainmentPlace(id), this.renterService.getEntertainmentActivitiesByEntertainmentPlaceId(id)]).subscribe(([entPlace, entActivities]) => {
      this.entertainmentPlace = entPlace;
      this.entertainmentActivities = entActivities;
      this.canRender = true;
    });
  }

  entertainmentPlace: EntertainmentPlace;
  entertainmentActivities: EntertainmentActivityInput[];
  
  constructor(location: Location, private activeRoute: ActivatedRoute, private renterService: RenterService) { 
    super(location);
  }

  getEntityId(): number {
    return ServicesUtils.convertStringToNumber(this.activeRoute.snapshot.paramMap.get(Constants.ID));
  }

  ngOnInit(): void {
    this.getAllData();
  }

}
