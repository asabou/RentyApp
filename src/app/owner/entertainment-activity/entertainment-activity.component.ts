import { Component, Input, OnInit } from '@angular/core';
import { EntertainmentActivityInput } from './shared/entertainment-activity-input.model';

@Component({
  selector: 'app-entertainment-activity',
  templateUrl: './entertainment-activity.component.html',
  styleUrls: ['./entertainment-activity.component.scss']
})
export class EntertainmentActivityComponent implements OnInit {

  @Input() entertainmentActivity: EntertainmentActivityInput;

  constructor() { }

  ngOnInit(): void {
  }
}
