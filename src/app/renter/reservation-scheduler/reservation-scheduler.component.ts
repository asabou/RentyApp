import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { share } from 'rxjs/operators';
import { LoginService } from 'src/app/login/shared/login.service';
import { EntertainmentActivityPlaceSearchObject } from 'src/app/owner/shared/entertainment-activity-place-search.model';
import { DateUtils } from 'src/app/utils/date-utils.model';
import { DialogUtils } from 'src/app/utils/dialog-utils.model';
import { ReservationConfirmComponent } from '../reservation-confirm/reservation-confirm.component';
import { RenterService } from '../shared/renter.service';
import { ReservationOutput } from './shared/reservation-output.model';
import { SharedData } from './shared/shared-data.model';

@Component({
  selector: 'app-reservation-scheduler',
  templateUrl: './reservation-scheduler.component.html',
  styleUrls: ['./reservation-scheduler.component.scss']
})
export class ReservationSchedulerComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private renterService: RenterService, private matDialog: MatDialog, private loginService: LoginService) {}
 
  reservations: ReservationOutput[];
  canRender = false;
  schedulerMatrix: string[][] = [];
  reservationConfirmRef: MatDialogRef<ReservationConfirmComponent>;
  subs: Subscription;
  price: number;

  getAllData(): void {
    this.getActiveReservationsForActivityAndPlace();
    this.getPriceFromUrl();
    this.canRender = true;
  }

  ngOnInit(): void {
    this.getAllData();
    this.subs = interval(4000).subscribe(() => {
      this.getActiveReservationsForActivityAndPlace();
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onCellClick(i: number, j: number) {
    if (this.schedulerMatrix[i][j] === "") {
      this.openReservationConfirmDialog(i,j);
    }
  }

  private openReservationConfirmDialog(i: number, j: number): void {
    let dialogConfig = DialogUtils.createDefaultPanelDialogConfig(500);
    let sharedData = new SharedData();
    sharedData.price = this.price;
    sharedData.reservationOutput = this.createReservationOutput(i,j);
    dialogConfig.data = sharedData;
    this.reservationConfirmRef = this.matDialog.open(
      ReservationConfirmComponent, 
      dialogConfig
    );
    this.reservationConfirmRef.afterClosed().subscribe(result => {
      this.reservationConfirmRef = null;
    });
  }

  private createReservationOutput(i: number, j: number): ReservationOutput {
    let reservation = new ReservationOutput();
    let searchObj = this.getEntertainmentActivityPlaceSearchObjectFromUrl();
    reservation.entertainmentActivityId = searchObj.entertainmentActivity;
    reservation.entertainmentPlaceId = searchObj.entertainmentPlace;
    reservation.reservationDate = this.getDateFromIndex(j);
    reservation.reservationHour = this.getHourFromIndex(i);
    reservation.rentalRepresentativeId = this.loginService.getUserIdFromToken();
    return reservation;
  }

  private getActiveReservationsForActivityAndPlace(): void {
    let searchObj: EntertainmentActivityPlaceSearchObject = this.getEntertainmentActivityPlaceSearchObjectFromUrl();
    this.renterService.findAllActiveReservationsForActivityAndPlace(searchObj).subscribe(actReservations => {
      this.reservations = actReservations;
      this.initSchedulerMatrix();
      this.populateSchedulerMatrixWithActiveReservations();
    });
  }

  private populateSchedulerMatrixWithActiveReservations(): void {
    for (let reservation of this.reservations) {
      let j = this.getIndexOfDayFromReservation(reservation);
      let i = this.getIndexOfHourFromReservation(reservation);
      this.schedulerMatrix[i][j] = "Rented";
    }
  }

  getCellColor(i: number, j: number) {
    let color = "#FFFFFF";
    if (this.schedulerMatrix[i][j] !== "") {
      color = "#a7b0a9";
    }
    return color;
  }

  private getEntertainmentActivityPlaceSearchObjectFromUrl(): EntertainmentActivityPlaceSearchObject {
    let searchObj: EntertainmentActivityPlaceSearchObject = new EntertainmentActivityPlaceSearchObject();
    this.route.queryParams.subscribe(params => {
      searchObj.entertainmentActivity = params["entertainmentActivity"];
      searchObj.entertainmentPlace = params["entertainmentPlace"];
    });
    return searchObj;
  }

  private getPriceFromUrl(): void {
    this.route.queryParams.subscribe(params => {
      this.price = params["price"];
    });
  }

  private initSchedulerMatrix() {
    for (let i = 0; i < 8; i++) {  //8 the number of the max hours from a day
      this.schedulerMatrix[i] = [];    
      for (let j = 0; j < 7; j++) { //7 the number of the max next days to make a reservation
        this.schedulerMatrix[i][j] = "";
      }
    }
  }

  private getIndexOfDayFromReservation(reservation: ReservationOutput): number {
    for (let day = 0; day < 7; day ++) {
      if (DateUtils.getDateAsString(DateUtils.addDaysToCurrentDate(day)) === reservation.reservationDate.toString()) {
        return day;
      }
    }
    return -1;
  }

  private getIndexOfHourFromReservation(reservation: ReservationOutput): number {
    for (let hour = 10; hour <= 18; hour ++) {
      if (reservation.reservationHour === hour) {
        return hour - 10;
      }
    }
    return -1;
  }

  getHourFromIndex(i: number): number {
    return i + 10;
  }

  getDateFromIndex(j: number): string {
    return DateUtils.getDateAsString(DateUtils.addDaysToCurrentDate(j));
  }

}
