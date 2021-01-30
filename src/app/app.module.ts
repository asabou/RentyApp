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
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { RenterGuard } from './guards/renter.guard';
import { OwnerGuard } from './guards/owner.guard';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RolesComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ 
    LoginService, 
    SessionObjectService, 
    AdminService, 
    AnonService, 
    RenterService, 
    OwnerService, 
    AuthGuard, 
    AdminGuard, 
    RenterGuard, 
    OwnerGuard,
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
