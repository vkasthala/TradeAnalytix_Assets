import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatStepper } from '@angular/material';
import { StockSymbol } from 'src/app/modules/shared/models/trade-management/stock-symbol.model';
import { UserStockStatsService } from 'src/app/modules/shared/services/user-stock-stats.service';
import { TradeInputData } from 'src/app/modules/shared/models/trade-management/trade-input-data.model';
import { Subject } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';
import { UserStockSummary } from 'src/app/modules/shared/models/trade-management/user-stock-summary.model';
import { StockEntry } from 'src/app/modules/shared/models/trade-management/stock-entry.model';
import { OptionEntry } from 'src/app/modules/shared/models/trade-management/option-entry.model';
@Component({
  selector: 'app-add-new-trade',
  templateUrl: './add-new-trade.component.html',
  styleUrls: ['./add-new-trade.component.scss']
})
export class AddNewTradeComponent implements OnInit {

  @ViewChild('stepper', { static: false }) private tradeStepper: MatStepper;
  @ViewChild('tradeMobileStepper', { static: false }) private tradeMobileStepper: MatStepper;
  activeStep: boolean;
  stockAdded: boolean;
  currentState: number = 1;
  selectedStock: StockSymbol = new StockSymbol();
  stockSummary: UserStockSummary = new UserStockSummary();

  stockEntry: StockEntry;
  stockOptions: OptionEntry[] = [];
  selectedStrategy: number = 15;
  detailSummaryLoaded: boolean;

  constructor(private changeRef: ChangeDetectorRef,
    private userStockStatsService: UserStockStatsService,
    private router: Router) {
    this.initState();
  }

  ngOnInit() {

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
      console.log('state..', extras.state)
      let state: TradeInputData = <TradeInputData>extras.state;
      if (state && state.selectedStock && state.stockSummary) {
        this.selectedStock = state.selectedStock;
        this.stockSummary = state.stockSummary;
        this.stockEntry = state.stockEntry;
        this.stockOptions = state.stockOptions;
        this.selectedStrategy = state.strategyType;
      }
    }
  }

}
