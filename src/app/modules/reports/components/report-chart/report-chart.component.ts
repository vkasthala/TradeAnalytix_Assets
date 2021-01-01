import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { ChartRequest } from '../../model/chart-request.model';
import { ReportCategory } from '../../model/report-category.enum';
import { ReportDetails } from '../../model/report-details.model';
import { ReportDataService } from '../../services/report-data.service';
import { ReportRequestService } from '../../services/report-request.service';

@Component({
  selector: 'app-report-chart',
  templateUrl: './report-chart.component.html',
  styleUrls: ['./report-chart.component.scss']
})
export class ReportChartComponent implements OnInit {

  @Input("report") report: ReportDetails;

  @Input("subtype") subtype: string;

  @Input("fromDate") fromDate: string;

  @Input("toDate") toDate: string;

  chart: Chart;

  constructor(protected reportRequestService: ReportRequestService, protected reportDataService: ReportDataService) { }

  ngOnInit() {
    this.loadChart();
  }

  loadChart(): void {
    let category: ReportCategory = this.report.category
    let request: ChartRequest;
    let url: string;

    //Body and URL identification
    if (category == ReportCategory.Net_Return) {
      request = this.reportRequestService.getNetReturnChartRequest(this.report, this.subtype, this.fromDate, this.toDate);
      url = '/reports/performance/netreturn';
    } else if (category == ReportCategory.Win_Loss) {
      request = this.reportRequestService.getWinLossChartRequest(this.report, this.subtype, this.fromDate, this.toDate);
      url = '/reports/performance/winloss';
    }

    //Load Chart
    this.reportDataService.getReportChart(url, request).subscribe(chartResult => {
      this.chart = new Chart(chartResult);
    });
  }

}
