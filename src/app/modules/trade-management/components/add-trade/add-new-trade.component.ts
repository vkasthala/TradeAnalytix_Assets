import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatStepper } from '@angular/material';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { RiskAnalysisRequest } from 'src/app/modules/risk-analysis/models/risk-analysis-request.model';
import { RiskAnalysisService } from 'src/app/modules/risk-analysis/services/risk-analysis.service';
import { ConfirmDialogComponent } from 'src/app/modules/shared/components/modals/confirm-dialog/confirm-dialog.component';
import { TradeExecutionDateComponent } from 'src/app/modules/shared/components/modals/trade-execution-date/trade-execution-date.component';
import { ActionType } from 'src/app/modules/shared/models/trade-management/action-type.enum';
import { StockSymbol } from 'src/app/modules/shared/models/trade-management/stock-symbol.model';
import { TradeDirection } from 'src/app/modules/shared/models/trade-management/trade-direction.enum';
import { TradeInputData } from 'src/app/modules/shared/models/trade-management/trade-input-data.model';
import { TradeTag } from 'src/app/modules/shared/models/trade-management/trade-tag.model';
import { UserStockSummary } from 'src/app/modules/shared/models/trade-management/user-stock-summary.model';
import { UserStockStatsService } from 'src/app/modules/shared/services/user-stock-stats.service';
import { OptionLegHistory } from '../../models/option-leg-history.model';
import { RuleEvalResult } from '../../models/rule-eval-result.model';
import { StockLegHistory } from '../../models/stock-leg-history.model';
import { TradeHistory } from '../../models/trade-history.model';
import { TradeStrategy } from '../../models/trade-strategy.model';
import { EntryExitRuleService } from '../../services/entry-exit-rule.service';
import { TradeStrategyService } from '../../services/trade-strategy.service';
import { EntryRulesComponent } from './Steps/entry-rules/entry-rules.component';
import { ExitRulesComponent } from './Steps/exit-rules/exit-rules.component';
import { TradeSearchComponent } from './Steps/search-trade/trade-search.component';
import { TradeDetailsComponent } from './Steps/trade-details/trade-details.component';
import { TradeThesisComponent } from './Steps/trade-thesis/trade-thesis.component';
import { TradeDetailsAsideComponent } from './trade-details-aside/trade-details-aside.component';
import { TradeDetailsBottomComponent } from './trade-details-bottom/trade-details-bottom.component';

@Component({
  selector: 'app-add-new-trade',
  templateUrl: './add-new-trade.component.html',
  styleUrls: ['./add-new-trade.component.scss']
})
export class AddNewTradeComponent implements OnInit {
  maxDate = new Date();
  title = 'toaster-not';

  @ViewChild('tradeSearchComponent', { static: false }) protected tradeSearchComponent: TradeSearchComponent;
  @ViewChild('stepper', { static: false }) protected tradeStepper: MatStepper;
  @ViewChild('tradeMobileStepper', { static: false }) protected tradeMobileStepper: MatStepper;
  @ViewChild('tradeDetailsAside', { static: false }) protected tradeDetailsAsideComponent: TradeDetailsAsideComponent;
  @ViewChild('tradeDetailsBottom', { static: false }) protected tradeDetailsBottomComponent: TradeDetailsBottomComponent;

  @ViewChild('tradeDetails', { static: false }) protected tradeDetails: TradeDetailsComponent;
  @ViewChild('tradeThesis', { static: false }) protected tradeThesis: TradeThesisComponent;
  @ViewChild('entryRules', { static: false }) protected entryRules: EntryRulesComponent;
  @ViewChild('exitRules', { static: false }) protected exitRules: ExitRulesComponent;
  @Input('matTooltipShowDelay') showDelay: number;
  @Input('matTooltipHideDelay') hideDelay: number;
  strategyTypeChangeSubject: Subject<number> = new Subject<number>();
  stockOrOptionAddedSubject: Subject<boolean> = new Subject<boolean>();

  localStockClosedSubject: Subject<StockLegHistory> = new Subject<StockLegHistory>();
  localOptionClosedSubject: Subject<OptionLegHistory> = new Subject<OptionLegHistory>();

  protected add = true;
  protected edit = false;
  protected close = false;
  protected view = false;
  protected Loader = false;

  protected activeStep: boolean;
  protected stockAdded: boolean;
  protected currentState: number = 1;

  protected selectedStock: StockSymbol = new StockSymbol();
  protected stockSummary: UserStockSummary = new UserStockSummary();

  protected tradeStrategy: TradeStrategy = new TradeStrategy();

  protected inputState: TradeInputData;

  protected detailSummaryLoaded: boolean;
  protected closedLegs: boolean = false;
  protected StatsSlide: boolean = false;
  protected updatedDate: any;

  protected tradeHistory: TradeHistory;
  protected localTradeHistory: TradeHistory;
  protected serverTradeHistory: TradeHistory;
  errorMsg: string;
  constructor(
    protected userStockStatsService: UserStockStatsService,
    protected tradeStrategyService: TradeStrategyService,
    protected riskAnalysisService: RiskAnalysisService,
    protected entryExitRuleService: EntryExitRuleService,
    protected router: Router,
    protected toastr: ToastrService,
    protected _dialog: MatDialog) {
    this.initState();
    this.localStockClosedSubject.asObservable().subscribe(data => {
      this.updateLocalTradeHistory(data, null);
    });

    this.localOptionClosedSubject.asObservable().subscribe(data => {
      this.updateLocalTradeHistory(null, data);
    });
  }

  ngOnInit() {
    this.setState();
  }

  enterSymbol() {
    if (!this.selectedStock || !this.selectedStock.code) {
      this.toastr.error('Please enter a valid symbol to proceed', '', { 
        tapToDismiss:false,
        closeButton:true,
        disableTimeOut: true
      });
      return false;
    }

    this.currentState++;
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

  calculateMaxRisk($event: any) {
    console.log('calculate max risk:', $event);
    let riskAnalysisRequest: RiskAnalysisRequest = this.createRiskAnalysisRequest();

    console.log('max risk request:', JSON.stringify(riskAnalysisRequest));

    this.riskAnalysisService.getMaxRiskDetails(riskAnalysisRequest).subscribe(result => {
      console.log("max details success:", result)
      this.tradeDetailsAsideComponent.maxRiskDetails = result;
      this.tradeDetailsBottomComponent.maxRiskDetails = result;
    },
      errResponse => {
        console.log("max details error:", errResponse);
      });
  }

  calcNetDebit($event: string): string {
    return this.tradeDetailsBottomComponent.netDebit = $event;
  }

  calcNetReturn($event: string): string {
    return this.tradeDetailsBottomComponent.netReturn = $event;
  }

  createRiskAnalysisRequest(): RiskAnalysisRequest {
    let riskAnalysisRequest: RiskAnalysisRequest = new RiskAnalysisRequest();
    riskAnalysisRequest.stockPrice = this.tradeDetails.stockEntry;
    riskAnalysisRequest.options = this.tradeDetails.stockOptions;
    return riskAnalysisRequest;
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


  addTrade() {
    this.Loader = !this.Loader;
    this.updateTradeStrategyProps();
    console.log('add trade...', this.tradeStrategy);
    this.tradeStrategyService.addTrade(this.tradeStrategy).subscribe(result => {
      console.log('Trade strategy successfully created');
      this.toastr.success('Trade strategy created', '', 
      { 
        tapToDismiss:false,
        closeButton:true,
        disableTimeOut: true
      });
      this.router.navigateByUrl("/trade-strategies");
      this.Loader = !this.Loader;
    },
      err => {
        this.toastr.error('Internal Server Error', '', { 
          tapToDismiss:false,
          closeButton:true,
          disableTimeOut: true
        });
        this.Loader = !this.Loader;
      })
  }

  editTradeStrategy() {
    this.Loader = !this.Loader;
    this.updateTradeStrategyProps();
    this.tradeStrategyService.editTrade(this.tradeStrategy).subscribe(result => {
      this.toastr.success('Trade strategy updated', '', 
      { 
        tapToDismiss:false,
        closeButton:true,
        disableTimeOut: true
      });
      this.router.navigateByUrl("/trade-strategies");
      this.Loader = !this.Loader;
    },
      err => {
        this.toastr.error('Internal Server Error', '', { 
          tapToDismiss:false,
          closeButton:true,
          disableTimeOut: true
        });
        this.Loader = !this.Loader;
      })

  }

  closeTradeStrategy() {
    this.updateTradeStrategyProps();
    this.tradeStrategyService.closeTrade(this.tradeStrategy).subscribe(result => {
      this.toastr.success('Trade strategy closed', '', 
      { 
        tapToDismiss:false,
        closeButton:true,
        disableTimeOut: true
      });
      this.router.navigateByUrl("/trade-strategies");
      this.Loader = !this.Loader;
    },
      err => {
        this.toastr.error('Internal Server Error', '', 
        { 
          tapToDismiss:false,
          closeButton:true,
          disableTimeOut: true
        });
        this.Loader = !this.Loader;
      })
  }

  cancelTrade() {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      width: 'auto',
      height: 'auto',
      data: { 'message': 'Are you sure you want to cancel the changes?' }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        this.router.navigateByUrl("/trade-strategies");
      }
    });
  }

  updateTradeStrategyProps() {
    this.tradeStrategy.stockId = this.selectedStock.id;
    this.tradeStrategy.strategyTypeId = this.tradeDetails.selectedStrategy;
    let tradeThesisArray = [];
    tradeThesisArray.push(this.tradeThesis.tradeThesis);
    this.tradeStrategy.tradeThesis = tradeThesisArray;
    if (this.tradeDetails.tags) {
      this.tradeStrategy.tradeTag = this.tradeDetails.tags;
    }

    let stockEntries = [];
    if (this.tradeDetails.stockEntry) {
      stockEntries.push(this.tradeDetails.stockEntry);
    }
    this.tradeStrategy.stockEntry = stockEntries;
    this.tradeStrategy.stockOptions = this.tradeDetails.stockOptions;
    this.tradeStrategy.direction = this.getDirection();
    this.tradeStrategy.rules = this.entryRules.entryRules;

    if (this.close) {
      if (this.tradeStrategy.rules && this.exitRules.exitRules) {
        this.tradeStrategy.rules = this.tradeStrategy.rules.concat(this.exitRules.exitRules);
      }
      this.tradeStrategy.closeDate = this.tradeDetailsBottomComponent.closeDate;
    }
    if (!this.add) {
      this.tradeStrategy.executed = this.tradeDetails.executedDate != null && this.tradeDetails.executedDate != undefined && this.tradeDetails.executedDate != '';
      this.tradeStrategy.executedDate = this.tradeDetails.executedDate;
    }
  }

  getDirection() {
    let dir: TradeDirection = this.tradeDetails.direction;
    if (this.tradeDetails.selectedStrategy == 1) {
      if (this.tradeDetails.stockEntry.actionType == ActionType["Buy to Open"]) {
        dir = TradeDirection.Long;
      } else if (this.tradeDetails.stockEntry.actionType == ActionType["Sell to Open"]) {
        dir = TradeDirection.Short;
      }
    }
    return dir;
  }

  goBack(moveTwoSteps?, mobileView?) {
    let stepper = mobileView ? this.tradeMobileStepper : this.tradeStepper;
    if (stepper && !moveTwoSteps) {
      stepper.previous();
    } else if (stepper && moveTwoSteps) {
      stepper.previous(); stepper.previous();
      stepper.selectedIndex = 0;
    }
  }

  goForward(moveTwoSteps?, mobileView?) {
    let stepper = mobileView ? this.tradeMobileStepper : this.tradeStepper;
    if (stepper && !moveTwoSteps) {
      stepper.next();
    } else if (stepper && moveTwoSteps) {
      stepper.next(); stepper.next();
    }
  }

  initState(): void {
    if (!this.router.getCurrentNavigation()) {
      return;
    }
    let extras: NavigationExtras = this.router.getCurrentNavigation().extras;
    if (extras && extras.state) {
      this.currentState++;
      let state: TradeInputData = <TradeInputData>extras.state;
      if (state && state.selectedStock && state.stockSummary) {
        this.inputState = state;
      }
    }
  }

  public setState() {
    if (this.inputState) {
      this.selectedStock = this.inputState.selectedStock;
      this.stockSummary = this.inputState.stockSummary;
      this.tradeStrategy = this.inputState.tradeStrategy;
      this.updatedDate = this.inputState.tradeStrategy.updateDateTime;
    }
  }

  navigaeToRiskAnalysis() {
    let extras: NavigationExtras = {};
    this.updateTradeStrategyProps();
    this.tradeStrategy.isEditTrade = this.edit;
    let inputData: TradeInputData = new TradeInputData();
    inputData.selectedStock = this.selectedStock;
    inputData.tradeStrategy = this.tradeStrategy;
    inputData.stockSummary = this.stockSummary;
    extras.state = inputData;
    this.router.navigate(['/risk-analysis'], extras);
  }

  CheckExecutionDate(failedRules: RuleEvalResult[]) {
    let dialogData = {
      title: 'Confirm Trade Execution Date',
      executed: this.tradeStrategy.executed + '',
      executionDate: this.tradeStrategy.executedDate,
      failedRules: failedRules
    };
    const dialogRef = this._dialog.open(TradeExecutionDateComponent, {
      disableClose: true,
      width: 'auto',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe((res) => {
      console.log('here...', res);
      this.tradeStrategy.executed = res.executed;
      this.tradeStrategy.executedDate = res.executionDate;
      if (!this.add) {
        this.tradeDetails.executedDate = res.executionDate;
        this.editTradeStrategy();
      } else {
        this.addTrade();
      }
    });
  }

  editTrade() {
    if (this.tradeStrategy.statusId == 4) {
      this.evaluateStrategyRules();
    } else {
      const dialogRef = this._dialog.open(ConfirmDialogComponent, {
        width: 'auto',
        height: 'auto',
        data: { 'message': 'Are you sure you want to edit this strategy?' }
      });
      dialogRef.afterClosed().subscribe(dialogResult => {
        if (dialogResult == true) {
          this.editTradeStrategy();
        }
      });
    }
  }

  closeTrade() {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      data: { 'message': 'Are you sure you want to close this strategy?' }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        this.Loader = !this.Loader;
        this.closeTradeStrategy();
      }
    });
  }

  evalGridRules(event: any) {
    this.updateTradeStrategyProps();
    this.entryExitRuleService.evalTradeRules(this.tradeStrategy).subscribe(result => {
      this.entryRules.updateEntryRules(result);
    })
  }

  saveTradeAsDraft() {
    this.tradeStrategy.executed = false;
    this.tradeStrategy.executedDate = undefined;
    this.addTrade();
  }

  showSuccess() {
    this.toastr.error('Hello world!', 'Toastr fun!',
    { 
      tapToDismiss:false,
      closeButton:true,
      disableTimeOut: true
    });
  }

  showClosedLegs() {
    this.closedLegs = !this.closedLegs;
    if (this.closedLegs && !this.tradeHistory) {
      this.tradeStrategyService.getTradeClosedHistory(this.tradeStrategy.id).subscribe(history => {
        this.serverTradeHistory = history;
        this.mergeLocalAndServerTradeHistories(this.localTradeHistory, history);
      });
    }
  }

  updateLocalTradeHistory(stockLegHistory: StockLegHistory, optionLegHistory: OptionLegHistory) {
    if (!this.localTradeHistory) {
      this.localTradeHistory = new TradeHistory();
      this.localTradeHistory.stockLegHistories = [];
      this.localTradeHistory.optionLegHistories = [];
    }
    if (stockLegHistory) {
      this.localTradeHistory.stockLegHistories.push(stockLegHistory);
    }
    if (optionLegHistory) {
      this.localTradeHistory.optionLegHistories.push(optionLegHistory);
    }
    console.log('local close history:', this.localTradeHistory);
    this.mergeLocalAndServerTradeHistories(this.localTradeHistory, this.serverTradeHistory);
  }

  mergeLocalAndServerTradeHistories(localHistory: TradeHistory, serverHistory: TradeHistory) {
    let stockLegHistories = [];
    let optionLegHistories = [];
    if (localHistory) {
      if (localHistory.stockLegHistories && localHistory.stockLegHistories.length) {
        stockLegHistories = stockLegHistories.concat(localHistory.stockLegHistories);
      }
      if (localHistory.optionLegHistories && localHistory.optionLegHistories.length) {
        optionLegHistories = optionLegHistories.concat(localHistory.optionLegHistories);
      }
    }

    if (serverHistory) {
      if (serverHistory.stockLegHistories && serverHistory.stockLegHistories.length) {
        stockLegHistories = stockLegHistories.concat(serverHistory.stockLegHistories);
      }
      if (serverHistory.optionLegHistories && serverHistory.optionLegHistories.length) {
        optionLegHistories = optionLegHistories.concat(serverHistory.optionLegHistories);
      }
    }
    if (!this.tradeHistory) {
      this.tradeHistory = new TradeHistory();
    }
    this.tradeHistory.stockLegHistories = stockLegHistories;
    this.tradeHistory.optionLegHistories = optionLegHistories;
    console.log('total close history:', this.tradeHistory);
    if (this.view) {
      this.calculateClosedValuesReturn();
    }
  }

  calculateClosedValuesReturn(): string {
    let netReturn: number = 0;
    let tmp: number;
    if (this.tradeHistory && this.tradeHistory.stockLegHistories) {
      for (let index = 0; index < this.tradeHistory.stockLegHistories.length; index++) {
        tmp = this.tradeHistory.stockLegHistories[index].quantity * ((this.tradeHistory.stockLegHistories[index].exitPrice ? this.tradeHistory.stockLegHistories[index].exitPrice : 0) - (this.tradeHistory.stockLegHistories[index].entryPrice ? this.tradeHistory.stockLegHistories[index].entryPrice : 0));
        // netReturn = tmp * (this.tradeHistory.stockLegHistories[index].actionType == ActionType["Buy to Open"] ? 1 : -1);
        netReturn = netReturn + tmp;
      }
    }
    if (this.tradeHistory && this.tradeHistory.optionLegHistories) {
      for (let index = 0; index < this.tradeHistory.optionLegHistories.length; index++) {
        tmp = this.tradeHistory.optionLegHistories[index].contracts * ((this.tradeHistory.optionLegHistories[index].exitPrice ? this.tradeHistory.optionLegHistories[index].exitPrice : 0) - (this.tradeHistory.optionLegHistories[index].entryPrice ? this.tradeHistory.optionLegHistories[index].entryPrice : 0));
        /// netReturn = tmp * (this.tradeHistory.optionLegHistories[index].actionType == ActionType["Buy to Open"] ? 100 : -100);
        netReturn = netReturn + (tmp * 100);
      }
    }
    let returnAmt: string = netReturn.toFixed(2);
    this.tradeDetailsBottomComponent.netReturn = returnAmt;
    return returnAmt;
  }

  evaluateStrategyRules() {
    this.Loader = !this.Loader;
    this.updateTradeStrategyProps();
    this.tradeStrategyService.evaluateStrategyRules(this.tradeStrategy).subscribe(result => {
      this.Loader = !this.Loader;
      this.CheckExecutionDate(result);
    }, (err) => {
      console.error("Error while evaluating strategy rules for strategy: {}", this.tradeStrategy, err);
      this.Loader = !this.Loader;
    });
  }

  protected isValidTradeStrategy(): boolean {
    if (!this.tradeDetails) {
      return false;
    }
    let status: boolean = this.tradeDetails.isValidTradeStrategy();
    if (this.close) {
      status = status && this.tradeDetailsBottomComponent.closeDate !== undefined;
    }
    return status;
  }

  ShowStats() {
    this.StatsSlide = !this.StatsSlide;
  }

}
