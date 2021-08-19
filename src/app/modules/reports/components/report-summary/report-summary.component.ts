import { Component, OnInit, Input } from '@angular/core';
import { ReportSummaryItem } from '../../model/report-summary-item.model';
import { SummaryItem } from 'src/app/modules/shared/models/reports/summary-item.model';
import { ReportFilter } from '../../model/report-filter.model';
import { ReportDataService } from '../../services/report-data.service';
import { SummaryRequest } from 'src/app/modules/shared/models/reports/summary-request.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-report-summary',
  templateUrl: './report-summary.component.html',
  styleUrls: ['./report-summary.component.scss']
})
export class ReportSummaryComponent implements OnInit {

  @Input("reportFilter") reportFilter: ReportFilter;

  @Input("filterChangeSubject") filterChangeSubject: Subject<ReportFilter>;

  @Input("reportTypeChangeSubject") reportTypeChangeSubject: Subject<ReportFilter>;

  reportSummaryItems: SummaryItem[];

  constructor(private reportDataService: ReportDataService) { }

  ngOnInit() {
    this.loadSummary(this.reportFilter);
    this.filterChangeSubject.asObservable().subscribe(data => {
      this.onFilterChange(data);
    });
    this.reportTypeChangeSubject.asObservable().subscribe(data => {
      this.onFilterChange(data);
    });
  }

  loadSummary(reportFilter: ReportFilter): void {
    this.reportDataService.getReportSummary(this.createSummaryRequest(reportFilter)).subscribe(result => {
      this.reportSummaryItems = result;
    });
  }

  onFilterChange(reportFilter: ReportFilter): void {
    console.log('here...', reportFilter);
    this.reportSummaryItems = [];
    this.loadSummary(reportFilter);
  }

  createSummaryRequest(reportFilter: ReportFilter): SummaryRequest {
    let summaryRequest: SummaryRequest = new SummaryRequest();
    summaryRequest.fromDate = reportFilter.fromDate;
    summaryRequest.toDate = reportFilter.toDate;
    summaryRequest.summaryType = reportFilter.summaryType;
    summaryRequest.symbol = reportFilter.symbol;
    summaryRequest.stockId = reportFilter.stockId;
    return summaryRequest;
  }

}
