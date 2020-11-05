import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';


@Component({
  selector: 'app-risk-analysis-chart',
  templateUrl: './risk-analysis-chart.component.html',
  styleUrls: ['./risk-analysis-chart.component.scss']
})
export class RiskAnalysisChartComponent implements OnInit {

  chart: Chart;

  constructor() { }

  ngOnInit() {
    this.chart = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: 'Linechart'
    },
    credits: {
      enabled: false
    },
    series: [
      {
        name: 'Line 1',
        type:'line',
        data: [1,2,3]
      }
    ]
  });
  }

}
