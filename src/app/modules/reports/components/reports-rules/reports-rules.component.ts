import { Component, OnInit } from '@angular/core';
import { UserCodedRule } from 'src/app/modules/settings/models/user-coded-rule.model';
import { CodedRuleService } from 'src/app/modules/settings/services/coded-rule.service';
import { ReportDetails } from '../../model/report-details.model';
import { ReportSubType } from '../../model/report-sub-type.model';
import { ReportSummaryItem } from '../../model/report-summary-item.model';
import { ReportTypeService } from '../../services/report-type.service';
import { ReportTabContentComponent } from '../report-tab-content/report-tab-content.component';


@Component({
  selector: 'app-reports-rules',
  templateUrl: '../report-tab-content/report-tab-content.component.html',
  styleUrls: ['../report-tab-content/report-tab-content.component.scss']
})
export class ReportsRulesComponent extends ReportTabContentComponent implements OnInit {

  protected reports: ReportDetails[];

  protected reportSummaryItems: ReportSummaryItem[] = [];

  protected subtype: string;

  protected description: string;

  protected dateFilter: any;

  protected userCodedRules: UserCodedRule[];

  reportTypeService: ReportTypeService;

  reportSubTypes: any;

  constructor(reportTypeService: ReportTypeService, private codedRuleService: CodedRuleService) {
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
    //this.loadRules();
  }

  loadRules() {
    this.codedRuleService.getUserCodedRules().subscribe(codedRules => {
      this.userCodedRules = codedRules.filter(rule => (rule.ruleType === 1));
      this.reportSubTypes = this.reportTypeService.getRuleReportsSubTypes(this.type, this.userCodedRules);
      this.onReportSubTypeSelect(this.reportSubTypes[0]);
    });
  }

  reloadData(tab: string) {
    if (this.reportSubTypes.length == 0) {
      this.loadRules();
    }
  }

}
