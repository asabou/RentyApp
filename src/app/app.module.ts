import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RolesComponent } from './admin/roles/roles.component';
import { UsersComponent } from './admin/users/users.component';
import { LoginService } from './login/shared/login.service';
import { SessionObjectService } from './login/shared/session-object.service';
import { AdminService } from './admin/shared/admin.service';
import { AnonService } from './anon/shared/anon.service';
import { RenterService } from './renter/shared/renter.service';
import { OwnerService } from './owner/shared/owner.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './interceptors/http-token-interceptor';
import { AdminGuard } from './guards/admin.guard';
import { RenterGuard } from './guards/renter.guard';
import { OwnerGuard } from './guards/owner.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TopMenuComponent } from './menu/top-menu/top-menu.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LayoutModule } from '@angular/cdk/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LeftMenuComponent } from './menu/left-menu/left-menu.component';
import { MenuListItemComponent } from './menu/menu-list-item/menu-list-item.component';
import { ToastrModule } from 'ng6-toastr-notifications';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { EntertainmentPlaceItemComponent } from './owner/entertainment-places/entertainment-place-item/entertainment-place-item.component';
import { EntertainmentPlacesComponent } from './owner/entertainment-places/entertainment-places.component';
import { MenuComponent } from './menu/menu.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EntertainmentPlaceDetailsComponent } from './owner/entertainment-places/entertainment-place-details/entertainment-place-details.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EntertainmentActivityComponent } from './owner/entertainment-activity/entertainment-activity.component';
import { SpinnerComponent } from './commons/spinner/spinner.component';
import { ReservationSchedulerComponent } from './renter/reservation-scheduler/reservation-scheduler.component';
import { ReservationConfirmComponent } from './renter/reservation-confirm/reservation-confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RolesComponent,
    UsersComponent,
    TopMenuComponent,
    LeftMenuComponent,
    MenuListItemComponent,
    EntertainmentPlaceItemComponent,
    EntertainmentPlacesComponent,
    MenuComponent,
    EntertainmentPlaceDetailsComponent,
    EntertainmentActivityComponent,
    SpinnerComponent,
    ReservationSchedulerComponent,
    ReservationConfirmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatListModule,
    MatExpansionModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    LayoutModule, 
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FlexLayoutModule,
  ],
  providers: [ 
    LoginService, 
    SessionObjectService, 
    AdminService, 
    AnonService, 
    RenterService, 
    OwnerService, 
    AdminGuard, 
    RenterGuard, 
    OwnerGuard,
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    { provide: LocationStrategy, useClass: PathLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
