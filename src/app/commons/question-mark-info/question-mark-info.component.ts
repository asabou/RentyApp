import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-mark-info',
  templateUrl: './question-mark-info.component.html',
  styleUrls: ['./question-mark-info.component.scss']
})
export class QuestionMarkInfoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() text: string = "help button";
}
