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
import { OptionResult } from '../../risk-analysis/models/option-result.model';
import { RiskAnalysisRecord } from '../../risk-analysis/models/risk-analysis-record.model';
import { RiskAnalysisRequest } from '../../risk-analysis/models/risk-analysis-request.model';
import { StockResult } from '../../risk-analysis/models/stock-result.model';
import { RiskAnalysisService } from '../../risk-analysis/services/risk-analysis.service';
import { StrategyTemplate } from '../../shared/models/trade-management/strategy-template.model';
import { TradeStrategy } from '../../trade-management/models/trade-strategy.model';
import { ToastrService } from 'ngx-toastr';
import { RiskAnalysisChartComponent } from '../../risk-analysis/components/risk-analysis-chart/risk-analysis-chart.component';
import { MaxRiskDetails } from '../../risk-analysis/models/max-risk-details.model';
// import { UpdateStockPricePopupComponent } from './update-stock-price-popup/update-stock-price-popup.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-strategy-comparison',
  templateUrl: './strategy-comparison.component.html',
  styleUrls: ['./strategy-comparison.component.scss']
})


export class StrategyComparison implements OnInit {
  @Input('matTooltipShowDelay') showDelay: number;
  @Input('matTooltipHideDelay') hideDelay: number;

  @ViewChild('riskAnalysisChart', { static: false }) private riskAnalysisChartComponent: RiskAnalysisChartComponent;

  currentState: number = 1;
  selectedStrategy: number = 15;

  strategiesAdded: boolean;
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
  strategiesList= [];
  stockOptions: OptionEntry[] = [];

  riskAnalysisResults: RiskAnalysisRecord[] = [];
  maxRiskDetails: MaxRiskDetails;

  constructor(private utilService: UtilService,
    private riskAnalysisService: RiskAnalysisService,
    private userStockStatsService: UserStockStatsService,
    private strategyCreateService: StrategyCreateService,
    private toastr: ToastrService,
    private router: Router,
    private _dialog: MatDialog) {
    this.stockEntry = this.createStockEntry();
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
      this.toastr.error('Please enter a valid symbol to proceed', '');
      return false;
    }
    this.currentState++;
  }

  submitStrategies() {
    this.strategiesAdded = true;
    this.performRiskAnalysis = false;
    this.displayRiskAnalysis = false;
    this.stockEntry = this.createStockEntry();
  }

  addStrategy() {
    if (this.strategiesList.length < 5) {
      this.strategiesList.push(this.stockEntry)
    }
  }
  deleteStrategyItem(stockEntry) {
    this.strategiesList.splice(stockEntry, 1);
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


  symbolSelectEventHandler($event: any) {
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




  checkForDecimalValidation(event) {
    event.target.value = parseFloat(event.target.value).toFixed(2);
  }


  enforceMaxLength($event, min, max) {
    let t = $event.target;
    if (t.value < min || t.value > max) {
      return false;
    }
  }




  createStockEntry(): StockEntry {
    let stockEntry: StockEntry = new StockEntry();
    stockEntry.price = this.stockSummary.close;
    stockEntry.lowerBound = -10;
    stockEntry.upperBound = 10;
    stockEntry.riskFreeRate = 6;
    stockEntry.actionType = null;
    return stockEntry;
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
  initRiskAnalysisChart(riskAnalysisRequest: RiskAnalysisRequest) {
    this.riskAnalysisService.getRiskAnalysisChart(riskAnalysisRequest).subscribe(chartResult => {
      this.riskAnalysisChartComponent.loadChart(chartResult);
    });
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

  createRiskAnalysisRequest(): RiskAnalysisRequest {
    let riskAnalysisRequest: RiskAnalysisRequest = new RiskAnalysisRequest();
    riskAnalysisRequest.stockPrice = this.stockEntry;
    riskAnalysisRequest.options = this.stockOptions;
    return riskAnalysisRequest;
  }

}

