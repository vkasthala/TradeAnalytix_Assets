import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { IMyDrpOptions } from 'mydaterangepicker';
import { DisciplineComponent } from './discipline/discipline.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  @ViewChild('disciplineReports', { static: false }) protected disciplineReports: DisciplineComponent;

  constructor() { }

  myDateRangePickerOptions: IMyDrpOptions = {
    dateFormat: 'dd.mm.yyyy',
    editableDateRangeField: false,
    ariaLabelInputField: 'Date'
  };

  ngOnInit() {
  }

  onTabSelect(selectedTab: string) {
    if(selectedTab === 'discipline'){
      this.disciplineReports.reloadData(selectedTab);
    }
  }

}
