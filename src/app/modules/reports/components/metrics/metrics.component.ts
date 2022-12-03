import { Component, OnInit, Input } from '@angular/core';
import { ReportsItem } from '../../model/reports-item.model';
import { ReportTabContentComponent } from '../report-tab-content/report-tab-content.component';
import { ReportTypeService } from '../../services/report-type.service';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss']
})
export class MetricsComponent extends ReportTabContentComponent implements OnInit {

  constructor(reportTypeService: ReportTypeService) {
    super('portfolio', reportTypeService);
    this.reportSubTypes = this.reportTypeService.getSubTypesByCategory(this.type);
    this.onReportSubTypeSelect(this.reportSubTypes[0]);
  }

}
