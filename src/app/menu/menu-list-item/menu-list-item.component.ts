import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavItem } from '../nav-items';

@Component({
  selector: 'app-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: ['./menu-list-item.component.scss']
})
export class MenuListItemComponent implements OnInit {

  constructor(public router: Router) { 
    if (!this.depth) {
      this.depth = 0;
    }
  }

  ngOnInit(): void {
  }

  @Input() item: NavItem;
  @Input() depth: number;

  expanded = true;

  onItemSelected(item: NavItem) {
    if (!item.children || !item.children.length) {
      this.router.navigate([item.route]);
    }
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }
  
}
