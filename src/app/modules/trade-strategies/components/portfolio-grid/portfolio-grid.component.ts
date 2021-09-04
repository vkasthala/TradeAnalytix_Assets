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
import { TradeStrategyGridStore } from '../../services/trade-strategy-grid-store';
import { TradeStrategyGridService } from '../../services/trade-strategy-grid.service';
import { StrategiesGridFilter } from '../../models/strategies-grid-filter.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-portfolio-grid',
  templateUrl: './portfolio-grid.component.html',
  styleUrls: ['./portfolio-grid.component.scss']
})
export class PortfolioGrid implements AfterViewInit, OnInit {
  totalCount: number = 0;
  protected Loader = false;
  expandIndex: any;
  displayedColumns = ['id', 'stockName', 'strategy', 'openDate', 'totalAmount', 'maxGain', 'maxLoss', 'return', 'thesis', 'rules', 'action'];
  pageSize: number = 20

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  portfolioDataSource;
  tradeStrategyGridRequest: TradeStrategyGridRequest = this.getInitialRequest();
  private tradeStrategySubject = new BehaviorSubject<TradeStrategyGridRow[]>([]);
  strategiesGridFilter: StrategiesGridFilter = new StrategiesGridFilter();
  protected gridData: any;
  expandedIndex:any;

  public hideRuleContent:boolean[] = [];

  constructor(private tradeStrategyGridService: TradeStrategyGridService,
    private tradeStrategyService: TradeStrategyService,
    private stockSymbolService: StockSymbolService,
    private userStockStatsService: UserStockStatsService,
    private router: Router,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.loadPage();
    this.gridData = JSON.parse(localStorage.getItem('strategiesGridData'));
    this.expandedIndex = -1;
    this.strategiesGridFilter.status = 1;
  }

  loadPage() {
    
    this.tradeStrategyGridRequest.filters= this.strategiesGridFilter;
    this.tradeStrategyGridService.loadTradeStrategies(this.tradeStrategyGridRequest).subscribe(result => {
      if (result) {
        this.portfolioDataSource = result.rows
        this.tradeStrategySubject.next(result.rows);
        this.totalCount = result.totalCount;
      }
    });
    
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

  closeTrade(rowModel: TradeStrategyGridRow) {
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
      this.router.navigate(["/close-trade/" + rowModel.id], extras);
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


  deleteTrade(rowModel: TradeStrategyGridRow) {
    this.Loader = !this.Loader;
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
        this.Loader = !this.Loader;
      }
    });
  }

  expandRowOptions(index) {
    this.expandIndex = index;
  }

  closeActionBox() {
    this.expandIndex = null
  }
  
  Collaps(index: number) {  
    this.hideRuleContent[index] = !this.hideRuleContent[index]; 
  }

}
