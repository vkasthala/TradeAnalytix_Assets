import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MaxRiskDetails } from 'src/app/modules/risk-analysis/models/max-risk-details.model';
import { UserStockStatsService } from 'src/app/modules/shared/services/user-stock-stats.service';
import { StockSummaryResult } from '../../../models/stock-summary-result.model';
import { StrategySummaryResult } from '../../../models/strategy-summary-result.model';
import { TradeStrategy } from '../../../models/trade-strategy.model';

import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AddToPositionComponent } from 'src/app/modules/shared/components/modals/add-to-position/add-to-position.component';
import { AddToStockPositionComponent } from 'src/app/modules/shared/components/modals/add-to-stock-position/add-to-stock-position.component';
import { ReduceToPositionComponent } from 'src/app/modules/shared/components/modals/reduce-to-position/reduce-to-position.component';
import { ReduceToStockPositionComponent } from 'src/app/modules/shared/components/modals/reduce-to-stock-position/reduce-to-stock-position.component';
import { ActionType } from 'src/app/modules/shared/models/trade-management/action-type.enum';
import { OptionEntry } from 'src/app/modules/shared/models/trade-management/option-entry.model';
import { OptionType } from 'src/app/modules/shared/models/trade-management/option-type.enum';
import { PartialLegChange } from 'src/app/modules/shared/models/trade-management/partial-leg-change.model';
import { StockEntry } from 'src/app/modules/shared/models/trade-management/stock-entry.model';
import { StockSymbol } from 'src/app/modules/shared/models/trade-management/stock-symbol.model';
import { StrategyTemplate } from 'src/app/modules/shared/models/trade-management/strategy-template.model';
import { StrategyType } from 'src/app/modules/shared/models/trade-management/strategy-type.enum';
import { TradeDirection } from 'src/app/modules/shared/models/trade-management/trade-direction.enum';
import { TradeInputData } from 'src/app/modules/shared/models/trade-management/trade-input-data.model';
import { UserStockSummary } from 'src/app/modules/shared/models/trade-management/user-stock-summary.model';
import { StrategyCreateService } from 'src/app/modules/shared/services/strategy-create.service';
import { UtilService } from 'src/app/modules/utilities/services/util.service';
import { Subject } from 'rxjs';
import { StockLegHistory } from 'src/app/modules/trade-management/models/stock-leg-history.model';
import { OptionLegHistory } from 'src/app/modules/trade-management/models/option-leg-history.model';

@Component({
  selector: 'app-trade-details-bottom',
  templateUrl: './trade-details-bottom.component.html',
  styleUrls: ['./trade-details-bottom.component.scss']
})
export class TradeDetailsBottomComponent implements OnInit {

  step = 0;
  maxDate = new Date();
  setStep(index: number) {
    this.step = index;
  }

  currentState: number = 1;
  stockAdded: boolean;
  stockEntry: StockEntry;
  stockOptions: OptionEntry[] = [];
  strategies = StrategyType;
  strategyTypes: String[] = this.strategyCreateServiceService.getStrategies();

  @Output('nextStep') nextStep = new EventEmitter();
  @Output('activateRisk') activateRisk = new EventEmitter();
  @Output('addTradeEvent') addTradeEvent = new EventEmitter();
  @Output('navigateRiskAnalysisEvent') navigateRiskAnalysisEvent = new EventEmitter();

  @Input('stockSummary') stockSummary: UserStockSummary;
  @Input("selectedStock") selectedStock: StockSymbol;
  @Input("inputState") inputState: TradeInputData;
  @Input("addTrade") addTrade: boolean;
  @Input("editTrade") editTrade: boolean;
  @Input("closeTrade") closeTrade: boolean;
  @Input("viewTrade") viewTrade: boolean;
  @Input("strategyTypeChangeSubject") strategyTypeChangeSubject: Subject<number> = new Subject<number>();
  @Input("stockOrOptionAddedSubject") stockOrOptionAddedSubject: Subject<boolean> = new Subject<boolean>();
  @Input("localStockClosedSubject") localStockClosedSubject: Subject<StockLegHistory> = new Subject<StockLegHistory>();
  @Input("localOptionClosedSubject") localOptionClosedSubject: Subject<OptionLegHistory> = new Subject<OptionLegHistory>();

  @Input("tradeStrategy") tradeStrategy: TradeStrategy;

  @Output('loadMoreStats') loadMoreStats = new EventEmitter();
  @Output('calculateMaxRisk') calculateMaxRisk: EventEmitter<any> = new EventEmitter();

  maxRiskDetails: MaxRiskDetails;

  stockSummaryResult: StockSummaryResult;

  strategyTypeSummaryResult: StrategySummaryResult;

  stockOrOptionAdded: boolean;

  strategyTypeId: number;

  strategyName: string;

  selectedStrategy: number = 15;
  direction: TradeDirection = TradeDirection.Custom;
  executedDate: string;
  closeDate: string;
  tradeStatus: number;

  netDebit: string;
  netReturn: string;

  constructor(
    private userStockStatsService: UserStockStatsService,
    private utilService: UtilService,
    private strategyCreateServiceService: StrategyCreateService,
    private router: Router,
    private _dialog: MatDialog
  ) { }

  ngOnInit() {
    // this.loadSummary();
    // if (this.tradeStrategy) {
    //   this.strategyTypeId = this.tradeStrategy.strategyTypeId;
    //   this.loadStrategyTypeSummary(this.tradeStrategy.strategyTypeId);
    //   this.stockOrOptionAdded = ((this.tradeStrategy.stockOptions && this.tradeStrategy.stockOptions.length > 0) || (this.tradeStrategy.stockEntry && this.tradeStrategy.stockEntry.length > 0 && this.tradeStrategy.stockEntry[0].quantity > 0));
    //   this.updateStrategyName(this.strategyTypeId);
    // }

    // this.strategyTypeChangeSubject.asObservable().subscribe(data => {
    //   this.strategyTypeId = data;
    //   this.updateStrategyName(this.strategyTypeId);
    //   this.loadStrategyTypeSummary(data);
    // });

    // this.stockOrOptionAddedSubject.asObservable().subscribe(data => {
    //   console.log('stock/option added: ', data);
    //   if (!this.strategyTypeSummaryResult &&  data === true) {
    //     if(!this.strategyTypeId){
    //       this.strategyTypeId = 15;
    //     }
    //     this.updateStrategyName(this.strategyTypeId);
    //     this.loadStrategyTypeSummary(this.strategyTypeId);
    //   }
    //   this.stockOrOptionAdded = data;
    // });
  }

  ngAfterViewInit(): void {
    if (this.inputState) {
      this.tradeStatus = this.inputState.tradeStrategy.statusId;
      this.stockOptions = this.inputState.tradeStrategy.stockOptions;
      this.selectedStrategy = this.inputState.tradeStrategy.strategyTypeId;
      this.stockEntry = this.inputState.tradeStrategy.stockEntry && this.inputState.tradeStrategy.stockEntry.length > 0 ? this.inputState.tradeStrategy.stockEntry[0] : undefined;
      this.stockAdded = this.inputState.tradeStrategy.stockEntry && this.inputState.tradeStrategy.stockEntry.length > 0 && this.inputState.tradeStrategy.stockEntry[0].actionType && this.inputState.tradeStrategy.stockEntry[0].quantity > 0;
      this.direction = this.inputState.tradeStrategy.direction;
      this.executedDate = this.inputState.tradeStrategy.executedDate;
      this.closeDate = this.inputState.tradeStrategy.closeDate;

      this.updateStockOptionDisplayProperty();
    }
  }

  updateStockOptionDisplayProperty() {
    if (!this.stockOptions) {
      return;
    }
    console.log('update stock options: ', this.stockOptions);
    for (let ind = 0; ind < this.stockOptions.length; ind++) {
      if (this.stockOptions[ind].contracts === 0) {
        console.log('this ind: ', ind);
        this.stockOptions[ind].display = false;
      }
    }
  }

  ngAfterContentInit() {
    console.log('here1..')
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

  getTotalAmount(): string {
    return this.closeTrade ? this.netReturn : this.netDebit;
  }

}
