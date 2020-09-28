import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ActionType } from 'src/app/modules/shared/models/trade-management/action-type.enum';
import { OptionEntry } from 'src/app/modules/shared/models/trade-management/option-entry.model';
import { OptionType } from 'src/app/modules/shared/models/trade-management/option-type.enum';
import { StockEntry } from 'src/app/modules/shared/models/trade-management/stock-entry.model';
import { StockSymbol } from 'src/app/modules/shared/models/trade-management/stock-symbol.model';
import { StrategyTemplate } from 'src/app/modules/shared/models/trade-management/strategy-template.model';
import { StrategyType } from 'src/app/modules/shared/models/trade-management/strategy-type.enum';
import { TradeInputData } from 'src/app/modules/shared/models/trade-management/trade-input-data.model';
import { UserStockSummary } from 'src/app/modules/shared/models/trade-management/user-stock-summary.model';
import { StrategyCreateServiceService } from 'src/app/modules/shared/services/strategy-create-service.service';
import { UtilService } from 'src/app/modules/utilities/services/util.service';

import { MatDialog } from '@angular/material';
import { TradeExecutionDateComponent } from 'src/app/modules/shared/components/modals/trade-execution-date/trade-execution-date.component';
import { TradeStrategy } from 'src/app/modules/trade-management/models/trade-strategy.model';
import { TradeThesis } from 'src/app/modules/trade-management/models/trade-thesis.model';

@Component({
  selector: 'app-trade-details',
  templateUrl: './trade-details.component.html',
  styleUrls: ['./trade-details.component.scss']
})
export class TradeDetailsComponent implements OnInit {

  addTrade: boolean = true;

  currentState: number = 1;
  stockAdded: boolean;

  strategies = StrategyType;
  strategyTypes: String[] = this.strategyCreateServiceService.getStrategies();

  @Output('nextStep') nextStep = new EventEmitter();
  @Output('activateRisk') activateRisk = new EventEmitter();
  @Output('addTradeEvent') addTradeEvent = new EventEmitter();
  @Output('navigateRiskAnalysisEvent') navigateRiskAnalysisEvent = new EventEmitter();

  @Input('stockSummary') stockSummary: UserStockSummary;
  @Input("selectedStock") selectedStock: StockSymbol;
  @Input("inputState") inputState: TradeInputData;


  stockEntry: StockEntry;
  stockOptions: OptionEntry[] = [];
  selectedStrategy: number = 15;

  constructor(private utilService: UtilService,
    private strategyCreateServiceService: StrategyCreateServiceService,
    private router: Router,
    private _dialog: MatDialog) { }

  ngOnInit() {
    console.log('child init:', this.router.getCurrentNavigation());
    this.stockEntry = this.createStockEntry();
  }

  ngAfterViewInit(): void {
    console.log('child view init:', this.inputState);
    if (this.inputState) {
      this.stockEntry = this.inputState.stockEntry;
      this.stockOptions = this.inputState.stockOptions;
      this.selectedStrategy = this.inputState.strategyType;
      if (this.stockEntry) {
        this.stockAdded = true;
      }
    }
  }

  ngAfterContentInit() {
    console.log('here1..')
  }

  enterSymbol() {
    this.currentState++;
  }

  addStock() {
    this.stockAdded = true;
  }

  addOption() {
    if (this.stockOptions.length < 4) {
      this.stockOptions.push(this.createStockOptionEntry())
    }
  }

  next() {
    this.nextStep.emit()
  }

  deleteStock() {
    this.stockAdded = false;
  }

  deleteStockOption(index) {
    this.stockOptions.splice(index, 1);

  }

  onStrategyTypeChange(strategy: Number) {
    console.log('selected strategy:', strategy);
    let template: StrategyTemplate = this.strategyCreateServiceService.getStrategyTemplate(strategy);
    if (template) {
      this.stockEntry = template.stockEntry;
      this.stockAdded = template.stockEntry ? true : false;
      this.stockOptions = template.optionEntries;
    }
  }

  navigateToRiskAnalysis(): void {
    let input: TradeInputData = {
      stockEntry: this.stockEntry,
      stockOptions: this.stockOptions,
      stockSummary: this.stockSummary,
      selectedStock: this.selectedStock,
      strategyType: this.selectedStrategy
    };
    this.navigateRiskAnalysisEvent.emit(input);
  }

  createStockOptionEntry(): OptionEntry {
    let option: OptionEntry = new OptionEntry();
    option.actionType = ActionType["Buy to Open"];
    option.optionType = OptionType.Call;
    return option;
  }

  createStockEntry(): StockEntry {
    let stockEntry: StockEntry = new StockEntry();
    stockEntry.price = this.stockSummary.close;
    stockEntry.lowerBound = -10;
    stockEntry.upperBound = 10;
    stockEntry.riskFreeRate = 6;
    stockEntry.actionType = ActionType["Buy to Open"];
    return stockEntry;
  }

  calculateNetDebit(): number {
    let netDebit: number = 0;
    let tmp: number;
    if (this.stockEntry && this.stockEntry.quantity && this.stockEntry.price) {
      tmp = this.stockEntry.quantity * this.stockEntry.price;
      netDebit = tmp * (this.stockEntry.actionType == ActionType["Buy to Open"] ? 1 : -1);
    }
    if (this.stockOptions) {
      for (let index = 0; index < this.stockOptions.length; index++) {
        tmp = this.stockOptions[index].contracts && this.stockOptions[index].price ? Number.parseFloat((this.stockOptions[index].contracts * this.stockOptions[index].price * 100).toFixed(2)) : 0
        if (this.stockOptions[index].actionType == ActionType["Buy to Open"]) {
          netDebit += tmp;
        } else if (this.stockOptions[index].actionType == ActionType["Sell to Open"]) {
          netDebit -= tmp;
        }
      }
    }
    return netDebit;
  }

  preventNegatives(e, preventDecimal?: boolean) {
    if (preventDecimal) {
      if (!((e.keyCode > 95 && e.keyCode < 106)
        || (e.keyCode > 47 && e.keyCode < 58)
        || e.keyCode == 8 || e.keyCode == 17 || e.keyCode == 110)) {
        if (e.keyCode != 190 && e.keyCode != 46 && e.keyCode != 37 && e.keyCode != 39 && e.keyCode != 9) {
          return false;
        } else {
          return true;
        }
      }
    } else {
      if (!((e.keyCode > 95 && e.keyCode < 106)
        || (e.keyCode > 47 && e.keyCode < 58)
        || e.keyCode == 8)) {
        if (e.keyCode != 190 && e.keyCode != 46 && e.keyCode != 37 && e.keyCode != 39 && e.keyCode != 9) {
          return false;
        } else {
          return true;
        }
      }
    }
  }

  CheckExecutionDate(value) {
    const dialogRef = this._dialog.open(TradeExecutionDateComponent, {
      disableClose: true,
      width: 'auto',
      data: { title: value }
    });

    dialogRef.afterClosed().subscribe((res) => {
      console.log('here...');
      let tradeStrategy: TradeStrategy = new TradeStrategy();
      tradeStrategy.stockEntry = this.stockEntry;
      tradeStrategy.stockOptions = this.stockOptions;
      tradeStrategy.strategyTypeId = this.selectedStrategy;
      this.addTradeEvent.emit(tradeStrategy);
    });
  }

}
