import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MaxRiskDetails } from 'src/app/modules/risk-analysis/models/max-risk-details.model';
import { StockSymbol } from 'src/app/modules/shared/models/trade-management/stock-symbol.model';
import { UserStockSummary } from 'src/app/modules/shared/models/trade-management/user-stock-summary.model';
import { UserStockStatsService } from 'src/app/modules/shared/services/user-stock-stats.service';
import { StockSummaryResult } from '../../../models/stock-summary-result.model';
import { StrategySummaryResult } from '../../../models/strategy-summary-result.model';
import { Subject } from 'rxjs';
import { TradeStrategy } from '../../../models/trade-strategy.model';
import { StrategyType } from 'src/app/modules/shared/models/trade-management/strategy-type.enum';

@Component({
  selector: 'app-trade-details-aside',
  templateUrl: './trade-details-aside.component.html',
  styleUrls: ['./trade-details-aside.component.scss']
})
export class TradeDetailsAsideComponent implements OnInit {

  @Input() selectedStock: StockSymbol;
  @Input() stockSummary: UserStockSummary;
  @Input("tradeStrategy") tradeStrategy: TradeStrategy;
  @Input("strategyTypeChangeSubject") strategyTypeChangeSubject: Subject<number> = new Subject<number>();
  @Input("stockOrOptionAddedSubject") stockOrOptionAddedSubject: Subject<boolean> = new Subject<boolean>();

  @Output('loadMoreStats') loadMoreStats = new EventEmitter();
  @Output('calculateMaxRisk') calculateMaxRisk: EventEmitter<any> = new EventEmitter();

  maxRiskDetails: MaxRiskDetails;

  stockSummaryResult: StockSummaryResult;

  strategyTypeSummaryResult: StrategySummaryResult;

  stockOrOptionAdded: boolean;

  strategyTypeId: number;

  strategyName: string;

  constructor(private userStockStatsService: UserStockStatsService) { }

  ngOnInit() {
    this.loadSummary();
    if (this.tradeStrategy) {
      this.strategyTypeId = this.tradeStrategy.strategyTypeId;
      this.loadStrategyTypeSummary(this.tradeStrategy.strategyTypeId);
      this.stockOrOptionAdded = ((this.tradeStrategy.stockOptions && this.tradeStrategy.stockOptions.length > 0) || (this.tradeStrategy.stockEntry && this.tradeStrategy.stockEntry.length > 0 && this.tradeStrategy.stockEntry[0].quantity > 0));
      this.updateStrategyName(this.strategyTypeId);
    }

    this.strategyTypeChangeSubject.asObservable().subscribe(data => {
      this.strategyTypeId = data;
      this.updateStrategyName(this.strategyTypeId);
      this.loadStrategyTypeSummary(data);
    });

    this.stockOrOptionAddedSubject.asObservable().subscribe(data => {
      console.log('stock/option added: ', data);
      if (!this.strategyTypeSummaryResult &&  data === true) {
        if(!this.strategyTypeId){
          this.strategyTypeId = 15;
        }
        this.updateStrategyName(this.strategyTypeId);
        this.loadStrategyTypeSummary(this.strategyTypeId);
      }
      this.stockOrOptionAdded = data;
    });
  }

  loadSummary() {
    this.userStockStatsService.getStockMetricsSummaryResult(this.selectedStock.id).subscribe(result => {
      this.stockSummaryResult = result;
    });
  }

  loadStrategyTypeSummary(strategyId: number) {
    this.userStockStatsService.getStrategyTypeSummaryResult(strategyId).subscribe(result => {
      this.strategyTypeSummaryResult = result;
    });
  }

  getDisplayValue(value, postfix) {
    if (value) {
      return value + (postfix ? postfix : '');
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

}
