import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolesComponent } from './admin/roles/roles.component';
import { UsersComponent } from './admin/users/users.component';
import { AdminGuard } from './guards/admin.guard';
import { RenterGuard } from './guards/renter.guard';
import { LoginComponent } from './login/login.component';
import { EntertainmentPlaceDetailsComponent } from './owner/entertainment-places/entertainment-place-details/entertainment-place-details.component';
import { EntertainmentPlacesComponent } from './owner/entertainment-places/entertainment-places.component';
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
