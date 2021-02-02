import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin/shared/admin.service';
import { AppUser } from './shared/app-user.model';
import { LoginService } from './shared/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  appUser: AppUser = new AppUser();

  constructor(private loginService: LoginService,
    private adminService: AdminService) { }

  ngOnInit(): void {
    this.appUser.password = "password";
    this.appUser.username = "alex";
  }

  login() {
    this.loginService.login(this.appUser).subscribe();
  }

  logout() {
    this.loginService.logout();
  }

}
