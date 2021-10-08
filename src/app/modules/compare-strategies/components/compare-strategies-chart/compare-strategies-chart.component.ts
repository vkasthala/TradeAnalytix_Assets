import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-compare-strategies-chart',
  templateUrl: './compare-strategies-chart.component.html',
  styleUrls: ['./compare-strategies-chart.component.scss']
})
export class CompareStrategiesChartComponent implements OnInit {

  private chart: Chart;

  rendered: boolean;

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.rendered = true;
  }

  loadChart(chartData: any) {
    this.chart = new Chart(chartData);
  }

}
