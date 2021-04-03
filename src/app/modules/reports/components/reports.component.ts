import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { IMyDrpOptions } from 'mydaterangepicker';
import { RiskManagementComponent } from '../../trade-management/components/add-trade/Steps/risk-management/risk-management.component';
import { DisciplineComponent } from './discipline/discipline.component';
import { RiskmanagementComponent } from './riskmanagement/riskmanagement.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  @ViewChild('disciplineReports', { static: false }) protected disciplineReports: DisciplineComponent;
  @ViewChild('riskReports', { static: false }) protected riskReports: RiskmanagementComponent;

  constructor() { }

  myDateRangePickerOptions: IMyDrpOptions = {
    dateFormat: 'dd.mm.yyyy',
    editableDateRangeField: false,
    ariaLabelInputField: 'Date'
  };

  ngOnInit() {
  }

  onTabSelect(selectedTab: string) {
    if (selectedTab === 'discipline') {
      this.disciplineReports.reloadData(selectedTab);
    } else if (selectedTab === 'risk') {
      this.riskReports.reloadData(selectedTab);
    }
  }

}
