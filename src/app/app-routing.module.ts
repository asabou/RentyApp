import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolesComponent } from './admin/roles/roles.component';
import { UsersComponent } from './admin/users/users.component';
import { AdminGuard } from './guards/admin.guard';
import { OwnerGuard } from './guards/owner.guard';
import { RenterGuard } from './guards/renter.guard';
import { LoginComponent } from './login/login.component';
import { EntertainmentPlaceDetailsComponent } from './owner/entertainment-places/entertainment-place-details/entertainment-place-details.component';
import { EntertainmentPlacesComponent } from './owner/entertainment-places/entertainment-places.component';
import { StatisticsComponent } from './owner/statistics/statistics.component';
import { ReservationSchedulerComponent } from './renter/reservation-scheduler/reservation-scheduler.component';
import { ReservationsComponent } from './renter/reservations/reservations.component';
import { Constants } from './utils/constants.model';


const routes: Routes = [
  { path: 'login', 
    component: LoginComponent 
  },
  { path: 'users', 
    component: UsersComponent,
    canActivate: [AdminGuard],
  },
  { path: 'roles', 
    component: RolesComponent,
    canActivate: [AdminGuard] 
  },
  {
    path: '',
    component: EntertainmentPlacesComponent
  },
  {
    path: `entertainment-place-details/:${Constants.ID}`,
    component: EntertainmentPlaceDetailsComponent,
    canActivate: [RenterGuard]
  },
  {
    path: 'reservation-scheduler',
    component: ReservationSchedulerComponent,
    canActivate: [RenterGuard]
  },
  {
    path: 'entertainment-places',
    component: EntertainmentPlacesComponent,
    canActivate: [OwnerGuard]
  },
  {
    path: 'renter-reservations',
    component: ReservationsComponent,
    canActivate: [RenterGuard]
  },
  {
    path: 'owner-reservations',
    component: ReservationsComponent,
    canActivate: [OwnerGuard]
  },
  {
    path: 'statistics',
    component: StatisticsComponent,
    canActivate: [OwnerGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
