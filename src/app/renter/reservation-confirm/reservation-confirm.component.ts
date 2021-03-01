import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrManager } from 'ng6-toastr-notifications';
import { forkJoin } from 'rxjs';
import { LoginService } from 'src/app/login/shared/login.service';
import { PaymentService } from 'src/app/payment/shared/payment.service';
import { Message } from 'src/app/utils/message.model';
import { environment } from 'src/environments/environment';
import { ReservationOutput } from '../reservation-scheduler/shared/reservation-output.model';
import { SharedData } from '../reservation-scheduler/shared/shared-data.model';
import { RenterService } from '../shared/renter.service';
import { Card } from './shared/card.model';
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
    private paymentService: PaymentService,
    @Inject(MAT_DIALOG_DATA) data) {
      this.sharedData = data;
      this.reservation = this.sharedData.reservationOutput;
      this.price = this.sharedData.price;
      this.card = new Card();
      this.createReservationConfirmFromReservation();
  }
  
  
  canRender = false;
  price: number;
  reservation: ReservationOutput;
  sharedData: SharedData;
  reservationConfirm: ReservationConfirm = new ReservationConfirm();
  card: Card;

  confirmReservation() {
    (<any>window).Stripe.setPublishableKey(environment.stripePublishableKey);
    (<any>window).Stripe.card.createToken({
      number: this.card.number,
      exp_month: this.card.exp_month,
      exp_year: this.card.exp_year,
      cvc: this.card.cvc
    }, (status: number, response: any) => {
      if (status === 200) {
        let token = response.id;
        forkJoin([
          this.paymentService.chargeCard(token, this.price),
          this.renterService.createReservation(this.reservation)
        ]).subscribe(([paymentResponse, reservationResponse]) => {
          this.toastr.successToastr("Reservation created successfully!", Message.INFORMATION);
          this.dialogRef.close();
        });
      }
    }); 

  }

  abortReservation() {
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

  ngOnInit(): void {
  }

  isOkDisabled(): boolean {
    return (!this.card.cvc || this.card.cvc.trim() === "" 
      || !this.card.exp_month || this.card.exp_month.trim() === ""
      || !this.card.exp_year || this.card.exp_year.trim() === ""
      || !this.card.number || this.card.number.trim() === "" || !(this.card.number.trim().length === 16));
  }
 
}
