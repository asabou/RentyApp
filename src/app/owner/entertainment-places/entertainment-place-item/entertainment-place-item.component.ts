import { Component, Input, OnInit } from '@angular/core';
import { EntertainmentPlace } from '../../shared/entertainment-place.model';

@Component({
  selector: 'app-entertainment-place-item',
  templateUrl: './entertainment-place-item.component.html',
  styleUrls: ['./entertainment-place-item.component.scss']
})
export class EntertainmentPlaceItemComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() entertainmentPlace: EntertainmentPlace;
}
