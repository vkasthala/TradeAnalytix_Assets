import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { RiskAnalysisRequest } from '../../models/risk-analysis-request.model';
import { RiskAnalysisService } from '../../services/risk-analysis.service';


@Component({
  selector: 'app-risk-analysis-chart',
  templateUrl: './risk-analysis-chart.component.html',
  styleUrls: ['./risk-analysis-chart.component.scss']
})
export class RiskAnalysisChartComponent implements OnInit {

  chart: Chart;

  constructor(private riskAnalysisService: RiskAnalysisService) {
  }

  ngOnInit() {
  }

  loadChart(chartResult: any) {
    this.chart = new Chart(chartResult);
  }

}
