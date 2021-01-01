import { Component, OnInit, Input } from '@angular/core';
import { ReportsItem } from '../../model/reports-item.model';
import { ReportTabContentComponent } from '../report-tab-content/report-tab-content.component';
import { ReportTypeService } from '../../services/report-type.service';

@Component({
  selector: 'app-performance',
  templateUrl: '../report-tab-content/report-tab-content.component.html',
  styleUrls: ['../report-tab-content/report-tab-content.component.scss']
})
export class PerformanceComponent extends ReportTabContentComponent implements OnInit {

  constructor(reportTypeService: ReportTypeService) {
    super('performance', reportTypeService);
    this.reportSubTypes = this.reportTypeService.getSubTypesByCategory(this.type);
    this.onReportSubTypeSelect(this.reportSubTypes[0]);
  }

}
