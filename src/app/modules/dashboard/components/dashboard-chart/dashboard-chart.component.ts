import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { ChartRequest } from 'src/app/modules/reports/model/chart-request.model';
import { ReportDataService } from 'src/app/modules/reports/services/report-data.service';
import { ReportRequestService } from 'src/app/modules/reports/services/report-request.service';

@Component({
  selector: 'app-dashboard-chart',
  templateUrl: './dashboard-chart.component.html',
  styleUrls: ['./dashboard-chart.component.scss']
})
export class DashboardChartComponent implements OnInit {

  protected chart: Chart;

  constructor(protected reportId: string, protected reportRequestService: ReportRequestService, protected reportDataService: ReportDataService) {
  }

  ngOnInit() {
    let request: ChartRequest = this.reportRequestService.getDashboardChartRequest(this.reportId);
    let url = this.reportRequestService.getDashbpardReportUrl(this.reportId);

    //Load Chart
    this.reportDataService.getReportChart(url, request).subscribe(chartResult => {
      if (chartResult) {
        console.log('dashboard chart result:', chartResult);
        this.createChart(chartResult);
      }
    });
  }

  protected createChart(chartResult: any) {
    this.chart = new Chart(chartResult);
  }

}
