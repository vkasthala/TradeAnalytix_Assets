import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog } from '@angular/material';
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
import { ConfirmDialogComponent } from 'src/app/modules/shared/components/modals/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-trade-strategies-grid',
  styleUrls: ['trade-strategies-grid.css'],
  templateUrl: 'trade-strategies-grid.html',
})
export class TradeStrategiesGrid implements AfterViewInit, OnInit {
  expandIndex: any;
  displayedColumns = ['id', 'strategy', 'stockName', 'direction', 'openDate', 'closeDate', 'maxLoss', 'maxGain', 'return', 'status', 'action'];
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


  deleteTrade(rowModel: TradeStrategyGridRow) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: 'auto',
      height: 'auto',
      data: { 'message': 'Are you sure you want to delete this strategy?' }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        this.tradeStrategyService.deleteTradeStrategy(rowModel.id).subscribe(() => {
          console.log('Trade strategy deleted..', rowModel.id);
          this.reload();
        });
      }
    });
  }

  expandRowOptions(index) {
    this.expandIndex = index;
  }

  closeActionBox() {
    this.expandIndex = null
  }

}



