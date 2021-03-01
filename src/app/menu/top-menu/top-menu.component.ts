import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { LoginService } from 'src/app/login/shared/login.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private toastr: ToastrManager,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  logout() {
    this.loginService.logout();
    this.toastr.successToastr("Logout successfully!");
    this.router.navigate(['']);
  }

}
