import { Component, OnInit } from '@angular/core';
import { CustomEntertainmentActivity } from './shared/custom-entertainment-activity.model';
import { CustomEntertainmentPlace } from './shared/custom-entertainment-place.model';
import { CustomReservationDate } from './shared/custom-reservation-date.model';
import { CustomReservationHour } from './shared/custom-reservation-hour.model';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  canRender = false;
  tableId = "";
  objects = [];

  constructor() { }

  ngOnInit(): void {
  }

  onSearchStarted(): void {
    this.canRender = false;
  }

  onSearchActivitiesEnded(activities: CustomEntertainmentActivity[]): void {
    this.objects = activities;
    this.tableId = "topActivities";
    this.canRender = true;
  }

  onSearchPlacesEnded(places: CustomEntertainmentPlace[]): void {
    this.objects = places;
    this.tableId = "topPlaces";
    this.canRender = true;
  }

  onSearchDatesEnded(dates: CustomReservationDate[]): void {
    this.objects = dates;
    this.tableId = "topDates";
    this.canRender = true;
  }

  onSearchHoursEnded(hours: CustomReservationHour[]): void {
    this.objects = hours;
    this.tableId = "topHours";
    this.canRender = true;
  }

}
