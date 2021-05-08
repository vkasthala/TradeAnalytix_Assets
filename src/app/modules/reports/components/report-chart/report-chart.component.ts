import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { ChartRequest } from '../../model/chart-request.model';
import { ReportCategory } from '../../model/report-category.enum';
import { ReportDetails } from '../../model/report-details.model';
import { ReportDataService } from '../../services/report-data.service';
import { ReportRequestService } from '../../services/report-request.service';
import { ReportFilter } from '../../model/report-filter.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-report-chart',
  templateUrl: './report-chart.component.html',
  styleUrls: ['./report-chart.component.scss']
})
export class ReportChartComponent implements OnInit {

  @Input("report") report: ReportDetails;

  @Input("subtype") subtype: string;

  @Input("reportFilter") reportFilter: ReportFilter;

  @Input("filterChangeSubject") filterChangeSubject: Subject<ReportFilter>;

  chart: Chart;

  constructor(protected reportRequestService: ReportRequestService, protected reportDataService: ReportDataService) { }

  ngOnInit() {
    this.loadChart();
    this.filterChangeSubject.asObservable().subscribe(data => {
      this.onFilterChange(data);
    });
  }

  loadChart(): void {
    let category: ReportCategory = this.report.category
    let request: ChartRequest;
    let url: string;
    //Body and URL identification
    if (category == ReportCategory.Net_Return) {
      request = this.reportRequestService.getNetReturnChartRequest(this.report, this.subtype, this.reportFilter);
      url = '/reports/performance/netreturn';
    } else if (category == ReportCategory.Win_Loss) {
      request = this.reportRequestService.getWinLossChartRequest(this.report, this.subtype, this.reportFilter);
      url = '/reports/performance/winloss';
    } else if (category == ReportCategory.Goal_Status) {
      request = this.reportRequestService.getCommonChartRequest(this.report, this.subtype, this.reportFilter);
      url = '/reports/performance/goalstatus';
    } else if (category == ReportCategory.Discipline) {
      request = this.reportRequestService.getDisciplineChartRequest(this.report, this.subtype, this.reportFilter);
      url = this.reportRequestService.getDisciplineReportApiUrl(this.report.id);
    } else if (category == ReportCategory.Risk) {
      request = this.reportRequestService.getCommonChartRequest(this.report, this.subtype, this.reportFilter);
      url = this.reportRequestService.getRiskReportApiUrl(this.report.id);
    }

    //Load Chart
    this.reportDataService.getReportChart(url, request).subscribe(chartResult => {
      if (chartResult) {
        console.log('chart result:', chartResult);
        this.chart = new Chart(chartResult);
      } else if (this.chart) {
        this.chart.destroy();
      }
    });
  }

  onFilterChange(reportFilter: ReportFilter): void {
    console.log('here...', reportFilter);
    this.loadChart();
  }

}
