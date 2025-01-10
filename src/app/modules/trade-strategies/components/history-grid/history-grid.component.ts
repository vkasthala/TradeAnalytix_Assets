import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort } from '@angular/material';
import { NavigationExtras, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/app/modules/shared/components/modals/confirm-dialog/confirm-dialog.component';
import { TradeInputData } from 'src/app/modules/shared/models/trade-management/trade-input-data.model';
import { StockSymbolService } from 'src/app/modules/shared/services/stock-symbol.service';
import { UserStockStatsService } from 'src/app/modules/shared/services/user-stock-stats.service';
import { TradeStrategyService } from 'src/app/modules/trade-management/services/trade-strategy.service';
import { StrategiesGridPage } from '../../models/strategies-grid-page.model';
import { StrategiesGridSort } from '../../models/strategies-grid-sort.model';
import { TradeStrategyGridRequest } from '../../models/trade-strategy-grid-request.model';
import { TradeStrategyGridRow } from '../../models/trade-strategy-grid-row.model';
import { TradeStrategyGridService } from '../../services/trade-strategy-grid.service';
import { StrategiesGridFilter } from '../../models/strategies-grid-filter.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-history-grid',
  templateUrl: './history-grid.component.html',
  styleUrls: ['./history-grid.component.scss']
})
export class HistoryGrid implements AfterViewInit, OnInit {
  public get dialog(): MatDialog {
    return this._dialog;
  }
  public set dialog(value: MatDialog) {
    this._dialog = value;
  }

  protected Loader = false;
  expandIndex: any;
  // displayedColumns = ['action', 'stockName', 'id', 'openDate', 'closeDate', 'strategy', 'direction', 'journaled', 'netR', 'maxLoss', 'return', 'tags'];
  // Remove id to remove identifier, direction and maxLoss column from the open strategies grid
  displayedColumns = ['action', 'stockName', 'openDate', 'closeDate', 'strategy', 'return', 'netR', 'journaled', 'brokerName'];
  pageSize: number = 20

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  historyDataSource: TradeStrategyGridRow[];
  tradeStrategyGridRequest: TradeStrategyGridRequest = this.getInitialRequest();
  private tradeStrategySubject = new BehaviorSubject<TradeStrategyGridRow[]>([]);
  strategiesGridFilter: StrategiesGridFilter = new StrategiesGridFilter();

  protected gridData: any;
  expandedIndex: any;

  public hideRuleContent: boolean[] = [];
  public totalCount: number = 1;
  constructor(private tradeStrategyGridService: TradeStrategyGridService,
    private tradeStrategyService: TradeStrategyService,
    private stockSymbolService: StockSymbolService,
    private userStockStatsService: UserStockStatsService,
    private router: Router,

    private _dialog: MatDialog) {
  }

  ngOnInit() {
    this.strategiesGridFilter.status = 2;
    this.loadPage();
    this.expandedIndex = -1;
  }

  loadPage() {
    this.tradeStrategyGridRequest.filters = this.strategiesGridFilter;
    this.tradeStrategyGridService.loadTradeStrategies(this.tradeStrategyGridRequest).subscribe(result => {
      if (result) {
        this.historyDataSource = result.rows
        this.tradeStrategySubject.next(result.rows);
        this.totalCount = result.totalCount;
      } else {
        this.totalCount = 0;
      }
    });
  }

  reload(filter) {
    if (Object.keys(filter).length === 0) {
      this.strategiesGridFilter = new StrategiesGridFilter();
      this.strategiesGridFilter.status = 2;
    } else {
      this.strategiesGridFilter = Object.assign(this.strategiesGridFilter, filter);
    }
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

  }

  editTrade(rowModel: TradeStrategyGridRow) {
    this.Loader = !this.Loader;
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
      this.router.navigate(["/edit-trade/" + rowModel.id], extras);
      this.Loader = !this.Loader;
    });
  }

  viewTrade(rowModel: TradeStrategyGridRow) {
    this.Loader = !this.Loader;
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
      this.Loader = !this.Loader;
    });
  }

  expandRowOptions(index) {
    this.expandIndex = index;
  }

  closeActionBox() {
    this.expandIndex = null
  }

  Collaps(index: number) {
    // this.expandedIndex[index] = !this.expandedIndex[index];
    this.hideRuleContent[index] = !this.hideRuleContent[index];
  }

  getPageSizes(): number[] {
    if (this.historyDataSource && this.historyDataSource.length > 0) {
      return [5, 10, 20, this.historyDataSource.length];
    }
    else {
     return [5, 10, 20];
    }
  }


}
