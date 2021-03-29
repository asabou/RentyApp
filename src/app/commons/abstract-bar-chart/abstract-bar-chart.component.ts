import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-abstract-bar-chart',
  templateUrl: './abstract-bar-chart.component.html',
  styleUrls: ['./abstract-bar-chart.component.scss']
})
export class AbstractBarChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
  };
  
  @Input() barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  @Input() barChartData: ChartDataSets[] = [];


}
