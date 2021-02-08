import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractComponent } from 'src/app/commons/abstract.component';
import { LoginService } from 'src/app/login/shared/login.service';
import { OwnerService } from 'src/app/owner/shared/owner.service';
import { ServicesUtils } from 'src/app/utils/services-utils.model';
import { ReservationInput } from '../reservation-scheduler/shared/reservation-input.model';
import { RenterService } from '../shared/renter.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent extends AbstractComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private renterService: RenterService,
    private ownerService: OwnerService,
    private router: Router) { 
      super();
    }
  
  reservations: ReservationInput[];
  isLoading: boolean;

  ngOnInit(): void {
    this.getAllData();
  }
  
  getReservations(): void { 
    this.isLoading = true;
    let adminRights = this.loginService.hasAdminRights();
    let ownerRights = this.loginService.hasOwnerRights();
    let renterRights = this.loginService.hasRenterRights();
    if (adminRights) { 
      this.renterService.getAllActiveReservations().subscribe(reserv => {
        this.reservations = reserv;
        this.isLoading = false;
      });
      return;
    }
    if (ownerRights) {
      this.ownerService.getAllActiveReservationsFromOwner().subscribe(reserv => {
        this.reservations = reserv;
        this.isLoading = false;
      });
      return;
    }
    if (renterRights) {
      this.renterService.getAllActiveReservationsFromRenter().subscribe(reserv => {
        this.reservations = reserv;
        this.isLoading = false;
      });
      return;
    }
  }

  getEntityId(): number {
    return 0; //not important
  }

  getAllData(): void {
    this.getReservations();
  }

  getTableId(): string {
    return "reservationTable";
  }

  afterDelete(id: string): void {
    this.renterService.cancelReservation(ServicesUtils.convertStringToNumber(id)).subscribe(data => {
      this.getReservations();
    });
  }

  onLaunchClick() {
    this.router.navigate([""]);
  }

}
