import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  
  constructor(private activeRoute: ActivatedRoute, private renterService: RenterService,
    private router: Router) { 
  }

  getEntityId(): string {
    return this.activeRoute.snapshot.paramMap.get(Constants.ID);
  }

  ngOnInit(): void {
    this.getAllData();
  }

  onEntertainmentActivityClick(entAct: EntertainmentActivityInput) {
    let entertainmentActivityId = entAct.entertainmentActivityId;
    let entertainmentPlaceId = this.entertainmentPlace.id;
    this.router.navigate(['reservation-scheduler'], { queryParams: { entertainmentPlace: entertainmentPlaceId, entertainmentActivity: entertainmentActivityId }});
  }

}
