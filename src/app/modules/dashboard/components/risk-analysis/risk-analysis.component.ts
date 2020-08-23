import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { OptionEntry } from 'src/app/models/trade-details/option-entry.model';
import { StockEntry } from 'src/app/models/trade-details/stock-entry.model';
import { StockDetails } from 'src/app/models/trade-details/stock-details.model';
import { RiskAnalysisRecord } from 'src/app/models/trade-details/risk-analysis-record.model';
import { ActionType } from 'src/app/models/trade-details/action-type.enum';
import { OptionType } from 'src/app/models/trade-details/option-type.enum';
import { StockResult } from 'src/app/models/trade-details/stock-result.model';
import { OptionResult } from 'src/app/models/trade-details/option-result.model';
import { SummaryResult } from 'src/app/models/trade-details/summary-result.model';
import { RiskAnalysisService } from 'src/app/services/risk-analysis.service';
import { RiskAnalysisRequest } from 'src/app/models/trade-details/risk-analysis-request.model';

@Component({
  selector: 'app-risk-analysis',
  templateUrl: './risk-analysis.component.html',
  styleUrls: ['./risk-analysis.component.scss']
})
export class RiskAnalysisComponent implements OnInit {


  stockLowerBand: number = -10;
  stockUpperBand: number = 10;

  stockAdded: boolean;
  performRiskAnalysis: boolean;
  promptPerformRiskAnalysis: boolean;
  displayRiskAnalysis: boolean;
  analyzeRisk: boolean;

  stockDetails: StockDetails;
  stockEntry: StockEntry;
  stockOptions: OptionEntry[] = [];

  riskAnalysisResults: RiskAnalysisRecord[] = [];

  constructor(private utilService: UtilService, private riskAnalysisService: RiskAnalysisService) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {

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


  preventNegatives(e, preventDecimal?: boolean) {
    if (preventDecimal) {
      if (!((e.keyCode > 95 && e.keyCode < 106)
        || (e.keyCode > 47 && e.keyCode < 58)
        || e.keyCode == 8 || e.keyCode == 17 || e.keyCode == 110)) {
        if (e.keyCode != 190) {
          return false;
        } else {
          return true;
        }
      }
    } else {
      if (!((e.keyCode > 95 && e.keyCode < 106)
        || (e.keyCode > 47 && e.keyCode < 58)
        || e.keyCode == 8)) {
        if (e.keyCode != 190) {
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

  createStockEntry() {
    this.stockEntry = new StockEntry();
    this.stockEntry.lowerBound = -10;
    this.stockEntry.upperBound = 10;
    this.stockEntry.riskFreeRate = 63;
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
      }
      this.name += 1;
    }, 100);
  }


}
