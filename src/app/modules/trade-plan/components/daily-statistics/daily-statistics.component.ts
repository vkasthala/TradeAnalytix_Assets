import { Component, OnInit } from '@angular/core';
import { ReportDataService } from 'src/app/modules/reports/services/report-data.service';
import { SummaryRequest } from 'src/app/modules/shared/models/reports/summary-request.model';
import { TradePlanEntry } from '../../models/trade-plan-entry.model';
import { TradePlanSummary } from '../../models/trade-plan-summary.model';
import { TradePlansService } from '../../services/trade-plans.service';

@Component({
  selector: 'app-dailystatistics',
  templateUrl: './daily-statistics.component.html',
  styleUrls: ['./daily-statistics.component.scss']
})
export class DailyStatisticsComponent implements OnInit {

  tradePlanSummary: TradePlanSummary = new TradePlanSummary();

  constructor(private reportDataService: ReportDataService, protected tradePlanService: TradePlansService) {
  }

  ngOnInit() {
  }

  loadSummary(selectedPlan: TradePlanEntry): void {
    this.tradePlanService.getTradePlanSummary(this.createSummaryRequest(selectedPlan)).subscribe(result => {
      if (result) {
        this.tradePlanSummary = result;
      }
    });
  }

  createSummaryRequest(selectedPlan: TradePlanEntry): SummaryRequest {
    let summaryRequest: SummaryRequest = new SummaryRequest();
    summaryRequest.summaryType = 'tradeplan_summary';
    summaryRequest.day = selectedPlan.day;
    return summaryRequest;
  }

}
