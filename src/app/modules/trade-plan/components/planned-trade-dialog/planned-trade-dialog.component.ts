import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { StockSymbol } from 'src/app/modules/shared/models/trade-management/stock-symbol.model';
import { PlannedTrade } from '../../models/planned-trade.model';
import { StrategyCreateService } from 'src/app/modules/shared/services/strategy-create.service';
import { StrategyType } from 'src/app/modules/shared/models/trade-management/strategy-type.enum';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActionType } from 'src/app/modules/shared/models/trade-management/action-type.enum';
import { TradeSearchComponent } from 'src/app/modules/trade-management/components/add-trade/Steps/search-trade/trade-search.component';

@Component({
  selector: 'app-planned-trade-dialog',
  templateUrl: './planned-trade-dialog.component.html',
  styleUrls: ['./planned-trade-dialog.component.scss']
})
export class PlannedTradeDialogComponent implements OnInit {

  @ViewChild('stockSymbolsSearch') private tradeSearchComponent: TradeSearchComponent;

  selectedStock: StockSymbol;


  strategyTypes: String[];
  strategies = StrategyType;
  actionTypes = ActionType;

  stockId: number;


  constructor(@Inject(MAT_DIALOG_DATA) public data: PlannedTrade, private strategyCreateService: StrategyCreateService, private dialogRef: MatDialogRef<PlannedTradeDialogComponent>) {
    console.log('planned trade::', data);
    this.strategyTypes = this.strategyCreateService.getStrategies();
    this.data.actionType = this.data.actionType;
    this.data.actionTypeId = this.data.actionTypeId;
    this.data.strategyType = this.data.strategyType;
    this.data.strategyTypeId = this.data.strategyTypeId;
    this.data.maxRisk = this.data.maxRisk;
    this.data.profit = this.data.profit;
    this.data.executed = this.data.executed;
    this.data.reason = this.data.reason;
    this.data.id = this.data.id;
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    if (this.stockId) {
      this.selectedStock = this.tradeSearchComponent.getSymbolById(this.stockId);
      if (this.selectedStock) {
        this.tradeSearchComponent.selectedTrade(this.selectedStock);
      }
    }
  }

  symbolSelectEventHandler($event: any) {
    if ($event && $event.code) {
      this.selectedStock = $event;
      this.data.symbol = this.selectedStock.code.valueOf();
      this.data.stockId = this.selectedStock.id;
    }
  }

  symbolLoadHandler() {
    if (this.data.stockId && this.data.stockId > 0) {
      this.stockId = this.data.stockId;
      if (this.tradeSearchComponent) {
        let symbolObj: StockSymbol = this.tradeSearchComponent.getSymbolById(this.data.stockId);
        if (symbolObj) {
          this.selectedStock = symbolObj;
          this.tradeSearchComponent.selectedTrade(this.selectedStock);
        }
      }
    }
  }

  closeModal() {
    console.log('data:::', this.data);
    this.dialogRef.close();
  }

  onStrategyTypeChange(strategyTypeId) {
    console.log('str type', strategyTypeId);
    this.data.strategyType = this.strategies[strategyTypeId];
  }

  onActionTypeChange(actType: string) {
    this.data.actionType = this.actionTypes[actType];
  }

}
