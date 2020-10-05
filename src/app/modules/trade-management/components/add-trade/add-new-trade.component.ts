import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
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
@Component({
  selector: 'app-add-new-trade',
  templateUrl: './add-new-trade.component.html',
  styleUrls: ['./add-new-trade.component.scss']
})
export class AddNewTradeComponent implements OnInit {

  @ViewChild('stepper', { static: false }) private tradeStepper: MatStepper;
  @ViewChild('tradeMobileStepper', { static: false }) private tradeMobileStepper: MatStepper;

  @ViewChild('tradeDetails', { static: false }) private tradeDetails: TradeDetailsComponent;
  @ViewChild('tradeThesis', { static: false }) private tradeThesis: TradeThesisComponent;
  @ViewChild('entryRules', { static: false }) private entryRules: EntryRulesComponent;

  editTrade = false;

  activeStep: boolean;
  stockAdded: boolean;
  currentState: number = 1;

  selectedStock: StockSymbol = new StockSymbol();
  stockSummary: UserStockSummary = new UserStockSummary();

  tradeStrategy: TradeStrategy = new TradeStrategy();

  inputState: TradeInputData;

  detailSummaryLoaded: boolean;

  constructor(
    private userStockStatsService: UserStockStatsService,
    private tradeStrategyService: TradeStrategyService,
    private router: Router,
    private _dialog: MatDialog) {
    this.initState();
  }

  ngOnInit() {
    this.setState();
  }

  enterSymbol() {
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
    if (this.editTrade) {
      this.editTradeStrategy();
    } else {
      console.log('add trade...', this.tradeStrategy);
      this.tradeStrategyService.addTrade(this.tradeStrategy).subscribe(result => {
        console.log('Trade strategy successfully created');
        alert('Trade Strategy successfully created');//TODO Replace with info box
        this.router.navigateByUrl("/trade-strategies");
      });
    }
  }

  editTradeStrategy() {
    console.log('edit trade...', this.tradeStrategy);
    this.tradeStrategyService.editTrade(this.tradeStrategy).subscribe(result => {
      console.log('Trade strategy successfully updated');
      alert('Trade Strategy successfully updated');//TODO Replace with info box
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
    this.tradeStrategy.entryRules = this.entryRules.entryRules;
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

  setState() {
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
      executed: this.tradeStrategy.executed,
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

}
