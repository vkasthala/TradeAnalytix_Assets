import { Component, OnInit } from '@angular/core';
import { ChartRequest } from 'src/app/modules/reports/model/chart-request.model';
import { ReportDataService } from 'src/app/modules/reports/services/report-data.service';
import { ReportRequestService } from 'src/app/modules/reports/services/report-request.service';
import { DashboardChartComponent } from '../../components/dashboard-chart/dashboard-chart.component';

@Component({
  selector: 'app-returns-calendar-chart',
  templateUrl: '../../components/dashboard-chart/dashboard-chart.component.html',
  styleUrls: ['../../components/dashboard-chart/dashboard-chart.component.scss']
})
export class ReturnsCalendarChartComponent extends DashboardChartComponent implements OnInit {

  constructor(protected reportRequestService: ReportRequestService, protected reportDataService: ReportDataService) {
    super('returnsCalendar', reportRequestService, reportDataService);
  }

  ngOnInit() {
    let request: ChartRequest = this.reportRequestService.getDashboardChartRequest(this.reportId);
    let url = this.reportRequestService.getDashbpardReportUrl(this.reportId);

    //Load Chart
    this.reportDataService.getReportChart(url, request).subscribe(chartResult => {
      if (chartResult) {
        chartResult.series[0].dataLabels['formatter'] = function() {
          const day = this.point.value.gain;
          if (day === 0) {
            return '<span>' + this.point.value.val + '</span>';
          } else if (day < 0) {
            return '<span class="dateloss">' + this.point.value.val + '</span>'
            + '<br>' + '<span class=valLoss>' + this.point.value.gain * -1 + '<br>'
            + this.point.value.trades + '</span>';
          } else {
            return '<span class=dateGain>' + this.point.value.val + '</span>' + '<br>'
              + '<span class=valGain> ' + this.point.value.gain + '<br>' + this.point.value.trades + '</span>'
          }
        };

        chartResult.tooltip['formatter'] = function () {
          const gl = this.point.value.gain;
          if (gl < 0) {
            return '<b>' + 'Jun' + '_' + this.point.value.val + '<br>' + 'Net Loss: ' + '<b>' + '$' +
              this.point.value.gain * -1 + '<br>' + ' Trades: ' + '<b>' + this.point.value.trades + '</b>';
          } else if (gl === 0) {
            return '<b>Jun' + '_' + this.point.value.val + '</b>';
          }
          return '<b>' + 'Jun' + '_' + this.point.value.val + '<br>' + 'Net Gain: ' + '<b>' + '$'
            + this.point.value.gain + '<br>' + 'Trades: ' + '<b>' + this.point.value.trades + '</b>';
        };
        console.log('calendar chart result:', chartResult);
        super.createChart(chartResult);
      }
    });
  }

}
