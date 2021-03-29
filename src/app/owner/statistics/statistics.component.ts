import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
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
  labels: Label[] = [];
  values = [];
  label = "No. reservations";
  data: ChartDataSets[] = [];
  showAs: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  onSearchStarted(): void {
    this.canRender = false;
  }

  onSearchActivitiesEnded(activities: CustomEntertainmentActivity[]): void {
    this.objects = activities;
    this.prepareActivitiesForChart(activities);
    this.tableId = "topActivities";
    this.data = [];
    this.data.push({data: this.values, label: this.label});
    this.canRender = true;
  }

  private prepareActivitiesForChart(activities: CustomEntertainmentActivity[]): void {
    this.labels = [];
    this.values = [];
    activities.forEach(activity => {
      this.labels.push(activity.entertainmentActivity);
      this.values.push(activity.nrReservations);
    });
  }

  onSearchPlacesEnded(places: CustomEntertainmentPlace[]): void {
    this.objects = places;
    this.preparePlacesForChart(places);
    this.tableId = "topPlaces";
    this.data = [];
    this.data.push({data: this.values, label: this.label});
    this.canRender = true;
  }

  private preparePlacesForChart(places: CustomEntertainmentPlace[]): void {
    this.labels = [];
    this.values = [];
    places.forEach(place => {
      this.labels.push(place.entertainmentPlace);
      this.values.push(place.nrReservations);
    });
  }

  onSearchDatesEnded(dates: CustomReservationDate[]): void {
    this.objects = dates;
    this.prepareDatesForChart(dates);
    this.tableId = "topDates";
    this.data = [];
    this.data.push({data: this.values, label: this.label});
    this.canRender = true;
  }

  private prepareDatesForChart(dates: CustomReservationDate[]): void {
    this.labels = [];
    this.values = [];
    dates.forEach(date => {
      this.labels.push(date.reservationDate.toString());
      this.values.push(date.nrReservations);
    });
  }

  onSearchHoursEnded(hours: CustomReservationHour[]): void {
    this.objects = hours;
    this.prepareHoursForChart(hours);
    this.tableId = "topHours";
    this.data = [];
    this.data.push({data: this.values, label: this.label});
    this.canRender = true;
  }

  private prepareHoursForChart(hours: CustomReservationHour[]): void {
    this.labels = [];
    this.values = [];
    hours.forEach(hour => {
      this.labels.push(hour.reservationHour.toString());
      this.values.push(hour.nrReservations);
    });
  }

  onShowAsEvent(data: string): void {
    this.showAs = data;
  }

}
