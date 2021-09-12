import { Component, OnInit } from '@angular/core';
import { ReportTypeService } from '../../services/report-type.service';
import { ReportTabContentComponent } from '../report-tab-content/report-tab-content.component';

@Component({
  selector: 'app-reports-rules',
  templateUrl: '../report-tab-content/report-tab-content.component.html',
  styleUrls: ['../report-tab-content/report-tab-content.component.scss']
})
export class ReportsRulesComponent extends ReportTabContentComponent implements OnInit {
  reportTypeService: any;
  reportSubTypes: any;

  constructor(reportTypeService: ReportTypeService) {
    super('rules', reportTypeService);
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
