import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractComponent } from 'src/app/commons/abstract.component';
import { leftMenuNavItems } from '../nav-items';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent extends AbstractComponent implements OnInit {
  getAllData(): void {
    //not important here
  }
  getEntityId(): number {
     return 0; //not important here
  }

  ngOnInit(): void {
  }

  constructor(location: Location) {
    super(location);
  }

  navItems = leftMenuNavItems;
}
