import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort } from '@angular/material';
import { NavigationExtras, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';

import { TradeInputData } from 'src/app/modules/shared/models/trade-management/trade-input-data.model';
import { StockSymbolService } from 'src/app/modules/shared/services/stock-symbol.service';
import { UserStockStatsService } from 'src/app/modules/shared/services/user-stock-stats.service';
import { TradeStrategyService } from 'src/app/modules/trade-management/services/trade-strategy.service';
import { StrategiesGridPage } from 'src/app/modules/trade-strategies/models/strategies-grid-page.model';
import { StrategiesGridSort } from 'src/app/modules/trade-strategies/models/strategies-grid-sort.model';
import { TradeStrategyGridRequest } from 'src/app/modules/trade-strategies/models/trade-strategy-grid-request.model';
import { TradeStrategyGridRow } from 'src/app/modules/trade-strategies/models/trade-strategy-grid-row.model';
import { TradeStrategyGridStore } from 'src/app/modules/trade-strategies/services/trade-strategy-grid-store';
import { TradeStrategyGridService } from 'src/app/modules/trade-strategies/services/trade-strategy-grid.service';

@Component({
  selector: 'app-import-trades-history',
  styleUrls: ['import-trades-history.css'],
  templateUrl: 'import-trades-history.html',
})
export class ImportTradesHistory implements AfterViewInit, OnInit {
  expandIndex: any;
  displayedColumns = ['openDate', 'stockName', 'direction', 'status', 'action'];
  pageSize: number = 20

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  dataSource: TradeStrategyGridStore;
  tradeStrategyGridRequest: TradeStrategyGridRequest = this.getInitialRequest();

  constructor(private tradeStrategyGridService: TradeStrategyGridService,
    private tradeStrategyService: TradeStrategyService,
    private stockSymbolService: StockSymbolService,
    private userStockStatsService: UserStockStatsService,
    private router: Router,
    private dialog: MatDialog) {
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
      input.tradeStrategy = results[2];
      console.log('edit trade: ', input);
      extras.state = input;
      this.router.navigate(["/edit-trade/" + rowModel.id], extras);
    });
  }

  closeTrade(rowModel: TradeStrategyGridRow) {
    console.log('close..', rowModel);
    let stockSymbolReq = this.stockSymbolService.getStockSymbolById(rowModel.stockId);
    let tradeStrategyReq = this.tradeStrategyService.getTradeStrategyDetails(rowModel.id);
    let stockSummaryReq = this.userStockStatsService.getUserStockBriefSummary(rowModel.stockId, 1);
    forkJoin([stockSymbolReq, stockSummaryReq, tradeStrategyReq]).subscribe(results => {
      let extras: NavigationExtras = {};
      let input: TradeInputData = new TradeInputData();
      input.selectedStock = results[0];
      input.stockSummary = results[1];
      input.tradeStrategy = results[2];
      console.log('close trade: ', input);
      extras.state = input;
      this.router.navigate(["/close-trade/" + rowModel.id], extras);
    });
  }
  viewTrade(rowModel: TradeStrategyGridRow) {
    let stockSymbolReq = this.stockSymbolService.getStockSymbolById(rowModel.stockId);
    let tradeStrategyReq = this.tradeStrategyService.getTradeStrategyDetails(rowModel.id);
    let stockSummaryReq = this.userStockStatsService.getUserStockBriefSummary(rowModel.stockId, 1);
    forkJoin([stockSymbolReq, stockSummaryReq, tradeStrategyReq]).subscribe(results => {
      let extras: NavigationExtras = {};
      let input: TradeInputData = new TradeInputData();
      input.selectedStock = results[0];
      input.stockSummary = results[1];
      input.tradeStrategy = results[2];
      extras.state = input;
      this.router.navigate(["/view-trade/" + rowModel.id], extras);
    });
  }




  expandRowOptions(index) {
    this.expandIndex = index;
  }

  closeActionBox() {
    this.expandIndex = null
  }

}



