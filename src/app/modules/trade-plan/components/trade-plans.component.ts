import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { IMyDateRangeModel, IMyDrpOptions } from 'mydaterangepicker';
import { MatPaginator } from '@angular/material/paginator';
import { TradePlansService } from '../services/trade-plans.service';

import { MatDialog } from '@angular/material';
import { TradePlanGridStoreService } from '../services/trade-plan-grid-store.service';
import { TradePlanGridRequest } from '../models/trade-plan-grid-request.model';
import { TradePlanGridPage } from '../models/trade-plan-grid-page.model';
import { TradePlanGridSort } from '../models/trade-plan-grid-sort.model';
import { tap } from 'rxjs/operators';
import { TradePlanGridRow } from '../models/trade-plan-grid-row.model';
import { TradePlanGridFilter } from '../models/trade-plan-grid-filter.model';
import { DemoModeDetailsService } from '../../shared/services/demo-mode-details.service';

@Component({
  selector: 'app-trade-plans',
  templateUrl: './trade-plans.component.html',
  styleUrls: ['./trade-plans.component.scss']
})
export class TradePlansComponent implements OnInit {

  displayedColumns: string[] = ['day', 'marketStatus', 'plannedTrades', 'mindsetType',  'aligned', 'selfReview', 'todayStrategyCount', 'returnAmount', 'status', 'action'];
  dataSource: TradePlanGridStoreService;

  tradePlanGridRequest: TradePlanGridRequest = this.getInitialRequest();
  showFilters: boolean=false;
  public hideRuleContent:boolean[] = [];
  protected gridData: any;
  expandedIndex:any;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  isDemoMode: boolean = false;
  constructor(
    private _dialog: MatDialog,
    private router: Router,
    private tradeplansService: TradePlansService,
    private demoService: DemoModeDetailsService,
  ) { }

  ngOnInit() {
    this.dataSource = new TradePlanGridStoreService(this.tradeplansService);
    this.loadPage();
    console.log('this.dataSource', this.dataSource);    
    this.gridData = JSON.parse(localStorage.getItem('tradePlanGridData'));
    this.expandedIndex = -1;
    console.log('test rs', this.gridData);
  }

  loadPage() {
    this.isDemoMode = this.demoService.demoMode;
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


  addEntry() {
    this.router.navigate(['/add-new-trade-plan']);
  }

  editEntry(element: TradePlanGridRow) {
    let extras: NavigationExtras = {};
    extras.state = element;
    this.router.navigate(['/edit-trade-plan'], extras);
  }
  viewEntry(element: TradePlanGridRow) {
    let extras: NavigationExtras = {};
    extras.state = element;
    this.router.navigate(['/view-trade-plan'], extras);
  }

  onDateRangeChanged(event: IMyDateRangeModel) {
    console.log('date change: ', event);
    let filter: TradePlanGridFilter = this.tradePlanGridRequest.filters;
    if (!filter) {
      filter = new TradePlanGridFilter();
      this.tradePlanGridRequest.filters = filter;
    }
    if (event.beginJsDate && event.endJsDate) {
      filter.fromDate = event.beginDate.year + '-' + event.beginDate.month + '-' + event.beginDate.day;
      filter.toDate = event.endDate.year + '-' + event.endDate.month + '-' + event.endDate.day;
    } else {
      filter.fromDate = undefined;
      filter.toDate = undefined;
    }
    this.loadPage();
    console.log('trade plans filter after date range: ', filter);
  }

  strategiesFilter(){
    this.showFilters = !this.showFilters;
 }
 Collaps(index: number) {  
  // this.expandedIndex[index] = !this.expandedIndex[index];
  this.hideRuleContent[index] = !this.hideRuleContent[index]; 
  } 
}

