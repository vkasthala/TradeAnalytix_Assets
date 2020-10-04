import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { TradeStrategyGridStore } from '../../services/trade-strategy-grid-store';
import { TradeStrategyGridService } from '../../services/trade-strategy-grid.service';
import { TradeStrategyGridRequest } from '../../models/trade-strategy-grid-request.model';
import { StrategiesGridPage } from '../../models/strategies-grid-page.model';
import { fromEvent, merge, forkJoin } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { StrategiesGridSort } from '../../models/strategies-grid-sort.model';
import { TradeStrategyGridRow } from '../../models/trade-strategy-grid-row.model';
import { Router, NavigationExtras } from '@angular/router';
import { TradeStrategyService } from 'src/app/modules/trade-management/services/trade-strategy.service';
import { StockSymbolService } from 'src/app/modules/shared/services/stock-symbol.service';
import { UserStockStatsService } from 'src/app/modules/shared/services/user-stock-stats.service';
import { TradeInputData } from 'src/app/modules/shared/models/trade-management/trade-input-data.model';

@Component({
  selector: 'app-trade-strategies-grid',
  styleUrls: ['trade-strategies-grid.css'],
  templateUrl: 'trade-strategies-grid.html',
})
export class TradeStrategiesGrid implements AfterViewInit, OnInit {
  expandIndex: any;
  displayedColumns = ['id', 'strategy', 'stockName', 'direction', 'status', 'openDate', 'closeDate', 'action'];
  pageSize: number = 20

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  dataSource: TradeStrategyGridStore;
  tradeStrategyGridRequest: TradeStrategyGridRequest = this.getInitialRequest();

  constructor(private tradeStrategyGridService: TradeStrategyGridService,
    private tradeStrategyService: TradeStrategyService,
    private stockSymbolService: StockSymbolService,
    private userStockStatsService: UserStockStatsService,
    private router: Router) {
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

  editTrade(rowModel: TradeStrategyGridRow) {
    let stockSymbolReq = this.stockSymbolService.getStockSymbolById(rowModel.stockId);
    let tradeStrategyReq = this.tradeStrategyService.getTradeStrategyDetails(rowModel.id);
    let stockSummaryReq = this.userStockStatsService.getUserStockBriefSummary(rowModel.stockId, 1);
    forkJoin([stockSymbolReq, stockSummaryReq, tradeStrategyReq]).subscribe(results => {
      let extras: NavigationExtras = {};
      let input: TradeInputData = new TradeInputData();
      input.selectedStock = results[0];
      input.stockSummary = results[1];
      input.id = results[2].id;
      input.executionDate = results[2].executedDate;
      input.executed = results[2].executed;
      input.stockEntry = results[2].stockEntry;
      input.stockOptions = results[2].stockOptions;
      input.strategyType = results[2].strategyTypeId;
      input.tradeThesis = results[2].tradeThesis;
      if (results[2].entryRules && results[2].entryRules.length > 0) {
        input.entryRules = results[2].entryRules;
      }
      input.openDate = results[2].openDate;
      input.closeDate = results[2].closeDate;
      input.createDateTime = results[2].createDateTime;
      console.log('edit trade: ', input);
      extras.state = input;
      this.router.navigate(["/edit-trade/" + rowModel.id], extras);
    });
  }

  closeTrade(rowModel: TradeStrategyGridRow) {
    console.log('close..', rowModel);
  }


  deleteTrade(rowModel: TradeStrategyGridRow) {
    console.log('delete..', rowModel);
  }

  expandRowOptions(index) {
    this.expandIndex = index;
  }

  closeActionBox() {
    this.expandIndex = null
  }

}



