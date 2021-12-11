import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StrategyDetailsComponent } from 'src/app/modules/compare-strategies/components/strategy-details/strategy-details.component';
import { CompareStrategyResponse } from '../../compare-strategies/models/compare-strategy-response.model';
import { StrategyCompareRequest } from '../../compare-strategies/models/strategy-compare-request.model';
import { StrategyInput } from '../../compare-strategies/models/strategy-input.model';
import { CompareStrategiesService } from '../../compare-strategies/services/compare-strategies.service';
import { OptionEntry } from '../../shared/models/trade-management/option-entry.model';
import { StockEntry } from '../../shared/models/trade-management/stock-entry.model';
import { StockSymbol } from '../../shared/models/trade-management/stock-symbol.model';
import { TradeInputData } from '../../shared/models/trade-management/trade-input-data.model';
import { UserStockSummary } from '../../shared/models/trade-management/user-stock-summary.model';
import { UserStockStatsService } from '../../shared/services/user-stock-stats.service';
import { TradeStrategy } from '../../trade-management/models/trade-strategy.model';
import { CompareStrategyDetails } from '../models/compare-strategy-details.model';
import { CompareStrategiesChartComponent } from './compare-strategies-chart/compare-strategies-chart.component';
import { UpdateStrategyPopupComponent } from './update-strategy-popup/update-strategy-popup.component';

@Component({
  selector: 'app-compare-strategies',
  templateUrl: './compare-strategies.component.html',
  styleUrls: ['./compare-strategies.component.scss']
})
export class CompareStrategiesComponent implements OnInit {
  @Input('matTooltipShowDelay') showDelay: number;
  @Input('matTooltipHideDelay') hideDelay: number;

  @ViewChild('compareStrategiesChart', { static: false }) private compareStrategiesChartComponent: CompareStrategiesChartComponent;

  currentState: number = 1;

  selectedStock: StockSymbol = new StockSymbol();
  stockSummary: UserStockSummary = new UserStockSummary();
  inputState: TradeInputData;
  step = 0;
  panelOpenState = false;
  panelDisabled = true;
  panel3Disabled = true;
  panelExpand = false;
  detailSummaryLoaded: boolean = false;

  userStrategies: StrategyInput[] = [];
  strategiesList: StrategyInput[] = [];
  selectedStrategies: StrategyInput[] = new Array<StrategyInput>(5);

  riskFreeRate: number = 6;
  lowerBound: number = -10;
  upperBound: number = 10;
  stockPrice: number;

  compareResult: CompareStrategyResponse;
  stockEntry: StockEntry;

  stockOptions: OptionEntry[] = [];
  selectedStrategy: number = 15;
  protected add = true;
  showCompareResult : boolean = false;
  selectedItem: any = [];
  public selectedStrategyTable: number = 0;
  constructor(
    private userStockStatsService: UserStockStatsService,
    private compareStrategyService: CompareStrategiesService,
    private toastr: ToastrService,
    private router: Router,
    private _dialog: MatDialog) {
  }

  ngOnInit() {

  }

  enterSymbol() {
    if (!this.selectedStock || !this.selectedStock.code) {
      this.toastr.error('Please enter a valid symbol to proceed', 'Error',
      { 
        tapToDismiss:false,
        closeButton:true,
        disableTimeOut: true
      });
      return false;
    }
    this.currentState++;
  }

  symbolSelectEventHandler($event: any) {
    this.selectedStock = $event;
    this.loadStockBriefSummary();
    this.loadUserStrategies();
  }

  loadUserStrategies() {
    //Load strategies
    this.compareStrategyService.getStrategiesList(this.selectedStock.id).subscribe(result => {
      this.userStrategies = result;
      if (result.length > 0) {
        this.strategiesList = result.slice(0, 2);;
        this.selectedStrategies = this.strategiesList;
      }
    })
  }

  addStrategy(index) {
    let strategyItem = [];
    if (index === undefined) {
      index = this.strategiesList.length;
      strategyItem.push(this.userStrategies[index]);
      this.selectedItem = strategyItem;
    }
    //this.compareResult = null;
    if (this.strategiesList.length < 5) {
      if (this.userStrategies.length > 0) {
        this.strategiesList.push(this.selectedItem[0]);
      }
    }
  }

  loadMoreStatsHandler($event: any) {
    console.log('load more stats:', $event);
    this.loadStockDetailSummary();
  }

  loadStockBriefSummary() {
    this.userStockStatsService.getUserStockBriefSummary(this.selectedStock.id, 1).subscribe(result => {
      this.stockSummary = result;
      if (this.stockSummary.close) {
        this.stockPrice = this.stockSummary.close;
      }
    });
  }

  loadStockDetailSummary() {
    this.userStockStatsService.getUserStockDetailSummary(this.selectedStock.id, 1).subscribe(result => {
      this.detailSummaryLoaded = true;
      this.stockSummary = result;
    });
  }

  checkForDecimalValidation(event) {
    event.target.value = parseFloat(event.target.value).toFixed(2);
  }

  deleteStrategyItem(index: number) {
    let newStratetegies: StrategyInput[] = [];
    let selected: StrategyInput[] = new Array<StrategyInput>(5);
    for (let ind = 0; ind < this.strategiesList.length; ind++) {
      if (ind !== index) {
        newStratetegies.push(this.strategiesList[ind]);
        selected[ind] = this.selectedStrategies[ind];
      }
    }
    this.strategiesList = newStratetegies;
    this.selectedStrategies = selected;
  }

  enforceMaxLength($event, min, max) {
    let t = $event.target;
    if (t.value < min || t.value > max) {
      return false;
    }
  }


  setStep(index: number) {
    // this.step = index;
  }

  afterPanelClosed(event) {
    if (event == 1) {
      this.panelOpenState = false;
    }

    this.panelExpand = false;
  }

  afterPanelOpened() {
    console.log("Panel opened!");
  }

  submitStrategies() {
    this.compareStrategyService.compareStrategies(this.createStrategyCompareRequest()).subscribe(result => {
      console.log("strategy compare result:", result);
      this.compareResult = result;
      this.showCompareResult = true;      
    });
    //Load chart if it is already rendered
    if (this.compareStrategiesChartComponent && this.compareStrategiesChartComponent.rendered === true) {
      this.initChart(true);
    }
  }

  stratgeyIndexChange(value) {
    this.selectedStrategyTable = Number(value);
  }

  createStrategyCompareRequest(): StrategyCompareRequest {
    let request: StrategyCompareRequest = new StrategyCompareRequest();
    request.strategies = this.selectedStrategies;
    request.lowerBound = this.lowerBound;
    request.upperBound = this.upperBound;
    request.riskFreeRate = this.riskFreeRate;
    request.stockPrice = this.stockPrice;
    return request;
  }

  onStrategyChange(index: number) {
    this.selectedItem = [];
    console.log('selected: ', this.userStrategies[index]);
    this.selectedStrategies[index] = this.userStrategies[index];
    this.selectedItem.push(this.userStrategies[index]);
  }

  editStrategyItem(index) {
    if (this.selectedStrategies[index].details) {
      this.openUpdateStrategyDetailsPopup(this.selectedStrategies[index].details, index);
    } else {
      this.compareStrategyService.getStrategyDetails(this.createGetStrategyDetailsRequest(index)).subscribe(result => {
        this.openUpdateStrategyDetailsPopup(result, index);
      });
    }
  }

  openUpdateStrategyDetailsPopup(strategyDetails: CompareStrategyDetails, index) {
    let dialogData: any = {};
    dialogData.details = strategyDetails;
    dialogData.strategyUid = this.selectedStrategies[index].uid;
    const dialogRef = this._dialog.open(UpdateStrategyPopupComponent, {
      disableClose: false,
      width: 'auto',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.selectedStrategies[index].details = res;
      }
    });
  }

  createGetStrategyDetailsRequest(index): StrategyCompareRequest {
    let request: StrategyCompareRequest = new StrategyCompareRequest();
    request.strategies = [this.selectedStrategies[index]];
    request.lowerBound = this.lowerBound;
    request.upperBound = this.upperBound;
    request.riskFreeRate = this.riskFreeRate;
    request.stockPrice = this.stockPrice;
    return request;
  }

  initChart(forceReload: boolean) {
    /*if (this.compareStrategiesChartComponent && this.compareStrategiesChartComponent.rendered === true && forceReload === false) {
      return;
    }*/
    this.compareStrategyService.getCompareStrategiesChart(this.createStrategyCompareRequest()).subscribe(chartData => {
      if (chartData) {
        this.compareStrategiesChartComponent.loadChart(chartData);
      }
    });
  }

  StrategyDetailsModal(index) {
    if (this.selectedStrategies[index].details !== undefined) {
      this.openStrategyDetailsPopup(this.selectedStrategies[index].details, index);
    } else {
      this.compareStrategyService.getStrategyDetails(this.createGetStrategyDetailsRequest(index)).subscribe(result => {
        this.openStrategyDetailsPopup(result, index);
      });
    }
  }

  openStrategyDetailsPopup(strategyDetails: CompareStrategyDetails, index) {
    let dialogData: any = {};
    dialogData.details = strategyDetails;
    const dialogRef = this._dialog.open(StrategyDetailsComponent, {
      disableClose: false,
      width: 'auto',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe((res) => {

    });
  }

  navigateToAddTrade() {
    let extras: NavigationExtras = {};
    let input: TradeInputData;
    if (this.inputState) {
      input = this.inputState;
      let stockEntries = [];
      if (this.stockEntry) {
        stockEntries.push(this.stockEntry);
      }
      input.tradeStrategy.stockEntry = stockEntries;
      input.tradeStrategy.stockOptions = this.stockOptions;
      input.tradeStrategy.strategyTypeId = this.selectedStrategy;
    } else {
      input = new TradeInputData();
      let tradeStrategy: TradeStrategy = new TradeStrategy();
      let stockEntries = [];
      if (this.stockEntry) {
        stockEntries.push(this.stockEntry);
      }
      tradeStrategy.stockEntry = stockEntries;
      tradeStrategy.stockOptions = this.stockOptions;
      tradeStrategy.strategyTypeId = this.selectedStrategy;
      input.tradeStrategy = tradeStrategy;
      input.selectedStock = this.selectedStock;
      input.stockSummary = this.stockSummary;
    }
    extras.state = input;
    this.router.navigate(['/new-trade'], extras);
  }
}
