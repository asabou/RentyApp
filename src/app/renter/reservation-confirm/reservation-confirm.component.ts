import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrManager } from 'ng6-toastr-notifications';
import { forkJoin } from 'rxjs';
import { LoginService } from 'src/app/login/shared/login.service';
import { Message } from 'src/app/utils/message.model';
import { ReservationOutput } from '../reservation-scheduler/shared/reservation-output.model';
import { RenterService } from '../shared/renter.service';
import { ReservationConfirm } from './shared/reservation-confirm.model';

@Component({
  selector: 'app-reservation-confirm',
  templateUrl: './reservation-confirm.component.html',
  styleUrls: ['./reservation-confirm.component.scss']
})
export class ReservationConfirmComponent implements OnInit {

  constructor(
    private renterService: RenterService,
    private loginService: LoginService,
    private dialogRef: MatDialogRef<ReservationConfirmComponent>,
    private toastr: ToastrManager,
    @Inject(MAT_DIALOG_DATA) data) {
      this.reservation = data;
      this.createReservationConfirmFromReservation();
  }

  ngOnInit(): void {
  }
  
  canRender = false;
  reservation: ReservationOutput;
  reservationConfirm: ReservationConfirm = new ReservationConfirm();

  confirmReservation() {
    this.renterService.createReservation(this.reservation).subscribe(data => {
      this.toastr.successToastr("Reservation created successfully!", Message.INFORMATION)
    });
    this.dialogRef.close();
  }

  abordReservation() {
    this.dialogRef.close();
  }

  private createReservationConfirmFromReservation() {
    this.reservationConfirm.rental = this.loginService.getUsernameFromToken();
    this.reservationConfirm.reservationDate = this.reservation.reservationDate;
    this.reservationConfirm.reservationHour = this.reservation.reservationHour;
  
    forkJoin([this.renterService.findEntertainmentActivity(this.reservation.entertainmentActivityId.toString()), 
      this.renterService.findEntertainmentPlace(this.reservation.entertainmentPlaceId.toString())]).subscribe(([entAct, entPlace]) => {
        this.reservationConfirm.entertainmentActivity = entAct.name;
        this.reservationConfirm.entertainmentPlace = entPlace.name;
        this.canRender = true;
    });
  }

}
