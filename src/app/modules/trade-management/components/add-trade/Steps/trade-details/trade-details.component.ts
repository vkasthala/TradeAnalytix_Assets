import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  selector: 'app-trade-details',
  templateUrl: './trade-details.component.html',
  styleUrls: ['./trade-details.component.scss'],
})
export class TradeDetailsComponent implements OnInit {

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  currentState: number = 1;
  stockAdded: boolean;

  strategies = StrategyType;
  strategyTypes: String[] = this.strategyCreateServiceService.getStrategies();

  @Output('nextStep') nextStep = new EventEmitter();
  @Output('activateRisk') activateRisk = new EventEmitter();
  @Output('addTradeEvent') addTradeEvent = new EventEmitter();
  @Output('navigateRiskAnalysisEvent') navigateRiskAnalysisEvent = new EventEmitter();
  @Output('calcNetDebit') calcNetDebit: EventEmitter<string> = new EventEmitter();
  @Output('calcNetReturn') calcNetReturn: EventEmitter<string> = new EventEmitter();

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

  stockEntry: StockEntry;
  stockOptions: OptionEntry[] = [];
  selectedStrategy: number = 15;
  direction: TradeDirection = TradeDirection.Custom;
  executedDate: string;
  closeDate: string;
  tradeStatus: number;

  constructor(
    private utilService: UtilService,
    private strategyCreateServiceService: StrategyCreateService,
    private router: Router,
    private _dialog: MatDialog) {
  }

  ngOnInit() {
    this.stockEntry = this.createStockEntry();
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

  enterSymbol() {
    this.currentState++;
  }

  addStock() {
    this.stockEntry = this.createStockEntry();
    this.stockAdded = true;
    this.updateStockOrOptionAddedStatus();
  }

  addOption() {
    if (this.stockOptions.length < 4) {
      this.stockOptions.push(this.createStockOptionEntry())
      this.updateStockOrOptionAddedStatus();
    }
  }

  updateStockOrOptionAddedStatus() {
    this.stockOrOptionAddedSubject.next(this.stockAdded || this.stockOptions.length > 0);
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
      if (this.stockAdded) {
        this.stockEntry.price = this.stockSummary.close;
      } else if (!this.stockEntry) {
        this.stockEntry = this.createStockEntry();
      }
      this.stockOptions = template.optionEntries;
      this.direction = template.direction;
    }
    this.strategyTypeChangeSubject.next(strategy.valueOf());
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

  calculateNetDebit(): string {
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
    let debit: string = netDebit.toFixed(2);
    this.calcNetDebit.emit(debit);
    return debit;
  }

  calculateNetReturn(): string {
    let netReturn: number = 0;
    let tmp: number;
    if (this.stockEntry && this.stockEntry.quantity && this.stockEntry.closePrice) {
      tmp = this.stockEntry.quantity * (this.stockEntry.closePrice - this.stockEntry.price);
      netReturn = tmp * (this.stockEntry.actionType == ActionType["Buy to Open"] ? 1 : -1);
    }
    if (this.stockOptions) {
      for (let index = 0; index < this.stockOptions.length; index++) {
        tmp = this.stockOptions[index].contracts && this.stockOptions[index].closePrice ? Number.parseFloat((this.stockOptions[index].contracts * (this.stockOptions[index].closePrice - this.stockOptions[index].price) * 100).toFixed(2)) : 0
        if (this.stockOptions[index].actionType == ActionType["Buy to Open"]) {
          netReturn += tmp;
        } else if (this.stockOptions[index].actionType == ActionType["Sell to Open"]) {
          netReturn -= tmp;
        }
      }
    }
    let returnAmt: string = netReturn.toFixed(2);
    this.calcNetReturn.emit(returnAmt);
    return returnAmt;
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
    let dialogData: any = this.getAddData(this.stockEntry.actionType);
    dialogData.title = this.getStockAddOrReduceTitle(true);
    const dialogRef = this._dialog.open(AddToPositionComponent, {
      disableClose: false,
      width: 'auto',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.addOrReduceStock(res, true);
    });
  }

  reduceToPosition() {
    let dialogData: any = this.getReduceData(this.stockEntry.actionType);
    dialogData.title = this.getStockAddOrReduceTitle(false);
    const dialogRef = this._dialog.open(ReduceToPositionComponent, {
      disableClose: false,
      width: 'auto',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.addOrReduceStock(res, false);
    });
  }

  addToStockPosition(index: number) {
    let dialogData: any = this.getAddData(this.stockOptions[index].actionType);
    dialogData.title = this.getOptionAddOrReduceTitle(this.stockOptions[index].expireDate, this.stockOptions[index].strikePrice, this.stockOptions[index].optionType, true);
    const dialogRef = this._dialog.open(AddToStockPositionComponent, {
      disableClose: false,
      width: 'auto',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe((res) => {
      console.log('here...', res);
      this.addOrReduceStockOption(res, this.stockOptions[index], true, index);
    });
  }

  reduceToStockOption(index: number) {
    let dialogData: any = this.getReduceData(this.stockOptions[index].actionType);
    dialogData.title = this.getOptionAddOrReduceTitle(this.stockOptions[index].expireDate, this.stockOptions[index].strikePrice, this.stockOptions[index].optionType, false);
    const dialogRef = this._dialog.open(ReduceToStockPositionComponent, {
      disableClose: false,
      width: 'auto',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe((res) => {
      console.log('here...', res);
      this.addOrReduceStockOption(res, this.stockOptions[index], false, index);
    });
  }

  getAddData(orgActionType: ActionType) {
    return {
      actionType: orgActionType
    }
  }

  getReduceData(orgActionType: ActionType) {
    let actionType;
    if (ActionType["Buy to Open"] == orgActionType) {
      actionType = ActionType["Sell to Close"];
    } else if (ActionType["Sell to Open"] == orgActionType) {
      actionType = ActionType["Buy to Close"];
    }
    return {
      actionType: actionType
    }
  }

  getOptionAddOrReduceTitle(expiryDate: string, strikePrice: number, optionType: OptionType, add: boolean) {
    let tInd = expiryDate.indexOf('T');
    let expiryDateText = expiryDate.substring(0, tInd);
    return (add == true ? 'Add to ' : 'Reduce ') + expiryDateText + '-' + strikePrice + '-' + (optionType == 1 ? 'call' : 'put');
  }

  getStockAddOrReduceTitle(add: boolean) {
    return (add == true ? 'Add to ' : 'Reduce ') + 'Stock';
  }

  addOrReduceStock(dialogResult: any, add: boolean) {
    if (!dialogResult || (!dialogResult.price || !dialogResult.quantity) || (add == false && dialogResult.quantity > this.stockEntry.quantity)) {
      return;
    }
    console.log('stock result:', dialogResult);
    let openPrice: number = this.stockEntry.price;
    if (add) {
      this.stockEntry.quantity = this.stockEntry.quantity + dialogResult.quantity;
      let price = +(((this.stockEntry.price * this.stockEntry.quantity) + (dialogResult.quantity * dialogResult.price)) / (this.stockEntry.quantity + dialogResult.quantity)).toFixed(2);
      this.stockEntry.price = price;
    } else {
      this.stockEntry.quantity = this.stockEntry.quantity - dialogResult.quantity;
    }
    if (!this.stockEntry.partialLegChange) {
      this.stockEntry.partialLegChange = [];
    }
    let legChange: PartialLegChange = this.createPartialLegClose(dialogResult.quantity, openPrice, dialogResult.price, add, dialogResult.actionType, dialogResult.notes, dialogResult.executedDate);
    this.stockEntry.partialLegChange.push(legChange);
    if (legChange.changeCount < 0) {
      let stockLegHistory: StockLegHistory = this.createLocalStockLegHistory(legChange);
      console.log('stock leg history: ', stockLegHistory);
      this.localStockClosedSubject.next(stockLegHistory);
    }
  }

  addOrReduceStockOption(dialogResult: any, stockOption: OptionEntry, add: boolean, index: number) {
    if (!dialogResult || (!dialogResult.price || !dialogResult.contracts) || (add == false && dialogResult.contracts > stockOption.contracts)) {
      return;
    }
    console.log('option result:', dialogResult);
    let openPrice: number = stockOption.price;
    if (add) {
      stockOption.contracts = stockOption.contracts + dialogResult.contracts;
      let price = +(((stockOption.price * stockOption.contracts) + (dialogResult.contracts * dialogResult.price)) / (stockOption.contracts + dialogResult.contracts)).toFixed(2);
      stockOption.price = price;
    } else if (dialogResult.contracts <= stockOption.contracts) {
      stockOption.contracts = stockOption.contracts - dialogResult.contracts;
    }

    if (!stockOption.partialLegChange) {
      stockOption.partialLegChange = [];
    }
    let legChange: PartialLegChange = this.createPartialLegClose(dialogResult.contracts, openPrice, dialogResult.price, add, dialogResult.actionType, dialogResult.notes, dialogResult.executedDate);
    stockOption.partialLegChange.push(legChange);
    if (legChange.changeCount < 0) {
      let optionLegHistory: OptionLegHistory = this.createLocalOptionLegHistory(legChange, stockOption);
      console.log('option leg history: ', optionLegHistory);
      this.localOptionClosedSubject.next(optionLegHistory);
    }
  }

  createPartialLegClose(changeCount: number, openPrice: number, closePrice: number, add: boolean, actionType: any, notes: string, executedDate: string) {
    let partialCloseDetails: PartialLegChange = new PartialLegChange();
    partialCloseDetails.changeCount = add === true ? changeCount : -1 * changeCount;
    partialCloseDetails.closePrice = closePrice;
    partialCloseDetails.openPrice = openPrice;
    partialCloseDetails.executedDate = executedDate;
    partialCloseDetails.actionType = actionType;
    partialCloseDetails.notes = notes;
    return partialCloseDetails;
  }

  createLocalStockLegHistory(legChange: PartialLegChange): StockLegHistory {
    let stockLegHistory: StockLegHistory = new StockLegHistory();
    stockLegHistory.actionType = legChange.actionType;
    stockLegHistory.quantity = legChange.changeCount * -1;
    stockLegHistory.entryPrice = legChange.openPrice;
    stockLegHistory.exitPrice = legChange.closePrice;
    return stockLegHistory;
  }

  createLocalOptionLegHistory(legChange: PartialLegChange, stockOption: OptionEntry): OptionLegHistory {
    let optionLegHistory: OptionLegHistory = new OptionLegHistory();
    optionLegHistory.actionType = legChange.actionType;
    optionLegHistory.contracts = legChange.changeCount * -1;
    optionLegHistory.entryPrice = legChange.openPrice;
    optionLegHistory.exitPrice = legChange.closePrice;
    optionLegHistory.optionType = stockOption.optionType;
    optionLegHistory.strikePrice = stockOption.strikePrice;
    optionLegHistory.expireDate = stockOption.expireDate;
    return optionLegHistory;
  }

}
