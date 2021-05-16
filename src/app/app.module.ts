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
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LeftMenuComponent } from './menu/left-menu/left-menu.component';
import { MenuListItemComponent } from './menu/menu-list-item/menu-list-item.component';
import { ToastrModule } from 'ng6-toastr-notifications';
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
import { ReservationsComponent } from './renter/reservations/reservations.component';
import { AbstractTableComponent } from './commons/abstract-table/abstract-table.component';
import { EntertainmentPlaceSearchComponent } from './owner/entertainment-places/entertainment-place-search/entertainment-place-search.component';
import { UserEditComponent } from './admin/users/user-edit/user-edit.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { UserAddComponent } from './admin/users/user-add/user-add.component';
import { EntertainmentPlaceEditComponent } from './owner/entertainment-places/entertainment-place-edit/entertainment-place-edit.component';
import { ImageBytesService } from './utils/image-bytes.service';
import { EntertainmentActivityEditComponent } from './owner/entertainment-activity/entertainment-activity-edit/entertainment-activity-edit.component';
import { EntertainmentPlaceAddComponent } from './owner/entertainment-places/entertainment-place-add/entertainment-place-add.component';
import { QuestionMarkInfoComponent } from './commons/question-mark-info/question-mark-info.component';
import { EntertainmentActivityAddComponent } from './owner/entertainment-activity/entertainment-activity-add/entertainment-activity-add.component';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxStripeModule } from 'ngx-stripe';
import { environment } from 'src/environments/environment';
import { PaymentService } from './renter/reservation-confirm/shared/payment.service';
import { StatisticsComponent } from './owner/statistics/statistics.component';
import { StatisticsSearchComponent } from './owner/statistics/statistics-search/statistics-search.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ChartsModule } from 'ng2-charts';
import { AbstractBarChartComponent } from './commons/abstract-bar-chart/abstract-bar-chart.component';
import { AbstractPieChartComponent } from './commons/abstract-pie-chart/abstract-pie-chart.component';
import { AbstractExportComponent } from './commons/abstract-export/abstract-export.component';

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
    ReservationConfirmComponent,
    ReservationsComponent,
    AbstractTableComponent,
    EntertainmentPlaceSearchComponent,
    UserEditComponent,
    UserAddComponent,
    EntertainmentPlaceEditComponent,
    EntertainmentActivityEditComponent,
    EntertainmentPlaceAddComponent,
    QuestionMarkInfoComponent,
    EntertainmentActivityAddComponent,
    StatisticsComponent,
    StatisticsSearchComponent,
    AbstractBarChartComponent,
    AbstractPieChartComponent,
    AbstractExportComponent
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
    MatIconModule,
    NoopAnimationsModule,
    MatExpansionModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxStripeModule.forRoot(environment.stripePublishableKey),
    ChartsModule
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
    ImageBytesService,
    PaymentService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
