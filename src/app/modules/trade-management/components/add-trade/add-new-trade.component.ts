import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatStepper } from '@angular/material';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { MaxRiskDetails } from 'src/app/modules/risk-analysis/models/max-risk-details.model';
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
import { DemoModeDetailsService } from 'src/app/modules/shared/services/demo-mode-details.service';
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
  @ViewChild('mobileTradeDetailsBottom', { static: false }) protected mobileTradeDetailsBottomComponent: TradeDetailsBottomComponent;

  @ViewChild('tradeDetails', { static: false }) protected tradeDetails: TradeDetailsComponent;
  @ViewChild('tradeThesis', { static: false }) protected tradeThesis: TradeThesisComponent;
  @ViewChild('entryRules', { static: false }) protected entryRules: EntryRulesComponent;
  @ViewChild('exitRules', { static: false }) protected exitRules: ExitRulesComponent;
  @ViewChild('mobileTradeDetails', { static: false }) protected mobileTradeDetails: TradeDetailsComponent;
  @ViewChild('mobileTradeThesis', { static: false }) protected mobileTradeThesis: TradeThesisComponent;
  @ViewChild('mobileEntryRules', { static: false }) protected mobilEntryRules: EntryRulesComponent;
  @ViewChild('mobileExitRules', { static: false }) protected mobileExitRules: ExitRulesComponent;
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
  isDemoMode: boolean = false;

  constructor(
    protected userStockStatsService: UserStockStatsService,
    protected tradeStrategyService: TradeStrategyService,
    protected riskAnalysisService: RiskAnalysisService,
    protected entryExitRuleService: EntryExitRuleService,
    protected router: Router,
    protected toastr: ToastrService,
    protected _dialog: MatDialog,
    private demoService: DemoModeDetailsService
  ) {
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
      this.toastr.error('Please enter a valid symbol to proceed', 'Error', {
        tapToDismiss: false,
        closeButton: true,
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

  calculateMaxRisk($event: any, source: string) {
    console.log('calculate max risk:', $event);
    let riskAnalysisRequest: RiskAnalysisRequest = this.createRiskAnalysisRequest(source);

    console.log('max risk request:', JSON.stringify(riskAnalysisRequest));

    this.riskAnalysisService.getMaxRiskDetails(riskAnalysisRequest).subscribe(result => {
      console.log("max details success:", result)
      this.setMaxRiskDetails(result, source);
    },
      errResponse => {
        console.log("max details error:", errResponse);
      });
  }

  setMaxRiskDetails(maxRiskDetails: MaxRiskDetails, source: string) {
    this.tradeDetailsAsideComponent.maxRiskDetails = maxRiskDetails;
    this.mobileTradeDetailsBottomComponent.maxRiskDetails = maxRiskDetails;
    this.tradeDetailsAsideComponent.maxRiskDetails = maxRiskDetails;
  }

  calcNetDebit($event: string): string {
    this.mobileTradeDetailsBottomComponent.netDebit = $event;
    return this.tradeDetailsBottomComponent.netDebit = $event;
  }

  calcNetReturn($event: string): string {
    this.mobileTradeDetailsBottomComponent.netReturn = $event;
    return this.tradeDetailsBottomComponent.netReturn = $event;
  }

  createRiskAnalysisRequest(source: string): RiskAnalysisRequest {
    let riskAnalysisRequest: RiskAnalysisRequest = new RiskAnalysisRequest();
    const tradeDetailsComp: TradeDetailsComponent = this.getTradeDetails(source);
    riskAnalysisRequest.stockPrice = tradeDetailsComp.stockEntry;
    riskAnalysisRequest.options = tradeDetailsComp.stockOptions;
    riskAnalysisRequest.module = 'ADD_TRADE';
    riskAnalysisRequest.stockId = this.selectedStock.id;
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


  addTrade(source: string) {
    this.Loader = !this.Loader;
    this.updateTradeStrategyProps(source);
    this.tradeStrategyService.addTrade(this.tradeStrategy).subscribe(result => {
      this.toastr.success('Trade strategy has been added.', 'Success');
      this.router.navigateByUrl("/trade-strategies");
      this.Loader = !this.Loader;
    },
      err => {
        this.toastr.error('Internal Server Error', 'Error', {
          tapToDismiss: false,
          closeButton: true,
          disableTimeOut: true
        });
        this.Loader = !this.Loader;
      })
  }

  editTradeStrategy(source: string) {
    this.Loader = !this.Loader;
    this.updateTradeStrategyProps(source);
    this.tradeStrategyService.editTrade(this.tradeStrategy).subscribe(result => {
      this.toastr.success('Trade strategy has been updated.', 'Success');
      this.router.navigateByUrl("/trade-strategies");
      this.Loader = !this.Loader;
    },
      err => {
        this.toastr.error('Internal Server Error', 'Error', {
          tapToDismiss: false,
          closeButton: true,
          disableTimeOut: true
        });
        this.Loader = !this.Loader;
      })
  }

  updateClosedTrade(source: string) {
    this.Loader = !this.Loader;
    this.updateTradeStrategyProps(source);
    this.tradeStrategyService.updateClosedTrade(this.tradeStrategy).subscribe(result => {
      this.toastr.success('Trade strategy has been updated.', 'Success');
      this.router.navigateByUrl("/trade-strategies");
      this.Loader = !this.Loader;
    },
      err => {
        this.toastr.error('Internal Server Error', 'Error', {
          tapToDismiss: false,
          closeButton: true,
          disableTimeOut: true
        });
        this.Loader = !this.Loader;
      })
  }

  closeTradeStrategy(source: string) {
    this.updateTradeStrategyProps(source);
    if (new Date(this.tradeStrategy.closeDate) < new Date(this.tradeStrategy.executedDate)) {
      this.toastr.error('Invalid close date', 'Error', {
        tapToDismiss: false,
        closeButton: true,
        disableTimeOut: true
      });
      this.Loader = !this.Loader;
      return;
    }
    this.tradeStrategyService.closeTrade(this.tradeStrategy).subscribe(result => {
      this.toastr.success('Trade strategy closed', 'Success');
      this.router.navigateByUrl("/trade-strategies");
      this.Loader = !this.Loader;
    },
      err => {
        this.toastr.error('Internal Server Error', 'Error',
          {
            tapToDismiss: false,
            closeButton: true,
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

  updateTradeStrategyProps(source: string) {
    const tradeDetailsComp: TradeDetailsComponent = this.getTradeDetails(source);
    const tradeThesisComp: TradeThesisComponent = this.getTradeThesis(source);
    const entryRulesComp: EntryRulesComponent = this.getTradeEntryRules(source);
    const exitRulesComp: ExitRulesComponent = this.getTradeExitRules(source);
    this.tradeStrategy.stockId = this.selectedStock.id;
    this.tradeStrategy.strategyTypeId = tradeDetailsComp.selectedStrategy;
    let tradeThesisArray = [];
    tradeThesisArray.push(tradeThesisComp.tradeThesis);
    this.tradeStrategy.tradeThesis = tradeThesisArray;
    if (tradeDetailsComp.tags) {
      this.tradeStrategy.tradeTag = tradeDetailsComp.tags;
    }

    let stockEntries = [];
    if (tradeDetailsComp.stockEntry) {
      if ((!tradeDetailsComp.stockEntry.quantity || tradeDetailsComp.stockEntry.quantity === 0) && !tradeDetailsComp.stockEntry.actionType) {
        // In case of no stock leg considering action type as Buy to Open
        tradeDetailsComp.stockEntry.actionType = ActionType['Buy to Open'];
      }
      stockEntries.push(tradeDetailsComp.stockEntry);
    }
    this.tradeStrategy.stockEntry = stockEntries;
    this.tradeStrategy.stockOptions = tradeDetailsComp.stockOptions;
    this.tradeStrategy.direction = tradeThesisComp.tradeThesis.direction;
    this.tradeStrategy.rules = entryRulesComp.entryRules;
    if (this.tradeStrategy.rules && exitRulesComp.exitRules) {
      this.tradeStrategy.rules = this.tradeStrategy.rules.concat(exitRulesComp.exitRules);
    }
    if (this.close) {
      this.tradeStrategy.closeDate = this.tradeDetailsBottomComponent.closeDate;
    }
    if (!this.add) {
      this.tradeStrategy.executed = tradeDetailsComp.executedDate != null && tradeDetailsComp.executedDate != undefined && tradeDetailsComp.executedDate != '';
      this.tradeStrategy.executedDate = tradeDetailsComp.executedDate;
    }
    this.tradeStrategy.tradeChubFiles = tradeThesisComp.tradeChubFiles;
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
    this.isDemoMode = this.demoService.demoMode;
    if (this.inputState) {
      this.selectedStock = this.inputState.selectedStock;
      this.stockSummary = this.inputState.stockSummary;
      this.tradeStrategy = this.inputState.tradeStrategy;
      this.updatedDate = this.inputState.tradeStrategy.updateDateTime;
    }
  }

  navigaeToRiskAnalysis(source: string) {
    let extras: NavigationExtras = {};
    this.updateTradeStrategyProps(source);
    this.tradeStrategy.isEditTrade = this.edit;
    let inputData: TradeInputData = new TradeInputData();
    inputData.selectedStock = this.selectedStock;
    inputData.tradeStrategy = this.tradeStrategy;
    inputData.stockSummary = this.stockSummary;
    extras.state = inputData;
    this.router.navigate(['/risk-analysis'], extras);
  }

  CheckExecutionDate(failedRules: RuleEvalResult[], source: string) {
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
        this.getTradeDetails(source).executedDate = res.executionDate;
        this.editTradeStrategy(source);
      } else {
        this.addTrade(source);
      }
    });
  }

  editTrade(source: string) {
    if (this.tradeStrategy.statusId == 4) {
      this.evaluateStrategyRules(source);
    } else {
      const dialogRef = this._dialog.open(ConfirmDialogComponent, {
        width: 'auto',
        height: 'auto',
        data: { 'message': 'Are you sure you want to edit this strategy?' }
      });
      dialogRef.afterClosed().subscribe(dialogResult => {
        if (dialogResult == true) {
          this.editTradeStrategy(source);
        }
      });
    }
  }

  closeTrade(source: string) {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      data: { 'message': 'Are you sure you want to close this strategy?' }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        this.Loader = !this.Loader;
        this.closeTradeStrategy(source);
      }
    });
  }

  evalGridRules(event: any, source: string) {
    this.updateTradeStrategyProps(source);
    this.entryExitRuleService.evalTradeRules(this.tradeStrategy).subscribe(result => {
      this.entryRules.updateEntryRules(result);
    })
  }

  saveTradeAsDraft(source: string) {
    this.tradeStrategy.executed = false;
    this.tradeStrategy.executedDate = undefined;
    this.addTrade(source);
  }

  showSuccess() {
    this.toastr.error('Hello world!', 'Toastr fun!',
      {
        tapToDismiss: false,
        closeButton: true,
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
        netReturn = netReturn + tmp;
      }
    }
    let returnAmt: string = netReturn.toFixed(2);
    this.tradeDetailsBottomComponent.netReturn = returnAmt;
    return returnAmt;
  }

  evaluateStrategyRules(source: string) {
    this.Loader = !this.Loader;
    this.updateTradeStrategyProps(source);
    this.tradeStrategyService.evaluateStrategyRules(this.tradeStrategy).subscribe(result => {
      this.Loader = !this.Loader;
      this.CheckExecutionDate(result, source);
    }, (err) => {
      console.error("Error while evaluating strategy rules for strategy: {}", this.tradeStrategy, err);
      this.Loader = !this.Loader;
    });
  }

  protected isValidTradeStrategy(source: string): boolean {
    const tradeDetailsComp: TradeDetailsComponent = this.getTradeDetails(source);
    if (!tradeDetailsComp) {
      return false;
    }
    let status: boolean = tradeDetailsComp.isValidTradeStrategy();
    if (this.close) {
      status = status && this.tradeDetailsBottomComponent.closeDate !== undefined;
    }
    return status;
  }

  ShowStats() {
    this.StatsSlide = !this.StatsSlide;
  }

  getTradeDetails(source: string): TradeDetailsComponent {
    var comp: TradeDetailsComponent = this.tradeDetails;
    if ('MOBILE' === source) {
      comp = this.mobileTradeDetails;
    }
    return comp;
  }

  getTradeThesis(source: string): TradeThesisComponent {
    var comp: TradeThesisComponent = this.tradeThesis;
    if ('MOBILE' === source) {
      comp = this.mobileTradeThesis;
    }
    return comp;
  }

  getTradeEntryRules(source: string): EntryRulesComponent {
    var comp: EntryRulesComponent = this.entryRules;
    if ('MOBILE' === source) {
      comp = this.mobilEntryRules;
    }
    return comp;
  }

  getTradeExitRules(source: string): ExitRulesComponent {
    var comp: ExitRulesComponent = this.exitRules;
    if ('MOBILE' === source) {
      comp = this.exitRules;
    }
    return comp;
  }

  onShareTradeChange(event) {
    if (event.target.checked) {
      this.toastr.success('Trade details are shared with all of your followers', 'Success');
      return false;
    }else {
      this.toastr.success('Trade details are no longer shared with the followers', 'Success');
      return false;
    }
  }

}
