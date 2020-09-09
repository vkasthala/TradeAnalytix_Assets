import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import * as $ from 'jquery';
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
  selector: 'app-close-trade-details',
  templateUrl: './close-trade-details.component.html',
  styleUrls: ['./close-trade-details.component.scss']
})
export class CloseTradeDetailsComponent implements OnInit {

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

  stockDetails: StockDetails;
  stockEntry: StockEntry;
  stockOptions: OptionEntry[] = [];

  riskAnalysisResults: RiskAnalysisRecord[] = [];

  @Output('nextStep') nextStep = new EventEmitter();
  @Output('activateRisk') activateRisk = new EventEmitter();

  constructor(private utilService: UtilService) { }

  ngOnInit() {
    this.addStock();
    this.addOption();
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

  enterSymbol() {
    this.currentState++;
  }

  
  next() {
    debugger;
    this.displayRiskAnalysis = true;
    this.nextStep.emit()
  }


}
