import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-abstract-search',
  templateUrl: './abstract-search.component.html',
  styleUrls: ['./abstract-search.component.scss']
})
export class AbstractSearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public expanded: boolean = true;

  public onExpandButtonclick() {
    this.expanded = !this.expanded;
  }
}
