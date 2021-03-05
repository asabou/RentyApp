import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { UserDetails } from '../admin/users/shared/user-details.model';
import { User } from '../admin/users/shared/user.model';
import { AnonService } from '../anon/shared/anon.service';
import { RenterService } from '../renter/shared/renter.service';
import { Message } from '../utils/message.model';
import { ServicesUtils } from '../utils/services-utils.model';
import { AppUser } from './shared/app-user.model';
import { LoginService } from './shared/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  appUser: AppUser = new AppUser();
  user: UserDetails = new UserDetails(null);
  registerAs: string = "renter";
  isTokenExpired: boolean = true;
  newPassword: string = "";
  newPasswordFieldVisible: boolean = false;
  updateUser: UserDetails = new UserDetails(null);
  updateAccountVisible: boolean = false;

  constructor(
    private loginService: LoginService,
    private anonService: AnonService,
    private renterService: RenterService,
    private router: Router,
    private toastr: ToastrManager) { }

  ngOnInit(): void {
    this.appUser.password = "password";
    this.appUser.username = "alex";
    this.isTokenExpired = this.loginService.isTokenExpired();
  }

  login() {
    this.loginService.login(this.appUser).subscribe(data => {
      this.toastr.successToastr("Login successfully!");
      this.router.navigate(['']);
    },
      err => {
        this.toastr.errorToastr("Login failed! incorrect username or password!");
      }
    );
  }

  deleteAccount(): void {
    this.renterService.deleteAccount().subscribe(data => {
      this.toastr.successToastr("Account deleted successfully!");
      this.loginService.logout();
      this.router.navigate(['']);
    });
  }

  register() {
    this.user.user.password = ServicesUtils.base64Encode(this.user.user.password);
    if (this.registerAs === "renter") {
      this.anonService.createRenterUser(this.user).subscribe(data => {
        this.toastr.successToastr(Message.REGISTER_SUCCESSFULLY);
      });
    }
    if (this.registerAs === "owner") {
      this.anonService.createOwnerAccount(this.user).subscribe(data => {
        this.toastr.successToastr(Message.REGISTER_SUCCESSFULLY);
      });
    }
  }

  isLoginButtonDisabled(): boolean {
    return (!this.appUser.username || !this.appUser.password);
  }

  isRegisterButtonDisabled(): boolean {
    return (!this.user.user.username || !this.user.user.password || !this.user.firstName
      || !this.user.lastName || !this.user.email || !this.user.email);
  }

  resetPassword() {
    this.newPasswordFieldVisible = !this.newPasswordFieldVisible;
  }

  confirmReset() {
    let user: User = new User(null);
    user.password = btoa(this.newPassword);
    user.username = this.loginService.getUsernameFromToken();
    this.renterService.resetPassword(user).subscribe(data => {
      this.toastr.successToastr("Password changed successfully!");
      this.newPasswordFieldVisible = false;
    });
  }

  updateAccount(): void {
    this.renterService.findCurrentUser().subscribe(user => {
      this.updateUser = user;
      this.updateAccountVisible = !this.updateAccountVisible;
    });
  }

  isUpdateAccountButtonDisabled(): boolean {
    return (!this.updateUser.firstName || !this.updateUser.lastName || !this.updateUser.telNumber || !this.updateUser.email);
  }

  confirmUpdate(): void {
    this.renterService.updateAccount(this.updateUser).subscribe(data => {
      this.toastr.successToastr("Account updated succesfully!");
      this.router.navigate(['']);
      this.updateAccountVisible = false;
    });
  }

}
