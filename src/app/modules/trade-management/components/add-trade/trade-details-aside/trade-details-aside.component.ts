import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MaxRiskDetails } from 'src/app/modules/risk-analysis/models/max-risk-details.model';
import { StockSymbol } from 'src/app/modules/shared/models/trade-management/stock-symbol.model';
import { UserStockSummary } from 'src/app/modules/shared/models/trade-management/user-stock-summary.model';
import { UserStockStatsService } from 'src/app/modules/shared/services/user-stock-stats.service';
import { StockSummaryResult } from '../../../models/stock-summary-result.model';
import { StrategySummaryResult } from '../../../models/strategy-summary-result.model';
import { Subject } from 'rxjs';
import { TradeStrategy } from '../../../models/trade-strategy.model';
import { StrategyType } from 'src/app/modules/shared/models/trade-management/strategy-type.enum';
import { TradeInputData } from 'src/app/modules/shared/models/trade-management/trade-input-data.model';
import { TradeDetailsComponent } from '../Steps/trade-details/trade-details.component';
import { TradeEvaluationResult } from '../../../models/trade-evaluation-result.model';
import { MaxRiskUpdateRequest } from '../../../models/max-risk-update-request.model';
import { TradeStrategyService } from '../../../services/trade-strategy.service';


@Component({
  selector: 'app-trade-details-aside',
  templateUrl: './trade-details-aside.component.html',
  styleUrls: ['./trade-details-aside.component.scss']
})
export class TradeDetailsAsideComponent implements OnInit {

  @Input("inputState") inputState: TradeInputData;
  @Input() selectedStock: StockSymbol;
  @Input() stockSummary: UserStockSummary;
  @Input("tradeStrategy") tradeStrategy: TradeStrategy;
  @Input("strategyTypeChangeSubject") strategyTypeChangeSubject: Subject<number> = new Subject<number>();
  @Input("stockOrOptionAddedSubject") stockOrOptionAddedSubject: Subject<boolean> = new Subject<boolean>();
  @Input("addTrade") addTrade: boolean;
  @Input("editTrade") editTrade: boolean;
  @Input("closeTrade") closeTrade: boolean;
  @Input("viewTrade") viewTrade: boolean;

  @Output('loadMoreStats') loadMoreStats = new EventEmitter();
  @Output('calculateMaxRisk') calculateMaxRisk: EventEmitter<any> = new EventEmitter();
  @Output('reloadTradeDetails') reloadTradeDetails = new EventEmitter();
  @Output('navigateRiskAnalysisEvent') navigateRiskAnalysisEvent = new EventEmitter();

  @Output('tradeDetails') tradeDetails = new EventEmitter();
  tradeStatus: number;
  userDefinedRisk: number;
  showMoreStatistics: boolean = false;
  riskEditing: boolean = false;

  toggleStatistics() {
    this.showMoreStatistics = !this.showMoreStatistics;
  }

  maxRiskDetails: MaxRiskDetails = new MaxRiskDetails();

  stockSummaryResult: StockSummaryResult = new StockSummaryResult();

  strategySummaryResult: StrategySummaryResult = new StrategySummaryResult();

  stockOrOptionAdded: boolean;

  strategyTypeId: number;

  strategyName: string;


  constructor(private userStockStatsService: UserStockStatsService, private tradeStrategyService: TradeStrategyService) { }

  ngOnInit() {
    this.loadSummary();
    if (this.tradeStrategy) {
      this.strategyTypeId = this.tradeStrategy.strategyTypeId;
      this.loadStrategySummary(this.tradeStrategy.id);
      this.stockOrOptionAdded = ((this.tradeStrategy.stockOptions && this.tradeStrategy.stockOptions.length > 0) || (this.tradeStrategy.stockEntry && this.tradeStrategy.stockEntry.length > 0 && this.tradeStrategy.stockEntry[0].quantity > 0));
      this.updateStrategyName(this.strategyTypeId);
    }

    this.strategyTypeChangeSubject.asObservable().subscribe(data => {
      this.strategyTypeId = data;
      this.updateStrategyName(this.strategyTypeId);
      //this.loadStrategyTypeSummary(data);
    });

    this.stockOrOptionAddedSubject.asObservable().subscribe(data => {
      console.log('stock/option added: ', data);
      if (!this.strategySummaryResult && data === true) {
        if (!this.strategyTypeId) {
          this.strategyTypeId = 15;
        }
        this.updateStrategyName(this.strategyTypeId);
        //this.loadStrategyTypeSummary(this.strategyTypeId);
      }
      this.stockOrOptionAdded = data;
    });
  }

  ngAfterViewInit(): void {
    if (this.inputState) {
      this.tradeStatus = this.inputState.tradeStrategy.statusId;
    }
  }
  loadSummary() {
    this.userStockStatsService.getStockMetricsSummaryResult(this.selectedStock.id).subscribe(result => {
      this.stockSummaryResult = result;
    });
  }

  loadStrategySummary(strategyId: number) {
    if (!strategyId) {
      return;
    }
    this.userStockStatsService.getStrategySummaryResult(strategyId).subscribe(result => {
      this.strategySummaryResult = result;
      this.userDefinedRisk = result.maxLoss;
    });
  }

  navigateToRiskAnalysis(): void {
    this.navigateRiskAnalysisEvent.emit();
  }

  getDisplayValue(value, postfix) {
    let finalVal = value;
    if (finalVal && typeof (finalVal) === 'number') {
      let num: number = +finalVal;
      finalVal = Math.round(num);
    }
    if (finalVal) {
      return finalVal + (postfix ? postfix : '');
    }
    return "NA";
  }

  calculateMaxProfitAndRisk() {
    this.calculateMaxRisk.emit();
  }

  updateStrategyName(strategyId: number) {
    console.log('selected strategy:', strategyId);
    Object.keys(StrategyType).forEach((key) => {
      if (StrategyType[key] == strategyId) {
        this.strategyName = key;
      }
    });
  }


  refreshTradeDetails() {
    this.reloadTradeDetails.emit();
  }

  updateTradeEvaluationResult(evalResult: TradeEvaluationResult): void {
    this.strategySummaryResult.maxLoss = evalResult.maxLoss;
    this.strategySummaryResult.maxGain = evalResult.maxGain;
    this.strategySummaryResult.maxStopLoss = evalResult.maxStopLoss;
    this.strategySummaryResult.minStopLoss = evalResult.minStopLoss;
  }

  onMaxRiskEdit() {
    this.riskEditing = true;
  }

  onMaxRiskEditCancel() {
    this.riskEditing = false;
    this.userDefinedRisk = this.strategySummaryResult.maxLoss;
  }

  updateMaxRisk() {
    let riskUpdateRequest: MaxRiskUpdateRequest = new MaxRiskUpdateRequest();
    riskUpdateRequest.strategyId = this.tradeStrategy.id;
    riskUpdateRequest.maxRisk = this.userDefinedRisk ? this.userDefinedRisk : 0;
    this.tradeStrategyService.updateMaxRisk(riskUpdateRequest).subscribe(result => {
      console.log('max risk updated successfully for strategy:', this.tradeStrategy.id);
      this.riskEditing = false;
      this.strategySummaryResult.maxLoss = riskUpdateRequest.maxRisk;
    });
  }

}

// const TradingView = (
//   elementId: 'tradingview-widget-container__widget',
//   symbol: 'FOREXCOM:SPXUSD',
//   // symbol: string,
//   width: string,
//   locale: string,
//   colorTheme: string,
//   referral_id: string,
//   isTransparent: boolean
// ) => {
//   if (document.getElementById(elementId) && document.getElementById(elementId)!.innerHTML === "") {
//       const script = document.createElement('script');
//       script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js'
//       script.async = true;
//       script.innerHTML = JSON.stringify({
//           symbol: symbol,
//           width: width,
//           locale: locale,
//           colorTheme: colorTheme,
//           referral_id: referral_id,
//           isTransparent: isTransparent
//       });
//       document.getElementById(elementId)!.appendChild(script);
//   }
// }

// export { TradingView };
