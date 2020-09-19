import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMyDrpOptions } from 'mydaterangepicker';

@Component({
  selector: 'app-trade-plans',
  templateUrl: './trade-plans.component.html',
  styleUrls: ['./trade-plans.component.scss']
})
export class TradePlansComponent implements OnInit {

  myDateRangePickerOptions: IMyDrpOptions = {
    dateFormat: 'dd.mm.yyyy',
    editableDateRangeField: false,
    ariaLabelInputField : 'Date'
 };

  constructor(private router: Router) { }

  ngOnInit() {
  }

  addEntry() { this.router.navigate(['/dashboard/add-new-trade-plan']) }

}
