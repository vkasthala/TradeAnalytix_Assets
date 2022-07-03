import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { IMyDrpOptions } from 'mydaterangepicker';
import { RiskManagementComponent } from '../../trade-management/components/add-trade/Steps/risk-management/risk-management.component';
import { PerformanceComponent } from './performance/performance.component';
import { GoalsComponent } from './goals/goals.component';
import { DisciplineComponent } from './discipline/discipline.component';
import { RiskmanagementComponent } from './riskmanagement/riskmanagement.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  @ViewChild('GoalsReports', { static: false }) protected GoalsReports: PerformanceComponent;
  @ViewChild('disciplineReports', { static: false }) protected disciplineReports: DisciplineComponent;
  @ViewChild('riskReports', { static: false }) protected riskReports: RiskmanagementComponent;
  public selectedParentReport: string = "Portfolio";

  websiteList: any = ['HDTuto.com', 'HDTuto.com', 'Nicesnippets.com']

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
      this.riskReports.reloadData(selectedTab);
    }else if (selectedTab === 'risk') {
      this.riskReports.reloadData(selectedTab);
    }
  }

  parentReportChange(e) {
    console.log(e.target.value);
    this.selectedParentReport = e.target.value;
  }

  changeWebsite(e) {
    console.log(e.target.value);
  }

  closePopup(e) {
    let iframe = document.querySelector('iframe');
    iframe.src='';
    iframe.setAttribute("src",'https://www.youtube.com/embed/oTOw-wUL1Jw');
  }

}
