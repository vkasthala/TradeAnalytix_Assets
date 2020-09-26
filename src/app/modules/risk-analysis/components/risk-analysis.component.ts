import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ActionType } from '../../shared/models/trade-management/action-type.enum';
import { OptionEntry } from '../../shared/models/trade-management/option-entry.model';
import { OptionType } from '../../shared/models/trade-management/option-type.enum';
import { StockEntry } from '../../shared/models/trade-management/stock-entry.model';
import { StockSymbol } from '../../shared/models/trade-management/stock-symbol.model';
import { StrategyType } from '../../shared/models/trade-management/strategy-type.enum';
import { TradeInputData } from '../../shared/models/trade-management/trade-input-data.model';
import { UserStockSummary } from '../../shared/models/trade-management/user-stock-summary.model';
import { StrategyCreateServiceService } from '../../shared/services/strategy-create-service.service';
import { UserStockStatsService } from '../../shared/services/user-stock-stats.service';
import { UtilService } from '../../utilities/services/util.service';
import { OptionResult } from '../models/option-result.model';
import { RiskAnalysisRecord } from '../models/risk-analysis-record.model';
import { RiskAnalysisRequest } from '../models/risk-analysis-request.model';
import { StockResult } from '../models/stock-result.model';
import { RiskAnalysisService } from '../services/risk-analysis.service';
import { StrategyTemplate } from '../../shared/models/trade-management/strategy-template.model';

@Component({
  selector: 'app-risk-analysis',
  templateUrl: './risk-analysis.component.html',
  styleUrls: ['./risk-analysis.component.scss']
})
export class RiskAnalysisComponent implements OnInit {

  currentState: number = 1;
  selectedStrategy: number = 15;

  stockAdded: boolean;
  performRiskAnalysis: boolean;
  displayRiskAnalysis: boolean;
  analyzeRisk: boolean;
  detailSummaryLoaded: boolean;
  fromAddTrade: boolean;

  selectedStock: StockSymbol = new StockSymbol();
  stockSummary: UserStockSummary = new UserStockSummary();

  strategies = StrategyType;
  strategyTypes: String[] = this.strategyCreateServiceService.getStrategies();

  stockEntry: StockEntry = this.createStockEntry();
  stockOptions: OptionEntry[] = [];

  riskAnalysisResults: RiskAnalysisRecord[] = [];

  constructor(private utilService: UtilService,
    private riskAnalysisService: RiskAnalysisService,
    private userStockStatsService: UserStockStatsService,
    private strategyCreateServiceService: StrategyCreateServiceService,
    private router: Router) {
    this.initState();
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {

  }

  enterSymbol() {
    this.currentState++;
  }

  addStock() {
    this.stockAdded = true;
    this.performRiskAnalysis = false;
    this.displayRiskAnalysis = false;
    this.createStockEntry();
  }

  addOption() {
    if (this.stockOptions.length < 4) {
      this.stockOptions.push(this.createStockOptionEntry())
    }
  }


  deleteStock() {
    this.stockAdded = false;
    if (this.stockOptions.length == 0) {
      this.displayRiskAnalysis = false;
    }
  }

  deleteStockOption(index) {
    this.stockOptions.splice(index, 1);
  }

  decreaseStockLowerBand() {
    if (this.stockEntry.lowerBound < 1 && this.stockEntry.lowerBound > -100) {
      this.stockEntry.lowerBound--;
    }
  }

  increaseStockLowerBand() {
    if (this.stockEntry.lowerBound < 0 && this.stockEntry.lowerBound > -100) {
      this.stockEntry.lowerBound++;
    }
  }


  decreaseStockUpperBand() {
    if (this.stockEntry.upperBound > 0 && this.stockEntry.upperBound < 101) {
      this.stockEntry.upperBound--;
    }
  }

  increaseStockeUpperBand() {
    if (this.stockEntry.upperBound > -1 && this.stockEntry.upperBound < 100) {
      this.stockEntry.upperBound++;
    }
  }

  decreaseDaysLeft(index) {
    let stock = this.stockOptions[index];
    if (stock.daysLeft > 0 && stock.daysLeft < 731) {
      stock.daysLeft--;
    }
  }

  increaseDaysLeft(index) {
    let stock = this.stockOptions[index];
    if (stock.daysLeft >= 0 && stock.daysLeft < 731) {
      stock.daysLeft++;
    }
  }

  decreaseImpliedValue(index) {
    let stock: OptionEntry = this.stockOptions[index];
    if (stock.impliedVolatility > 1 && stock.impliedVolatility < 501) {
      stock.impliedVolatility--;
    }
  }

  increaseImpliedValue(index) {
    let stock: OptionEntry = this.stockOptions[index];
    if (stock.impliedVolatility > 1 && stock.impliedVolatility < 501) {
      stock.impliedVolatility++;
    }
  }

  symbolSelectEventHandler($event: any) {
    console.log('symbol:', $event);
    this.selectedStock = $event;
    this.loadStockBriefSummary();
  }

  loadMoreStatsHandler($event: any) {
    console.log('load more stats:', $event);
    this.loadStockDetailSummary();
  }

  loadStockBriefSummary() {
    this.userStockStatsService.getUserStockBriefSummary(this.selectedStock.id, 1).subscribe(result => {
      this.stockSummary = result;
    });
  }

  loadStockDetailSummary() {
    this.userStockStatsService.getUserStockDetailSummary(this.selectedStock.id, 1).subscribe(result => {
      this.detailSummaryLoaded = true;
      this.stockSummary = result;
    });
  }

  navigateToAddTrade() {
    let extras: NavigationExtras = {};
    let input: TradeInputData = {
      stockEntry: this.stockEntry,
      stockOptions: this.stockOptions,
      stockSummary: this.stockSummary,
      selectedStock: this.selectedStock,
      strategyType: this.selectedStrategy
    };
    extras.state = input;
    this.router.navigate(['/new-trade'], extras);
  }

  onStrategyTypeChange(strategy: Number) {
    console.log('selected strategy:', strategy);
    let template: StrategyTemplate = this.strategyCreateServiceService.getStrategyTemplate(strategy);
    if (template) {
      this.stockEntry = template.stockEntry;
      this.stockAdded = template.stockEntry ? true : false;
      this.stockOptions = template.optionEntries;
    }
  }

  initState(): void {
    if (!this.router.getCurrentNavigation()) {
      return;
    }
    let extras: NavigationExtras = this.router.getCurrentNavigation().extras;
    console.log('state---:', extras.state);
    if (extras.state) {
      let state: TradeInputData = <TradeInputData>extras.state;
      console.log('state:', state);
      if (state.selectedStock && state.stockSummary) {
        this.selectedStock = state.selectedStock;
        this.stockSummary = state.stockSummary;
        this.fromAddTrade = true;
        this.currentState++;
        console.log('stockSummary:', state.selectedStock);
        console.log('stockSummary:', state.stockSummary);
        if (extras.state.stockEntry) {
          console.log('stock:', state.stockEntry);
          this.stockAdded = true;
          this.stockEntry = state.stockEntry;
        }
        if (extras.state.stockOptions) {
          console.log('stockOptions:', state.stockOptions);
          this.stockOptions = state.stockOptions;
        }
        if (extras.state.strategyType) {
          this.selectedStrategy = state.strategyType;
        }
      }
    }
  }

  preventNegatives(e, preventDecimal?: boolean) {
    if (preventDecimal) {
      if (!((e.keyCode > 95 && e.keyCode < 106)
        || (e.keyCode > 47 && e.keyCode < 58)
        || e.keyCode == 8 || e.keyCode == 17 || e.keyCode == 110)) {
        if (e.keyCode != 190 && e.keyCode != 46 && e.keyCode != 37 && e.keyCode != 39 && e.keyCode != 9) {
          return false;
        } else {
          return true;
        }
      }
    } else {
      if (!((e.keyCode > 95 && e.keyCode < 106)
        || (e.keyCode > 47 && e.keyCode < 58)
        || e.keyCode == 8)) {
        if (e.keyCode != 190 && e.keyCode != 46 && e.keyCode != 37 && e.keyCode != 39 && e.keyCode != 9) {
          return false;
        } else {
          return true;
        }
      }
    }
  }

  checkForDecimalValidation(event) {
    event.target.value = parseFloat(event.target.value).toFixed(2);
  }


  enforceMaxLength($event, min, max) {
    let t = $event.target;
    if (t.value < min || t.value > max) {
      return false;
    }
  }

  initRiskAnalysis() {
    this.getRiskAnalysisResults();
  }

  loadImpliedVolatility() {
    let riskAnalysisRequest: RiskAnalysisRequest = new RiskAnalysisRequest();
    riskAnalysisRequest.stockPrice = this.stockEntry;
    riskAnalysisRequest.options = this.stockOptions;

    console.log('implied volatility request:', JSON.stringify(riskAnalysisRequest));

    this.riskAnalysisService.getImpliedVolatilityResult(riskAnalysisRequest).subscribe(result => {
      console.log("get implied volatility result:", result);
      result.forEach((value, index) => {
        this.stockOptions[index].daysLeft = value.daysLeft;
        this.stockOptions[index].impliedVolatility = Math.floor(value.impliedVolatility);
        this.stockOptions[index].initialImpliedVolatility = this.stockOptions[index].impliedVolatility;
      });
    }, errorResponse => {
      console.log("get implied volatility error:", errorResponse);
    });
  }

  createStockEntry(): StockEntry {
    let stockEntry: StockEntry = new StockEntry();
    stockEntry.price = this.stockSummary.close;
    stockEntry.lowerBound = -10;
    stockEntry.upperBound = 10;
    stockEntry.riskFreeRate = 6;
    stockEntry.actionType = ActionType["Buy to Open"];
    return stockEntry;
  }

  createStockOptionEntry(): OptionEntry {
    let option: OptionEntry = new OptionEntry();
    option.actionType = ActionType["Buy to Open"];
    option.optionType = OptionType.Call;
    return option;
  }

  getRiskAnalysisResults(): RiskAnalysisRecord[] {
    this.riskAnalysisResults = [];
    let riskAnalysisRequest: RiskAnalysisRequest = new RiskAnalysisRequest();
    riskAnalysisRequest.stockPrice = this.stockEntry;
    riskAnalysisRequest.options = this.stockOptions;

    console.log('risk analysis request:', JSON.stringify(riskAnalysisRequest));

    this.riskAnalysisService.getRiskAnalysisResult(riskAnalysisRequest).subscribe(result => {
      console.log("success:", result)
      this.riskAnalysisResults = result.records;
    },
      errResponse => {
        console.log("error:", errResponse);
      });
    return [];
  }

  createOptionResults(length: number): OptionResult[] {
    let optionResults: OptionResult[] = [];
    for (let ind = 0; ind < length; ind++) {
      let optionResult: OptionResult = new OptionResult();
      optionResult.price = 369.36;
      optionResult.value = 1458.45;
      optionResult.gainLoss = 1586.36;
      optionResult.heading = 'Option Heading - ' + ind;
      optionResults.push(optionResult);
    }
    return optionResults;
  }

  createStockResult(): StockResult {
    let stockResult: StockResult = new StockResult();
    stockResult.change = -10;
    stockResult.heading = 'Stock Heading';
    stockResult.stockPrice = 459.72;
    stockResult.gainLoss = 126.36;
    return stockResult;
  }

  refreshImpliedVolatility() {
    this.loadImpliedVolatility();
  }

  //Code for handling Mouse Hold event
  name: number = 0;
  timeoutHandler;

  public mouseup() {
    if (this.timeoutHandler) {
      clearInterval(this.timeoutHandler);
      this.name = 0;
      this.timeoutHandler = null;
    }
  }

  decreaseRiskFreeRate() {
    if (this.stockEntry.riskFreeRate > 0 && this.stockEntry.riskFreeRate < 101) {
      this.stockEntry.riskFreeRate--;
    }
  }

  increaseRiskFreeRate() {
    if (this.stockEntry.riskFreeRate > -1 && this.stockEntry.riskFreeRate < 100) {
      this.stockEntry.riskFreeRate++;
    }
  }

  /*
  * @mousedown 'Requires operation field which is the operation to be performed on mouse hold'
  */
  public mousedown(operations, index?) {
    this.timeoutHandler = setInterval(() => {
      switch (operations) {
        case 'increaseStockeUpperBand': this.increaseStockeUpperBand(); break;
        case 'decreaseStockUpperBand': this.decreaseStockUpperBand(); break;
        case 'increaseStockLowerBand': this.increaseStockLowerBand(); break;
        case 'decreaseStockLowerBand': this.decreaseStockLowerBand(); break;
        case 'decreaseDaysLeft': this.decreaseDaysLeft(index); break;
        case 'increaseDaysLeft': this.increaseDaysLeft(index); break;
        case 'decreaseImpliedValue': this.decreaseImpliedValue(index); break;
        case 'increaseImpliedValue': this.increaseImpliedValue(index); break;
        case 'decreaseRiskFreeRate': this.decreaseRiskFreeRate(); break;
        case 'increaseRiskFreeRate': this.increaseRiskFreeRate(); break;
      }
      this.name += 1;
    }, 100);
  }

  scroll(element: HTMLElement) {
    element.scrollIntoView();
  }


}
