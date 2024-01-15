import { Component, OnInit, Input } from '@angular/core';
import { ReportsItem } from '../../model/reports-item.model';
import { ReportTypeService } from '../../services/report-type.service';
import { ReportTabContentComponent } from '../report-tab-content/report-tab-content.component';

@Component({
  selector: 'app-riskmanagement',
  templateUrl: '../report-tab-content/report-tab-content.component.html',
  styleUrls: ['../report-tab-content/report-tab-content.component.scss']
})
export class RiskmanagementComponent extends ReportTabContentComponent implements OnInit {
  constructor(reportTypeService: ReportTypeService) {
    super('risk', reportTypeService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.reportSubTypes = this.reportTypeService.getSubTypesByCategory(this.type);
    console.log('risk charts loading..', this.reportSubTypes);
    //this.onReportSubTypeSelect(this.reportSubTypes[0]);
  }

  reloadData(tab: string) {
    console.log('here..');
    if (this.reportSubTypes.length == 0) {
      this.reportSubTypes = this.reportTypeService.getSubTypesByCategory(this.type);
    }
    this.onReportSubTypeSelect(this.reportSubTypes[0]);
  }

}
