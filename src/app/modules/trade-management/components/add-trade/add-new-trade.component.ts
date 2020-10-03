import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material';
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

  activeStep: boolean;
  stockAdded: boolean;
  currentState: number = 1;

  selectedStock: StockSymbol = new StockSymbol();
  stockSummary: UserStockSummary = new UserStockSummary();

  executed: boolean;
  executedDate: string;

  inputState: TradeInputData;

  detailSummaryLoaded: boolean;

  constructor(private changeRef: ChangeDetectorRef,
    private userStockStatsService: UserStockStatsService,
    private tradeStrategyService: TradeStrategyService,
    private router: Router) {
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


  addTrade($event) {
    this.executed = $event.executed;
    this.executedDate = $event.executedDate;
    console.log('add trade...', this.createTradeStrategy());
    this.tradeStrategyService.addTrade(this.createTradeStrategy()).subscribe(result => {
      console.log('Trade strategy successfully created');
      alert('Trade Strategy successfully created');//TODO Replace with info box
      this.router.navigateByUrl("/trade-strategies");
    });
  }

  createTradeStrategy(): TradeStrategy {
    let tradeStrategy: TradeStrategy = new TradeStrategy();
    tradeStrategy.stockId = this.selectedStock.id;
    tradeStrategy.strategyTypeId = this.tradeDetails.selectedStrategy;
    tradeStrategy.executed = this.executed;
    tradeStrategy.executedDate = this.executedDate;
    tradeStrategy.tradeThesis = this.tradeThesis.tradeThesis;
    tradeStrategy.stockEntry = this.tradeDetails.stockEntry;
    tradeStrategy.stockOptions = this.tradeDetails.stockOptions;
    tradeStrategy.entryRules = this.entryRules.entryRules;
    return tradeStrategy;
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
    }
  }

  navigaeToRiskAnalysis($event: TradeInputData) {
    let extras: NavigationExtras = {};
    if (this.tradeThesis && this.tradeThesis.tradeThesis) {
      $event.tradeThesis = this.tradeThesis.tradeThesis;
    }
    extras.state = $event;
    this.router.navigate(['/risk-analysis'], extras);
  }

}
