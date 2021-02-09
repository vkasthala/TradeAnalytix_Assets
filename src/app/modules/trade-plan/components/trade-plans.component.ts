import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMyDrpOptions } from 'mydaterangepicker';
import { MatPaginator } from '@angular/material/paginator';
import { TradePlansService } from '../services/trade-plans.service';

import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-trade-plans',
  templateUrl: './trade-plans.component.html',
  styleUrls: ['./trade-plans.component.scss']
})
export class TradePlansComponent implements OnInit {

  displayedColumns: string[] = ['date', 'status', 'mindset', 'prediction', 'planned_trades', 'aligned', 'self_review', 'trades', 'return', 'action'];
  dataSource = [];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private _dialog: MatDialog,
    private router: Router,
    private tradeplansService: TradePlansService
    ) {}

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.tradeplansService.getTradePlans().subscribe(data => {
      //this.dataSource = data.tradeplanData;
      console.log('TradePlans', this.dataSource);
      return;
    });
  }

  myDateRangePickerOptions: IMyDrpOptions = {
    dateFormat: 'dd.mm.yyyy',
    editableDateRangeField: false,
    ariaLabelInputField: 'Date'
  };


  addEntry() { this.router.navigate(['/add-new-trade-plan']) }
  editEntry() { 
    this.router.navigate(['/edit-trade-plan']) 
  }

}

