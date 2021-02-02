import { Component, Input, OnInit } from '@angular/core';
import { EntertainmentActivityInput } from './shared/entertainment-activity-input.model';

@Component({
  selector: 'app-entertainment-actvity',
  templateUrl: './entertainment-actvity.component.html',
  styleUrls: ['./entertainment-actvity.component.scss']
})
export class EntertainmentActvityComponent implements OnInit {

  @Input() entertainmentActivity: EntertainmentActivityInput;

  constructor() { }

  ngOnInit(): void {
  }
}
