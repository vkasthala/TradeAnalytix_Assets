import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ReportDetails } from '../../model/report-details.model';
import { ReportSubType } from '../../model/report-sub-type.model';
import { ReportSummaryItem } from '../../model/report-summary-item.model';
import { ReportTypeService } from '../../services/report-type.service';
import { ReportSummaryComponent } from '../report-summary/report-summary.component';
import { typeofExpr } from '@angular/compiler/src/output/output_ast';
import { ReportChartComponent } from '../report-chart/report-chart.component';
import { IMyDateRangeModel } from 'mydaterangepicker';
import { ReportFilter } from '../../model/report-filter.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-report-tab-content',
  templateUrl: './report-tab-content.component.html',
  styleUrls: ['./report-tab-content.component.scss']
})
export class ReportTabContentComponent implements OnInit {

  @ViewChild('reportSummary', { static: false }) protected reportSummary: ReportSummaryComponent;

  @ViewChild('reportChart', { static: false }) protected reportChart: ReportChartComponent;

  filterChangeSubject: Subject<ReportFilter> = new Subject<ReportFilter>();

  reportTypeChangeSubject: Subject<ReportFilter> = new Subject<ReportFilter>();

  protected reportSubTypes: ReportSubType[];

  protected reports: ReportDetails[];

  protected reportSummaryItems: ReportSummaryItem[] = [];

  protected subtype: string;

  protected reportFilter: ReportFilter = new ReportFilter();

  protected dateFilter: any;;

  constructor(protected type: string, protected reportTypeService: ReportTypeService) { }

  ngOnInit() {
    this.dateFilter = this.initDateFilter();
  }

  onReportSubTypeSelect(type: ReportSubType): void {
    this.subtype = type.id;
    this.reportFilter.summaryType = type.id;
    this.reports = type.reportDetailList;
    this.reportTypeChangeSubject.next(this.reportFilter);
  }

  onDateRangeChanged(event: IMyDateRangeModel) {
    console.log('date::', event);
    let formattedText = event.formatted;
    let seperatorInd = formattedText.indexOf(' - ');
    if (seperatorInd > -1) {
      this.reportFilter.fromDate = formattedText.substring(0, seperatorInd).trim();
      this.reportFilter.toDate = formattedText.substring(seperatorInd + 3).trim();
    }
    this.filterChangeSubject.next(this.reportFilter);
  }

  initDateFilter(): any {
    let today = new Date();
    let dateObj = {
      beginDate: { year: today.getFullYear(), month: 1, day: 1 },
      endDate: { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() }
    };
    this.reportFilter.fromDate = today.getFullYear() + '-01-01';
    this.reportFilter.toDate = today.toISOString().slice(0, 10);;
    console.log('init date:', dateObj);
    return dateObj;
  }

}
