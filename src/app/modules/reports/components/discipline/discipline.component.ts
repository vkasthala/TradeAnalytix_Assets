import { Component } from '@angular/core';
import { ReportTypeService } from '../../services/report-type.service';
import { ReportTabContentComponent } from '../report-tab-content/report-tab-content.component';

@Component({
  selector: 'app-discipline',
  templateUrl: '../report-tab-content/report-tab-content.component.html',
  styleUrls: ['../report-tab-content/report-tab-content.component.scss']
})
export class DisciplineComponent extends ReportTabContentComponent {

  constructor(reportTypeService: ReportTypeService) {
    super('discipline', reportTypeService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.reportSubTypes = this.reportTypeService.getSubTypesByCategory(this.type);
    console.log('discipline charts loading..', this.reportSubTypes);
    //this.onReportSubTypeSelect(this.reportSubTypes[0]);
  }

  reloadData(tab: string){
    console.log('here..');
    this.onReportSubTypeSelect(this.reportSubTypes[0]);
  }

}
