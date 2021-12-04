import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ActionType } from '../../shared/models/trade-management/action-type.enum';
import { OptionEntry } from '../../shared/models/trade-management/option-entry.model';
import { OptionType } from '../../shared/models/trade-management/option-type.enum';
import { StockEntry } from '../../shared/models/trade-management/stock-entry.model';
import { StockSymbol } from '../../shared/models/trade-management/stock-symbol.model';
import { StrategyType } from '../../shared/models/trade-management/strategy-type.enum';
import { TradeInputData } from '../../shared/models/trade-management/trade-input-data.model';
import { UserStockSummary } from '../../shared/models/trade-management/user-stock-summary.model';
import { StrategyCreateService } from '../../shared/services/strategy-create.service';
import { UserStockStatsService } from '../../shared/services/user-stock-stats.service';
import { UtilService } from '../../utilities/services/util.service';
import { OptionResult } from '../models/option-result.model';
import { RiskAnalysisRecord } from '../models/risk-analysis-record.model';
import { RiskAnalysisRequest } from '../models/risk-analysis-request.model';
import { StockResult } from '../models/stock-result.model';
import { RiskAnalysisService } from '../services/risk-analysis.service';
import { StrategyTemplate } from '../../shared/models/trade-management/strategy-template.model';
import { TradeStrategy } from '../../trade-management/models/trade-strategy.model';
import { ToastrService } from 'ngx-toastr';
import { RiskAnalysisChartComponent } from './risk-analysis-chart/risk-analysis-chart.component';
import { MaxRiskDetails } from '../models/max-risk-details.model';
import { UpdateStockPricePopupComponent } from './update-stock-price-popup/update-stock-price-popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-risk-analysis',
  templateUrl: './risk-analysis.component.html',
  styleUrls: ['./risk-analysis.component.scss']
})


export class RiskAnalysisComponent implements OnInit {
  @Input('matTooltipShowDelay') showDelay: number;
  @Input('matTooltipHideDelay') hideDelay: number;
  @Input("editTrade") editTrade: boolean;
  @ViewChild('riskAnalysisChart', { static: false }) private riskAnalysisChartComponent: RiskAnalysisChartComponent;
  minDate = new Date();

  currentState: number = 1;
  selectedStrategy: number = 15;

  stockAdded: boolean;
  stockPriceUpdated: boolean;
  performRiskAnalysis: boolean;
  displayRiskAnalysis: boolean;
  analyzeRisk: boolean;
  detailSummaryLoaded: boolean;
  fromAddTrade: boolean;

  selectedStock: StockSymbol = new StockSymbol();
  stockSummary: UserStockSummary = new UserStockSummary();

  inputState: TradeInputData;

  strategies = StrategyType;
  strategyTypes: String[] = this.strategyCreateService.getStrategies();

  stockEntry: StockEntry;
  stockOptions: OptionEntry[] = [];

  riskAnalysisResults: RiskAnalysisRecord[] = [];

  maxRiskDetails: MaxRiskDetails;
  protected add = true;
  protected Loader = false;

  showFormSec: boolean = false;
  showStockSec: boolean = false;
  showStockForm: boolean = false;
  showOptionLegForm: boolean = false;
  editStockForm: boolean = false;
  editOptionForm: boolean = false;
  showNextBtn: boolean = false;
  protected optionGroup:any = {};
  stockTable: boolean = true;
  optionTable: boolean = false;
  totalTable: boolean = false;
  selectedOptionResult: any;
  isEditTrade: boolean = false;
  constructor(private utilService: UtilService,
    private riskAnalysisService: RiskAnalysisService,
    private userStockStatsService: UserStockStatsService,
    private strategyCreateService: StrategyCreateService,
    private toastr: ToastrService,
    private router: Router,
    private _dialog: MatDialog) {
    this.stockEntry = this.createStockEntry();
    this.initState();
  }

  step = 0;
  panelOpenState = false;
  panelDisabled = true;
  panel3Disabled = true;
  panelExpand = false;

  ngOnInit() {
  }


  enterSymbol() {
    if (!this.selectedStock || !this.selectedStock.code) {
      this.toastr.error('Please enter a valid symbol to proceed', '', 
      { 
        tapToDismiss:false,
        closeButton:true,
        disableTimeOut: true
      });
      return false;
    }
    this.currentState++;
  }

  addStock() {
    this.stockAdded = true;
    this.performRiskAnalysis = false;
    this.displayRiskAnalysis = false;
    this.showOptionLegForm = false;
    this.stockEntry = this.createStockEntry();
  }

  enableStockForm() {
    this.stockAdded = true;
    this.showFormSec = true;
    this.showStockForm = true;
    this.showOptionLegForm = false;
  }
  showStock() {
    this.showFormSec = false;
    this.showStockSec = true;
    this.showStockForm = false;
    this.showNextBtn = true;
  }
  showOptionForm() {
    this.showFormSec = true;
    this.showStockForm = false;
    this.showOptionLegForm = true;
  }

  addOption() {
    if (this.stockOptions.length < 4) {
      this.stockOptions.push(this.createStockOptionEntry())
    }
  }
  addOption1() {
    let optionData = this.optionGroup;
    this.showStockForm = false;
    if (this.stockOptions.length < 4) {
      this.showFormSec = false;
      this.stockOptions.push(optionData)
      this.showOptionLegForm = false;
    }
  }

  deleteStock() {
    this.stockAdded = false;
    this.stockPriceUpdated = false;
    if (this.stockOptions.length == 0) {
      this.displayRiskAnalysis = false;
      this.riskAnalysisResults = [];
      this.analyzeRisk = false;
      this.maxRiskDetails = null;
      this.showNextBtn = false;
    }
    this.stockEntry = this.createStockEntry();
    this.showStockSec = false;
    this.showFormSec = false;
    this.showStockForm = false;
    this.editStockForm = false;
  }

  deleteStockOption(index) {
    this.stockOptions.splice(index, 1);
    if (this.stockOptions.length == 0 && this.stockAdded == false) {
      this.displayRiskAnalysis = false;
      this.riskAnalysisResults = [];
      this.analyzeRisk = false;
      this.maxRiskDetails = null;
    }
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
      this.stockEntry.price = this.stockSummary.close;
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
    if (this.isEditTrade) {
      this.router.navigate(['/edit-trade/' + input.tradeStrategy.id], extras);
    } else {
      this.router.navigate(['/new-trade'], extras);
    }
  }

  addEvent(input: any, event: any, index: number) {
    this.stockOptions[index]['expireDate'] = event.value._d;
  }

  onStrategyTypeChange(strategy: Number) {
    console.log('selected strategy:', strategy);
    let template: StrategyTemplate = this.strategyCreateService.getStrategyTemplate(strategy);
    if (template) {
      this.stockEntry = template.stockEntry;
      this.stockAdded = template.stockEntry ? true : false;
      if (this.stockAdded) {
        this.stockEntry.price = this.stockSummary.close;
      } else if (!this.stockEntry) {
        this.stockEntry = this.createStockEntry();
      }
      this.stockOptions = template.optionEntries;
    }
  }

  riskAnalysisGridChange(value:string) {
    if (value === 'stockTb') {
      this.optionTable = false;
      this.totalTable = false;
      this.stockTable = true;
    } else if (value === 'totalTB') {
      this.stockTable = false;
      this.optionTable = false
      this.totalTable = true;
    } else {
      var numeric = Number(value);
      this.stockTable = false;
      this.totalTable = false;
      this.optionTable = true;
      this.selectedOptionResult = Number(value);
    }
  }

  editStock(element) {
    this.showFormSec = true;
    this.editOptionForm = false;
    this.showStockForm = true;
    this.editStockForm = true;
    this.showOptionLegForm = false;
  }
  editOptionLeg(index) {
    this.showFormSec = true;
    this.editOptionForm = true;
    this.showOptionLegForm = true;
  }
  cancelTradeStock(index) {
    this.showFormSec = false;
    this.editOptionForm = false;
    this.showOptionLegForm = false;
    this.showStockForm = false;
  }
  cancelTradeOption(index) {
    this.showFormSec = false;
    this.editOptionForm = false;
    this.showOptionLegForm = false;
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
        this.inputState = state;
        this.selectedStock = state.selectedStock;
        this.stockSummary = state.stockSummary;
        this.fromAddTrade = true;
        this.currentState++;
        console.log('stockSummary:', state.selectedStock);
        console.log('stockSummary:', state.stockSummary);
        if (state.tradeStrategy && state.tradeStrategy.stockEntry && state.tradeStrategy.stockEntry.length > 0) {
          console.log('stock:', state.tradeStrategy.stockEntry);
          this.stockEntry = state.tradeStrategy.stockEntry[0];
          this.stockAdded = state.tradeStrategy.stockEntry[0].actionType && state.tradeStrategy.stockEntry[0].quantity > 0;
          if (!this.stockEntry.riskFreeRate) {
            this.stockEntry.lowerBound = -10;
            this.stockEntry.upperBound = 10;
            this.stockEntry.riskFreeRate = 6;
          }
        }
        if (state.tradeStrategy && state.tradeStrategy.stockOptions) {
          console.log('stockOptions:', state.tradeStrategy.stockOptions);
          for(let ind = 0; ind < state.tradeStrategy.stockOptions.length; ind++){
            if(state.tradeStrategy.stockOptions[ind].contracts !== 0) {
              this.stockOptions.push(state.tradeStrategy.stockOptions[ind]);
            }
          }
          
        }
        if (state.tradeStrategy && state.tradeStrategy.strategyTypeId) {
          this.selectedStrategy = state.tradeStrategy.strategyTypeId;
        }
        this.isEditTrade = state.tradeStrategy.isEditTrade
      }
      if (this.stockOptions && this.stockOptions.length > 0) {
        for (let ind = 0; ind < this.stockOptions.length; ind++) {
          console.log(this.stockOptions[ind].expireDate);
          let todayDate = new Date();
          todayDate.setHours(0,0,0,0);
          let currentDate = new Date(this.stockOptions[ind].expireDate);          
          if (currentDate < todayDate) {
            this.toastr.error("Expiry date is in the past. Please change it.", '', 
            { 
              tapToDismiss:false,
              closeButton:true,
              disableTimeOut: true
            });
          } 
        }
      }
    } 
  }

  initRiskAnalysisChart(riskAnalysisRequest: RiskAnalysisRequest) {
    this.riskAnalysisService.getRiskAnalysisChart(riskAnalysisRequest).subscribe(chartResult => {
      this.riskAnalysisChartComponent.loadChart(chartResult);
    });
  }

  initChart() {
    this.Loader = !this.Loader;
    if (this.riskAnalysisChartComponent) {
      this.initRiskAnalysisChart(this.createRiskAnalysisRequest());
      this.Loader = !this.Loader;
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
    this.maxRiskDetails = null;
    this.getRiskAnalysisResults();
  }

  checkForStockPrice() {
    this.Loader = !this.Loader;
    if (!this.stockAdded && !this.stockPriceUpdated) {
      this.openUpdateStockPricePopup();
      this.Loader = !this.Loader;
    } else {
      this.loadImpliedVolatility();
      this.Loader = !this.Loader;
    }
  }

  openUpdateStockPricePopup() {
    let dialogData = {
      update: 'false',
      stockPrice: this.stockEntry.price
    };
    const dialogRef = this._dialog.open(UpdateStockPricePopupComponent, {
      disableClose: true,
      width: 'auto',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe((res) => {
      console.log('here...', res);
      this.stockPriceUpdated = true;
      if (res.update == 'true') {
        this.stockEntry.price = res.stockPrice;
      }
      this.loadImpliedVolatility();
    });
  }

  loadImpliedVolatility() {
    if (this.validateInputs() == false) {
      return;
    }
    this.panelOpenState = true;
    this.panelDisabled = false;
    this.performRiskAnalysis = true;
    this.displayRiskAnalysis = true;
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

  validateInputs(): boolean {
    if (this.stockAdded) {
      if (!this.stockEntry.price || this.stockEntry.price == 0) {
        this.toastr.error('Invalid Stock Price', '', 
        { 
          tapToDismiss:false,
          closeButton:true,
          disableTimeOut: true
        });
        return false;
      }

      if (!this.stockEntry.quantity || this.stockEntry.quantity == 0) {
        alert('Invalid Stock Quantity');
        return false;
      }
    }

    if (this.stockOptions && this.stockOptions.length > 0) {
      for (let ind = 0; ind < this.stockOptions.length; ind++) {
        if (!this.stockOptions[ind].price || this.stockOptions[ind].price == 0) {
          alert('Invalid Option Price');
          return false;
        }

        if (!this.stockOptions[ind].contracts || this.stockOptions[ind].contracts == 0) {
          alert('Invalid Option Contracts');
          return false;
        }

        if (!this.stockOptions[ind].strikePrice || this.stockOptions[ind].strikePrice == 0) {
          alert('Invalid Option Strike Price');
          return false;
        }

        if (!this.stockOptions[ind].expireDate) {
          alert('Invalid Option Expiry Date');
          return false;
        }
      }
    }
    return true;
  }

  createStockEntry(): StockEntry {
    let stockEntry: StockEntry = new StockEntry();
    stockEntry.price = this.stockSummary.close;
    stockEntry.lowerBound = -10;
    stockEntry.upperBound = 10;
    stockEntry.riskFreeRate = 6;
    stockEntry.actionType = null;
    if (this.showStockForm) {
      stockEntry.quantity = this.stockEntry.quantity;
      stockEntry.actionType = this.stockEntry.actionType;
    }
    return stockEntry;
  }

  createStockOptionEntry(): OptionEntry {
    let option: OptionEntry = new OptionEntry();
    option.actionType = ActionType["Buy to Open"];
    option.optionType = OptionType.Call;
    return option;
  }

  getRiskAnalysisResults(): RiskAnalysisRecord[] {
    this.Loader = !this.Loader;
    this.riskAnalysisResults = [];
    let riskAnalysisRequest: RiskAnalysisRequest = this.createRiskAnalysisRequest();

    console.log('risk analysis request:', JSON.stringify(riskAnalysisRequest));

    this.riskAnalysisService.getRiskAnalysisResult(riskAnalysisRequest).subscribe(result => {
      console.log("success:", result)
      this.riskAnalysisResults = result.records;
      this.panelExpand = true;
      this.panel3Disabled = false;
      this.Loader = !this.Loader;
    },
      errResponse => {
        console.log("error:", errResponse);
        this.Loader = !this.Loader;
      });
    if (this.riskAnalysisChartComponent) {
      this.initRiskAnalysisChart(riskAnalysisRequest);
    }
    return [];
  }

  createRiskAnalysisRequest(): RiskAnalysisRequest {
    let riskAnalysisRequest: RiskAnalysisRequest = new RiskAnalysisRequest();
    riskAnalysisRequest.stockPrice = this.stockEntry;
    riskAnalysisRequest.options = this.stockOptions;
    return riskAnalysisRequest;
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

  calculateMaxRisk() {
    let riskAnalysisRequest: RiskAnalysisRequest = this.createRiskAnalysisRequest();

    console.log('max risk request:', JSON.stringify(riskAnalysisRequest));

    this.riskAnalysisService.getMaxRiskDetails(riskAnalysisRequest).subscribe(result => {
      console.log("max details success:", result)
      this.maxRiskDetails = result;
    },
      errResponse => {
        console.log("max details error:", errResponse);
      });
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

  isValidDetails(): boolean {
    return this.isValidStockEntry() && this.isValidOptionEntries();
  }

  isValidStockEntry(): boolean {
    if (!this.stockAdded) {
      return true;
    }
    return this.stockEntry && this.stockEntry.actionType && this.stockEntry.quantity > 0 && this.stockEntry.price > 0;
  }

  isValidOptionEntries(): boolean {
    if (!this.stockOptions || this.stockOptions.length == 0) {
      return true;
    }
    let status: boolean = true;
    for (let ind = 0; ind < this.stockOptions.length; ind++) {
      status = this.stockOptions[ind].actionType !== undefined && this.stockOptions[ind].strikePrice !== undefined && this.stockOptions[ind].strikePrice > 0 && this.stockOptions[ind].contracts > 0 && this.stockOptions[ind].expireDate !== undefined && this.stockOptions[ind].price !== undefined && this.stockOptions[ind].price > 0;
    }
    return status;
  }

}

