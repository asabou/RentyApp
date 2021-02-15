import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { UserDetails } from '../admin/users/shared/user-details.model';
import { AnonService } from '../anon/shared/anon.service';
import { Message } from '../utils/message.model';
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

  constructor(
    private loginService: LoginService,
    private anonService: AnonService,
    private router: Router,
    private toastr: ToastrManager) { }

  ngOnInit(): void {
    this.appUser.password = "password";
    this.appUser.username = "alex";
  }

  login() {
    this.loginService.login(this.appUser).subscribe(data => {
      this.toastr.successToastr("Login successfully!");
      this.router.navigate(['']);
    });
  }

  logout() {
    this.loginService.logout();
  }

  register() {
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

}
