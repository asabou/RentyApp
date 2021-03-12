import { EventEmitter } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { LoginService } from 'src/app/login/shared/login.service';
import { EntertainmentPlace } from '../../shared/entertainment-place.model';
import { OwnerService } from '../../shared/owner.service';
import { CustomEntertainmentActivity } from '../shared/custom-entertainment-activity.model';
import { CustomEntertainmentPlace } from '../shared/custom-entertainment-place.model';
import { CustomReservationDate } from '../shared/custom-reservation-date.model';
import { CustomReservationHour } from '../shared/custom-reservation-hour.model';
import { StatisticsSearchObj } from '../shared/statistics-search.model';

@Component({
  selector: 'app-statistics-search',
  templateUrl: './statistics-search.component.html',
  styleUrls: ['./statistics-search.component.scss']
})
export class StatisticsSearchComponent implements OnInit {
	
  hasAdminRights: boolean = false;
  hasOnlyOwnerRights: boolean = false;
  searchObjActivities: StatisticsSearchObj;
  searchObjPlaces: StatisticsSearchObj;
  searchObjDates: StatisticsSearchObj;
  searchObjHours: StatisticsSearchObj;

  @Output() searchStarted: EventEmitter<any> = new EventEmitter<any>();
  @Output() searchActivitiesEnded: EventEmitter<CustomEntertainmentActivity[]> = new EventEmitter<CustomEntertainmentActivity[]>();
  @Output() searchPlacesEnded: EventEmitter<CustomEntertainmentPlace[]> = new EventEmitter<CustomEntertainmentPlace[]>();
  @Output() searchDatesEnded: EventEmitter<CustomReservationDate[]> = new EventEmitter<CustomReservationDate[]>();
  @Output() searchHoursEnded: EventEmitter<CustomReservationHour[]> = new EventEmitter<CustomReservationHour[]>();

  places: EntertainmentPlace[] = [];

  constructor(private loginService: LoginService, 
              private ownerService: OwnerService) {
    this.searchObjActivities = new StatisticsSearchObj();
    this.searchObjDates = new StatisticsSearchObj();
    this.searchObjHours = new StatisticsSearchObj();
    this.searchObjPlaces = new StatisticsSearchObj();
  }

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData(): void { 
    this.hasAdminRights = this.loginService.hasAdminRights();
    this.hasOnlyOwnerRights = this.loginService.hasOwnerRights() && !this.hasAdminRights;
    this.ownerService.findAllOwnedEntertainmentPlaces().subscribe(entPlaces => {
      this.places = entPlaces;
    });
  }
 
  onSearchTopActivities(): void {
    this.searchStarted.emit();
    this.ownerService.getTopMostRentedEntertainmentActivities(this.searchObjActivities).subscribe(activities => {
      this.searchActivitiesEnded.emit(activities);
    });
  }

  clearSearchActivities(): void {
    this.searchObjActivities.resetFields();
  }

  onSearchTopPlaces(): void {
    this.searchStarted.emit();
    this.ownerService.getTopMostRentedEntertainmentPlaces(this.searchObjPlaces).subscribe(places => {
      this.searchPlacesEnded.emit(places);
    });
  }
  
  clearSearchPlaces(): void {
    this.searchObjPlaces.resetFields();
  }

  onSearchTopDates(): void {
    this.searchStarted.emit();
    this.ownerService.getTopMostRentedReservationDate(this.searchObjDates).subscribe(dates => {
      this.searchDatesEnded.emit(dates);
    });
  }

  clearSearchDates(): void {
    this.searchObjDates.resetFields();
  }

  onSearchTopHours(): void {
    this.searchStarted.emit();
    this.ownerService.getTopMostRentedReservationHour(this.searchObjHours).subscribe(hours => {
      this.searchHoursEnded.emit(hours);
    });
  }

  clearSearchHours(): void {
    this.searchObjHours.resetFields();
  }

}
