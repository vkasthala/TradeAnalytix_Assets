import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMyDrpOptions } from 'mydaterangepicker';
import { MatPaginator } from '@angular/material/paginator';
import { TradePlansService } from '../services/trade-plans.service';

import { MatDialog } from '@angular/material';
import { TradePlanGridStoreService } from '../services/trade-plan-grid-store.service';
import { TradePlanGridRequest } from '../models/trade-plan-grid-request.model';
import { TradePlanGridPage } from '../models/trade-plan-grid-page.model';
import { TradePlanGridSort } from '../models/trade-plan-grid-sort.model';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-trade-plans',
  templateUrl: './trade-plans.component.html',
  styleUrls: ['./trade-plans.component.scss']
})
export class TradePlansComponent implements OnInit {

  displayedColumns: string[] = ['day', 'status', 'mindsetType', 'marketStatus', 'plannedTrades', 'aligned', 'selfReview', 'todayStrategyCount', 'returnAmount', 'action'];
  dataSource: TradePlanGridStoreService;

  tradePlanGridRequest: TradePlanGridRequest = this.getInitialRequest();

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private _dialog: MatDialog,
    private router: Router,
    private tradeplansService: TradePlansService
  ) { }

  ngOnInit() {
    this.dataSource = new TradePlanGridStoreService(this.tradeplansService);
    this.loadPage();
  }

  loadPage() {
    this.dataSource.loadTradePlanStore(this.tradePlanGridRequest);
  }

  reload() {
    this.tradePlanGridRequest.page.pageNumber = 0;
    this.loadPage();
  }

  handlePage($event) {

  }

  ngAfterViewInit() {

    this.paginator.page.pipe(
      tap(() => {
        console.log('here...');
        this.updatePageSortParams();
        this.loadPage();
      })
    )
      .subscribe();
  }

  getInitialRequest(): TradePlanGridRequest {
    let request: TradePlanGridRequest = new TradePlanGridRequest();
    let pageRequest: TradePlanGridPage = new TradePlanGridPage();
    pageRequest.pageNumber = 0;
    pageRequest.pageSize = 20;
    request.page = pageRequest;
    return request;
  }

  updatePageSortParams() {
    let pageRequest: TradePlanGridPage = this.tradePlanGridRequest.page;
    if (!pageRequest) {
      pageRequest = new TradePlanGridPage();
      this.tradePlanGridRequest.page = pageRequest;
    }
    pageRequest.pageNumber = this.paginator.pageIndex;
    pageRequest.pageSize = this.paginator.pageSize;

    let sortRequest: TradePlanGridSort = this.tradePlanGridRequest.sort;
    if (!sortRequest) {
      sortRequest = new TradePlanGridSort();
      this.tradePlanGridRequest.sort = sortRequest;
    }
    /*sortRequest.column = this.sort.active;
    if (this.sort.active) {
      sortRequest.order = this.sort.direction;
    }*/
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

