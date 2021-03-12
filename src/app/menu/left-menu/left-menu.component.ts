import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { leftMenuNavItems } from '../nav-items';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent implements OnInit {
 

  ngOnInit(): void {
  }

  constructor(private location: Location) {
  }

  navItems = leftMenuNavItems;

  back() {
    this.location.back();
  }
}
