import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-abstract-pie-chart',
  templateUrl: './abstract-pie-chart.component.html',
  styleUrls: ['./abstract-pie-chart.component.scss']
})
export class AbstractPieChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true
  };

  pieChartType: ChartType = "pie";

  @Input() pieChartLabels = [];
  @Input() pieChartColors = [];
  @Input() pieChartData = [];
}
