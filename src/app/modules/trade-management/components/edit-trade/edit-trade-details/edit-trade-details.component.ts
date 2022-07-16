import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import * as $ from 'jquery';
import { MatDialog } from '@angular/material/dialog';
import { StockEntry } from 'src/app/modules/shared/models/trade-management/stock-entry.model';
import { OptionEntry } from 'src/app/modules/shared/models/trade-management/option-entry.model';
import { RiskAnalysisRecord } from 'src/app/modules/risk-analysis/models/risk-analysis-record.model';
import { UtilService } from 'src/app/modules/utilities/services/util.service';
import { RiskAnalysisService } from 'src/app/modules/risk-analysis/services/risk-analysis.service';
import { RiskAnalysisRequest } from 'src/app/modules/risk-analysis/models/risk-analysis-request.model';
import { ActionType } from 'src/app/modules/shared/models/trade-management/action-type.enum';
import { OptionType } from 'src/app/modules/shared/models/trade-management/option-type.enum';
import { SummaryResult } from 'src/app/modules/risk-analysis/models/summary-result.model';
import { OptionResult } from 'src/app/modules/risk-analysis/models/option-result.model';
import { StockResult } from 'src/app/modules/risk-analysis/models/stock-result.model';

@Component({
  selector: 'app-edit-trade-details',
  templateUrl: './edit-trade-details.component.html',
  styleUrls: ['./edit-trade-details.component.scss']
})
export class EditTradeDetailsComponent implements OnInit {

  addTrade: boolean = true;

  stockLowerBand: number = -10;
  stockUpperBand: number = 10;
  riskFreeRate: number = 10;

  currentState: number = 1;
  stockAdded: boolean;
  performRiskAnalysis: boolean;
  promptPerformRiskAnalysis: boolean;
  displayRiskAnalysis: boolean;
  analyzeRisk: boolean;

  stockEntry: StockEntry;
  stockOptions: OptionEntry[] = [];

  riskAnalysisResults: RiskAnalysisRecord[] = [];

  @Output('nextStep') nextStep = new EventEmitter();
  @Output('activateRisk') activateRisk = new EventEmitter();

  constructor(private utilService: UtilService, private riskAnalysisService: RiskAnalysisService, private _dialog: MatDialog) { }

  ngOnInit() {
    this.addStock();
  }

  ngAfterViewInit(): void {

  }

  enterSymbol() {
    this.currentState++;
  }

  addStock() {
    this.stockAdded = true;
    this.promptPerformRiskAnalysis = false;
    this.performRiskAnalysis = false;
    this.displayRiskAnalysis = false;
    this.createStockEntry();
  }

  addOption() {
    if (this.stockOptions.length < 4) {
      this.stockOptions.push(this.createStockOptionEntry())
    }
  }


  next() {
    this.nextStep.emit()
  }

  deleteStock() {
    this.stockAdded = false;
    if (this.stockOptions.length == 0) {
      this.displayRiskAnalysis = false;
      this.promptPerformRiskAnalysis = false;
    }
  }

  deleteStockOption(index) {
    this.stockOptions.splice(index, 1);

  }

  decreaseRiskFreeRate() {
    if (this.riskFreeRate > 0 && this.riskFreeRate < 101) {
      this.riskFreeRate--;
    }
  }

  increaseRiskFreeRate() {
    if (this.riskFreeRate > -1 && this.riskFreeRate < 100) {
      this.riskFreeRate++;
    }
  }

  decreaseStockLowerBand() {
    if (this.stockLowerBand < 1 && this.stockLowerBand > -100) {
      this.stockLowerBand--;
    }
  }

  increaseStockLowerBand() {
    if (this.stockLowerBand < 0 && this.stockLowerBand > -100) {
      this.stockLowerBand++;
    }
  }


  decreaseStockUpperBand() {
    if (this.stockUpperBand > 0 && this.stockUpperBand < 101) {
      this.stockUpperBand--;
    }
  }

  increaseStockeUpperBand() {
    if (this.stockUpperBand > -1 && this.stockUpperBand < 100) {
      this.stockUpperBand++;
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

  activateRiskAnalysisStep() {
    this.activateRisk.emit(true);
    this.loadImpliedVolatility();
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

  navigateToTradeThesis() {
    this.activateRiskAnalysisStep()
    this.nextStep.emit()
  }

  enforceMaxLength($event, min, max) {
    let t = $event.target;
    console.log("TradeDetailsComponent -> enforceMaxLength -> $event.target", $event.target)
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

  createStockEntry() {
    this.stockEntry = new StockEntry();
    this.stockEntry.price = 440.14;
    this.stockEntry.lowerBound = -10;
    this.stockEntry.upperBound = 10;
    this.stockEntry.riskFreeRate = 6;
    this.stockEntry.actionType = ActionType["Buy to Open"];
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
    riskAnalysisRequest.module = 'EDIT_TRADE';

    this.riskAnalysisService.getRiskAnalysisResult(riskAnalysisRequest).subscribe(result => {
      console.log("success:", result)
      this.riskAnalysisResults = result.records;
    },
      errResponse => {
        console.log("error:", errResponse);
      });
    return [];
  }

  createTotalSummary(): SummaryResult {
    let summaryResult: SummaryResult = new SummaryResult();
    summaryResult.gainLoss = 1456.23;
    return summaryResult;
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

}
