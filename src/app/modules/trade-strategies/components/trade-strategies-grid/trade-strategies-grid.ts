import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { TradeStrategyGridStore } from '../../services/trade-strategy-grid-store';
import { TradeStrategyGridService } from '../../services/trade-strategy-grid.service';
import { TradeStrategyGridRequest } from '../../models/trade-strategy-grid-request.model';
import { StrategiesGridPage } from '../../models/strategies-grid-page.model';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { StrategiesGridSort } from '../../models/strategies-grid-sort.model';

@Component({
  selector: 'app-trade-strategies-grid',
  styleUrls: ['trade-strategies-grid.css'],
  templateUrl: 'trade-strategies-grid.html',
})
export class TradeStrategiesGrid implements AfterViewInit, OnInit {

  displayedColumns = ['id', 'strategy', 'stockName', 'direction', 'status', 'openDate', 'closeDate'];
  pageSize: number = 20

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  dataSource: TradeStrategyGridStore;
  tradeStrategyGridRequest: TradeStrategyGridRequest = this.getInitialRequest();

  constructor(private tradeStrategyGridService: TradeStrategyGridService) {
  }

  ngOnInit() {
    this.dataSource = new TradeStrategyGridStore(this.tradeStrategyGridService);
    this.loadPage();
  }

  loadPage() {
    this.dataSource.loadTradeStrategies(this.tradeStrategyGridRequest);
  }

  reload() {
    this.tradeStrategyGridRequest.page.pageNumber = 0;
    this.loadPage();
  }

  handlePage($event) {

  }

  ngAfterViewInit() {

    this.paginator.page
      .pipe(
        tap(() => {
          console.log('here...');
          this.updatePageSortParams();
          this.loadPage();
        })
      )
      .subscribe();

    /*
// reset the paginator after sorting
this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

// on sort or paginate events, load a new page
merge(this.sort.sortChange, this.paginator.page)
  .pipe(
    tap(() => {
      console.log('here...');
      this.updatePageSortParams();
      this.loadPage();
    })
  )
  .subscribe();*/
  }

  getInitialRequest(): TradeStrategyGridRequest {
    let request: TradeStrategyGridRequest = new TradeStrategyGridRequest();
    let pageRequest: StrategiesGridPage = new StrategiesGridPage();
    pageRequest.pageNumber = 0;
    pageRequest.pageSize = 20;
    request.page = pageRequest;
    return request;
  }

  updatePageSortParams() {
    let pageRequest: StrategiesGridPage = this.tradeStrategyGridRequest.page;
    if (!pageRequest) {
      pageRequest = new StrategiesGridPage();
      this.tradeStrategyGridRequest.page = pageRequest;
    }
    pageRequest.pageNumber = this.paginator.pageIndex;
    pageRequest.pageSize = this.paginator.pageSize;

    let sortRequest: StrategiesGridSort = this.tradeStrategyGridRequest.sort;
    if (!sortRequest) {
      sortRequest = new StrategiesGridSort();
      this.tradeStrategyGridRequest.sort = sortRequest;
    }
    /*sortRequest.column = this.sort.active;
    if (this.sort.active) {
      sortRequest.order = this.sort.direction;
    }*/
  }

}



