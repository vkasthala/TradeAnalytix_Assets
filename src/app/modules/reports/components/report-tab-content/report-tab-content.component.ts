import { Component, OnInit, Input } from '@angular/core';
import { ReportDetails } from '../../model/report-details.model';
import { ReportSubType } from '../../model/report-sub-type.model';
import { ReportSummaryItem } from '../../model/report-summary-item.model';

@Component({
  selector: 'app-report-tab-content',
  templateUrl: './report-tab-content.component.html',
  styleUrls: ['./report-tab-content.component.scss']
})
export class ReportTabContentComponent implements OnInit {

  @Input("reportSubTypes") reportSubTypes: ReportSubType[];

  reports: ReportDetails[];

  reportSummaryItems: ReportSummaryItem[] = [];

  constructor() { }

  ngOnInit() {
  }

  onReportSubTypeSelect(type: ReportSubType): void {
    this.loadSummary(type);
    this.reports = type.reportDetailList;
  }

  loadSummary(type: ReportSubType): void {
    let item:ReportSummaryItem = new ReportSummaryItem();
    item.name = 'Name1';
    item.value = '1234.34';
    this.reportSummaryItems.push(item);

    item = new ReportSummaryItem();
    item.name = 'Name2';
    item.value = '3454.34';
    this.reportSummaryItems.push(item);
  }

}
