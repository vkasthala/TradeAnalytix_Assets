import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatStepper, MatDialog } from '@angular/material';
import { NavigationExtras, Router } from '@angular/router';
import { StockSymbol } from 'src/app/modules/shared/models/trade-management/stock-symbol.model';
import { TradeInputData } from 'src/app/modules/shared/models/trade-management/trade-input-data.model';
import { UserStockSummary } from 'src/app/modules/shared/models/trade-management/user-stock-summary.model';
import { UserStockStatsService } from 'src/app/modules/shared/services/user-stock-stats.service';
import { TradeStrategy } from '../../models/trade-strategy.model';
import { TradeStrategyService } from '../../services/trade-strategy.service';
import { TradeDetailsComponent } from './Steps/trade-details/trade-details.component';
import { TradeThesisComponent } from './Steps/trade-thesis/trade-thesis.component';
import { EntryRulesComponent } from './Steps/entry-rules/entry-rules.component';
import { TradeExecutionDateComponent } from 'src/app/modules/shared/components/modals/trade-execution-date/trade-execution-date.component';
import { ActionType } from 'src/app/modules/shared/models/trade-management/action-type.enum';
import { TradeDirection } from 'src/app/modules/shared/models/trade-management/trade-direction.enum';
import { TradeSearchComponent } from './Steps/search-trade/trade-search.component';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogComponent } from 'src/app/modules/shared/components/modals/confirm-dialog/confirm-dialog.component';
import { ExitRulesComponent } from './Steps/exit-rules/exit-rules.component';
import { RiskAnalysisRequest } from 'src/app/modules/risk-analysis/models/risk-analysis-request.model';
import { RiskAnalysisService } from 'src/app/modules/risk-analysis/services/risk-analysis.service';
import { TradeDetailsAsideComponent } from './trade-details-aside/trade-details-aside.component';
import { TradeHistory } from '../../models/trade-history.model';

@Component({
  selector: 'app-add-new-trade',
  templateUrl: './add-new-trade.component.html',
  styleUrls: ['./add-new-trade.component.scss']
})
export class AddNewTradeComponent implements OnInit {
  title = 'toaster-not';

  @ViewChild('tradeSearchComponent', { static: false }) protected tradeSearchComponent: TradeSearchComponent;
  @ViewChild('stepper', { static: false }) protected tradeStepper: MatStepper;
  @ViewChild('tradeMobileStepper', { static: false }) protected tradeMobileStepper: MatStepper;
  @ViewChild('tradeDetailsAside', { static: false }) protected tradeDetailsAsideComponent: TradeDetailsAsideComponent;

  @ViewChild('tradeDetails', { static: false }) protected tradeDetails: TradeDetailsComponent;
  @ViewChild('tradeThesis', { static: false }) protected tradeThesis: TradeThesisComponent;
  @ViewChild('entryRules', { static: false }) protected entryRules: EntryRulesComponent;
  @ViewChild('exitRules', { static: false }) protected exitRules: ExitRulesComponent;

  protected add = true;
  protected edit = false;
  protected close = false;
  protected view = false;

  protected activeStep: boolean;
  protected stockAdded: boolean;
  protected currentState: number = 1;

  protected selectedStock: StockSymbol = new StockSymbol();
  protected stockSummary: UserStockSummary = new UserStockSummary();

  protected tradeStrategy: TradeStrategy = new TradeStrategy();

  protected inputState: TradeInputData;

  protected detailSummaryLoaded: boolean;
  protected closedLegs: boolean = false;

  protected tradeHistory: TradeHistory;

  constructor(
    protected userStockStatsService: UserStockStatsService,
    protected tradeStrategyService: TradeStrategyService,
    protected riskAnalysisService: RiskAnalysisService,
    protected router: Router,
    protected toastr: ToastrService,
    protected _dialog: MatDialog) {
    this.initState();
  }

  ngOnInit() {
    this.setState();
  }


  enterSymbol() {
    if (!this.selectedStock || !this.selectedStock.code) {
      this.toastr.error('Invalid Symbol', '');
      //return false;
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
    },
      errResponse => {
        console.log("max details error:", errResponse);
      });
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
    this.updateTradeStrategyProps();
    console.log('add trade...', this.tradeStrategy);
    this.tradeStrategyService.addTrade(this.tradeStrategy).subscribe(result => {
      console.log('Trade strategy successfully created');
      this.toastr.success('Trade Strategy successfully created', '');
      this.router.navigateByUrl("/trade-strategies");
    });
  }

  editTradeStrategy() {
    this.updateTradeStrategyProps();
    console.log('edit trade...', this.tradeStrategy);
    this.tradeStrategyService.editTrade(this.tradeStrategy).subscribe(result => {
      console.log('Trade strategy successfully updated');
      this.toastr.success('Trade Strategy successfully updated', '');
      this.router.navigateByUrl("/trade-strategies");
    });
  }

  closeTradeStrategy() {
    this.updateTradeStrategyProps();
    console.log('close trade...', this.tradeStrategy);
    this.tradeStrategyService.closeTrade(this.tradeStrategy).subscribe(result => {
      console.log('Trade strategy successfully closed');
      this.toastr.success('Trade Strategy successfully closed', '');
      this.router.navigateByUrl("/trade-strategies");
    });
  }

  updateTradeStrategyProps() {
    this.tradeStrategy.stockId = this.selectedStock.id;
    this.tradeStrategy.strategyTypeId = this.tradeDetails.selectedStrategy;
    let tradeThesisArray = [];
    tradeThesisArray.push(this.tradeThesis.tradeThesis);
    this.tradeStrategy.tradeThesis = tradeThesisArray;
    let stockEntries = [];
    if (this.tradeDetails.stockEntry) {
      stockEntries.push(this.tradeDetails.stockEntry);
    }
    this.tradeStrategy.stockEntry = stockEntries;
    this.tradeStrategy.stockOptions = this.tradeDetails.stockOptions;
    this.tradeStrategy.direction = this.getDirection();
    this.tradeStrategy.entryRules = this.entryRules.entryRules;
    if (this.close) {
      if (this.tradeStrategy.entryRules && this.exitRules.exitRules) {
        this.tradeStrategy.entryRules = this.tradeStrategy.entryRules.concat(this.exitRules.exitRules);
      }
      this.tradeStrategy.closeDate = this.tradeDetails.closeDate;
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
    console.log('nav:', this.router.getCurrentNavigation());
    if (!this.router.getCurrentNavigation()) {
      return;
    }
    let extras: NavigationExtras = this.router.getCurrentNavigation().extras;
    if (extras && extras.state) {
      this.currentState++;
      console.log('state..', extras.state)
      let state: TradeInputData = <TradeInputData>extras.state;
      if (state && state.selectedStock && state.stockSummary) {
        this.inputState = state;
        console.log('created state:', this.inputState);
      }
    }
  }

  public setState() {
    if (this.inputState) {
      console.log('Setting state:', this.inputState);
      this.selectedStock = this.inputState.selectedStock;
      this.stockSummary = this.inputState.stockSummary;
      this.tradeStrategy = this.inputState.tradeStrategy;
    }
  }

  navigaeToRiskAnalysis() {
    let extras: NavigationExtras = {};
    this.updateTradeStrategyProps();
    let inputData: TradeInputData = new TradeInputData();
    inputData.selectedStock = this.selectedStock;
    inputData.tradeStrategy = this.tradeStrategy;
    inputData.stockSummary = this.stockSummary;
    extras.state = inputData;
    this.router.navigate(['/risk-analysis'], extras);
  }

  CheckExecutionDate(value) {
    let dialogData = {
      title: value,
      executed: this.tradeStrategy.executed + '',
      executionDate: this.tradeStrategy.executedDate
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
      this.addTrade();
    });
  }

  editTrade() {
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

  closeTrade() {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      data: { 'message': 'Are you sure you want to close this strategy?' }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        this.closeTradeStrategy();
      }
    });
  }

  saveTradeAsDraft() {
    this.tradeStrategy.executed = false;
    this.tradeStrategy.executedDate = undefined;
    this.addTrade();
  }

  showSuccess() {
    this.toastr.error('Hello world!', 'Toastr fun!');
  }

  showClosedLegs() {
    this.closedLegs = !this.closedLegs;
    if (this.closedLegs && !this.tradeHistory) {
      this.tradeStrategyService.getTradeClosedHistory(this.tradeStrategy.id).subscribe(history => {
        this.tradeHistory = history;
      });
    }
  }

}
