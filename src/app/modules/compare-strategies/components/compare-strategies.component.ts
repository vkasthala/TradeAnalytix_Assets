import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StrategyDetailsComponent } from 'src/app/modules/compare-strategies/components/strategy-details/strategy-details.component';
import { CompareStrategyResponse } from '../../compare-strategies/models/compare-strategy-response.model';
import { StrategyCompareRequest } from '../../compare-strategies/models/strategy-compare-request.model';
import { StrategyInput } from '../../compare-strategies/models/strategy-input.model';
import { CompareStrategiesService } from '../../compare-strategies/services/compare-strategies.service';
import { UserTagService } from '../../settings/services/user-tag.service';
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
  tags: string[][] = [];

  riskFreeRate: number = 6;
  lowerBound: number = -10;
  upperBound: number = 10;
  stockPrice: number;

  compareResult: CompareStrategyResponse;
  stockEntry: StockEntry;

  stockOptions: OptionEntry[] = [];
  selectedStrategy: number = 15;
  protected add = true;
  showCompareResult: boolean = false;
  selectedItem: any = [];
  public selectedStrategyTable: number = 0;
  constructor(
    private userStockStatsService: UserStockStatsService,
    private compareStrategyService: CompareStrategiesService,
    private userTagService: UserTagService,
    private toastr: ToastrService,
    private router: Router,
    private _dialog: MatDialog) {
  }

  ngOnInit() {

  }

  enterSymbol() {
    if (!this.selectedStock || !this.selectedStock.code) {
      this.toastr.error('Please enter a valid symbol to proceed', 'Error');
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
        this.strategiesList = result.slice(0, 2);
        this.selectedStrategies = result.slice(0, 2);
        this.refreshTags();
      }
    })
  }

  addStrategy(index) {
    let strategyItem = [];
    if (index === undefined) {
      index = this.strategiesList.length - 1;
      strategyItem.push(this.userStrategies[index]);
      this.selectedItem = strategyItem;
      //this.selectedStrategies.push(this.userStrategies[index]);
    }
    //this.compareResult = null;
    if (this.strategiesList.length < 5) {
      if (this.userStrategies.length > 0) {
        this.strategiesList.push(this.selectedItem[0]);
      }
      this.selectedStrategies.push(this.userStrategies[index]);
    }
    this.refreshTags();
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
    this.selectedStrategies.splice(index, 1);
    this.tags = [];
    this.selectedStrategies.forEach(strategy => this.tags.push(this.getStrategyTags(strategy)));
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
    }, err => {
      this.toastr.error('Please check the data within the strategies and try again.', 'Error');
    });
    //Load chart if it is already rendered
    if (this.compareStrategiesChartComponent && this.compareStrategiesChartComponent.rendered === true) {
      this.initChart(true);
    }
  }

  strategyIndexChange(value) {
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

  onStrategyChange(event: any, index: number) {
    let ind = event;
    this.selectedItem = [];
    this.selectedStrategies[index] = this.userStrategies[ind];
    this.selectedItem.push(this.userStrategies[index]);
    this.refreshTags();
    // let deleteLink = document.querySelector('.strategy_select');
    //deleteLink.setAttribute();
    // console.log('deleteLink', deleteLink)
  }

  refreshTags() {
    this.tags = [];
    this.selectedStrategies.forEach(strategy => this.tags.push(this.getStrategyTags(strategy)));
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

  getStrategyTags(strategy: StrategyInput): string[] {
    if(!strategy) {
      return undefined;
    }
    let tags: string[] = [];
    if (strategy.tagIds) {
      let tagIds: string[] = strategy.tagIds.split(',');
      tagIds.forEach(tagId => {
        if (tagId !== '') {
          tags.push(this.userTagService.getTagNameById(parseInt(tagId)));
        }
      })
    }
    return tags;
  }

  closePopup(e) {
    let iframe = document.querySelector('iframe');
    iframe.src='';
    iframe.setAttribute("src",'');
  }
}
