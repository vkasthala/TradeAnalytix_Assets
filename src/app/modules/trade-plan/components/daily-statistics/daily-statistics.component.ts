import { Component, OnInit } from '@angular/core';
import { ReportDataService } from 'src/app/modules/reports/services/report-data.service';
import { SummaryRequest } from 'src/app/modules/shared/models/reports/summary-request.model';
import { TradePlanEntry } from '../../models/trade-plan-entry.model';
import { TradePlanSummary } from '../../models/trade-plan-summary.model';

@Component({
  selector: 'app-dailystatistics',
  templateUrl: './daily-statistics.component.html',
  styleUrls: ['./daily-statistics.component.scss']
})
export class DailyStatisticsComponent implements OnInit {

  tradePlanSummary: TradePlanSummary = new TradePlanSummary();

  constructor(private reportDataService: ReportDataService) {
  }

  ngOnInit() {
  }

  loadSummary(selectedPlan: TradePlanEntry): void {
    this.reportDataService.getReportSummary(this.createSummaryRequest(selectedPlan)).subscribe(result => {
      debugger;
      if (result && result.length) {
        let summary: TradePlanSummary = new TradePlanSummary();
        result.forEach(item => {
          summary[item.id] = item.value ? item.value : item.defaultValue;
        });
        this.tradePlanSummary = summary;
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
