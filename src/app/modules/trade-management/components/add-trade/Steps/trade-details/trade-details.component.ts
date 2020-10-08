import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { TradeExecutionDateComponent } from 'src/app/modules/shared/components/modals/trade-execution-date/trade-execution-date.component';
import { ActionType } from 'src/app/modules/shared/models/trade-management/action-type.enum';
import { OptionEntry } from 'src/app/modules/shared/models/trade-management/option-entry.model';
import { OptionType } from 'src/app/modules/shared/models/trade-management/option-type.enum';
import { StockEntry } from 'src/app/modules/shared/models/trade-management/stock-entry.model';
import { StockSymbol } from 'src/app/modules/shared/models/trade-management/stock-symbol.model';
import { StrategyTemplate } from 'src/app/modules/shared/models/trade-management/strategy-template.model';
import { StrategyType } from 'src/app/modules/shared/models/trade-management/strategy-type.enum';
import { TradeInputData } from 'src/app/modules/shared/models/trade-management/trade-input-data.model';
import { UserStockSummary } from 'src/app/modules/shared/models/trade-management/user-stock-summary.model';
import { StrategyCreateService } from 'src/app/modules/shared/services/strategy-create.service';
import { TradeStrategy } from 'src/app/modules/trade-management/models/trade-strategy.model';
import { UtilService } from 'src/app/modules/utilities/services/util.service';
import { AddToPositionComponent } from 'src/app/modules/shared/components/modals/add-to-position/add-to-position.component';
import { AddToStockPositionComponent } from 'src/app/modules/shared/components/modals/add-to-stock-position/add-to-stock-position.component';
import { ReduceToPositionComponent } from 'src/app/modules/shared/components/modals/reduce-to-position/reduce-to-position.component';
import { ReduceToStockPositionComponent } from 'src/app/modules/shared/components/modals/reduce-to-stock-position/reduce-to-stock-position.component';

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
  @Input() editTrade: boolean;

  stockEntry: StockEntry;
  stockOptions: OptionEntry[] = [];
  selectedStrategy: number = 15;

  constructor(private utilService: UtilService,
    private strategyCreateServiceService: StrategyCreateService,
    private router: Router,
    private _dialog: MatDialog) { }

  ngOnInit() {
    console.log('child init:', this.router.getCurrentNavigation());
    this.stockEntry = this.createStockEntry();
  }

  ngAfterViewInit(): void {
    console.log('child view init:', this.inputState);
    if (this.inputState) {
      this.stockOptions = this.inputState.tradeStrategy.stockOptions;
      this.selectedStrategy = this.inputState.tradeStrategy.strategyTypeId;
      this.stockEntry = this.inputState.tradeStrategy.stockEntry && this.inputState.tradeStrategy.stockEntry.length > 0 ? this.inputState.tradeStrategy.stockEntry[0] : undefined;
      this.stockAdded = this.inputState.tradeStrategy.stockEntry && this.inputState.tradeStrategy.stockEntry.length > 0 && this.inputState.tradeStrategy.stockEntry[0].actionType && this.inputState.tradeStrategy.stockEntry[0].quantity > 0;
    }
  }

  ngAfterContentInit() {
    console.log('here1..')
  }

  enterSymbol() {
    this.currentState++;
  }

  addStock() {
    this.stockEntry = this.createStockEntry();
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
    this.navigateRiskAnalysisEvent.emit();
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
  addToPosition() {
    const dialogRef = this._dialog.open(AddToPositionComponent, {
      disableClose: false,
      width: 'auto'
    });
  }
  reduceToPosition() {
    const dialogRef = this._dialog.open(ReduceToPositionComponent, {
      disableClose: false,
      width: 'auto'
    });
  }
  addToStockPosition() {
    const dialogRef = this._dialog.open(AddToStockPositionComponent, {
      disableClose: false,
      width: 'auto'
    });
  }
  reduceToStockOption() {
    const dialogRef = this._dialog.open(ReduceToStockPositionComponent, {
      disableClose: false,
      width: 'auto'
    });
  }

}
