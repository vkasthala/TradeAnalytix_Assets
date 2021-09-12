import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { ReportDetails } from '../../model/report-details.model';

import { ReportSubType } from '../../model/report-sub-type.model';
import { ReportSummaryItem } from '../../model/report-summary-item.model';
import { ReportTypeService } from '../../services/report-type.service';
import { ReportChartComponent } from '../report-chart/report-chart.component';
import { ReportTabContentComponent } from '../report-tab-content/report-tab-content.component';

@Component({
  selector: 'app-reports-rules',
  templateUrl: './reports-rules.component.html',
  styleUrls: ['./reports-rules.component.scss']
})
export class ReportsRulesComponent extends ReportTabContentComponent implements OnInit {


  @ViewChild('reportChart', { static: false }) protected reportChart: ReportChartComponent;




  // protected reportSubTypes: ReportSubType[];

  protected reports: ReportDetails[];

  protected reportSummaryItems: ReportSummaryItem[] = [];

  protected subtype: string;

  protected description: string;


  protected dateFilter: any;

  reportTypeService: any;
  reportSubTypes: any;

  constructor(reportTypeService: ReportTypeService) {
    super('rules', reportTypeService)
  }



  onReportSubTypeSelect(type: ReportSubType): void {
    this.subtype = type.id;
    this.description = type.description;
    this.reportFilter.summaryType = type.id;
    this.reports = type.reportDetailList;
    this.reportTypeChangeSubject.next(this.reportFilter);
  }



  ngOnInit() {
    super.ngOnInit();
    this.reportSubTypes = this.reportTypeService.getSubTypesByCategory(this.type);
  }

  reloadData(tab: string) {
    if (this.reportSubTypes.length == 0) {
      this.reportSubTypes = this.reportTypeService.getSubTypesByCategory(this.type);
    }
    this.onReportSubTypeSelect(this.reportSubTypes[0]);
  }

}
