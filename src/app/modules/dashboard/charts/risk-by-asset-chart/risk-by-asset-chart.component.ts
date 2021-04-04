import { Component, OnInit } from '@angular/core';
import { ReportDataService } from 'src/app/modules/reports/services/report-data.service';
import { ReportRequestService } from 'src/app/modules/reports/services/report-request.service';
import { DashboardChartComponent } from '../../components/dashboard-chart/dashboard-chart.component';

@Component({
  selector: 'app-risk-by-asset-chart',
  templateUrl: '../../components/dashboard-chart/dashboard-chart.component.html',
  styleUrls: ['../../components/dashboard-chart/dashboard-chart.component.scss']
})
export class RiskByAssetChartComponent extends DashboardChartComponent implements OnInit {

  constructor(protected reportRequestService: ReportRequestService, protected reportDataService: ReportDataService) {
    super('riskAmountByAsset', reportRequestService, reportDataService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
