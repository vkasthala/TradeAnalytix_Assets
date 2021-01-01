import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ReportDetails } from '../../model/report-details.model';
import { ReportSubType } from '../../model/report-sub-type.model';
import { ReportSummaryItem } from '../../model/report-summary-item.model';
import { ReportTypeService } from '../../services/report-type.service';
import { ReportSummaryComponent } from '../report-summary/report-summary.component';
import { typeofExpr } from '@angular/compiler/src/output/output_ast';
import { ReportChartComponent } from '../report-chart/report-chart.component';

@Component({
  selector: 'app-report-tab-content',
  templateUrl: './report-tab-content.component.html',
  styleUrls: ['./report-tab-content.component.scss']
})
export class ReportTabContentComponent implements OnInit {

  @ViewChild('reportSummary', { static: false }) protected reportSummary: ReportSummaryComponent;

  @ViewChild('reportChart', { static: false }) protected reportChart: ReportChartComponent;

  protected reportSubTypes: ReportSubType[];

  protected reports: ReportDetails[];

  protected reportSummaryItems: ReportSummaryItem[] = [];

  constructor(protected type: string, protected reportTypeService: ReportTypeService) { }

  ngOnInit() {
  }

  onReportSubTypeSelect(type: ReportSubType): void {
    this.loadSummary(type);
    this.reports = type.reportDetailList;
  }

  loadSummary(type: ReportSubType): void {
    this.reportSummaryItems = [];

    let item: ReportSummaryItem = new ReportSummaryItem();
    item.name = type.name + 'Name1';
    item.value = '1234.34';
    this.reportSummaryItems.push(item);

    item = new ReportSummaryItem();
    item.name = type.name + 'Name2';
    item.value = '3454.34';
    this.reportSummaryItems.push(item);

    this.reports = type.reportDetailList;
  }

}
