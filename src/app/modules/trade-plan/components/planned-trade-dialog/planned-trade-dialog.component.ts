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

  @ViewChild('stockSymbolsSearch', { static: false }) private tradeSearchComponent: TradeSearchComponent;

  selectedStock: StockSymbol = new StockSymbol();


  strategyTypes: String[];
  strategies = StrategyType;
  actionTypes = ActionType;


  constructor(@Inject(MAT_DIALOG_DATA) public data: PlannedTrade, private strategyCreateService: StrategyCreateService, private dialogRef: MatDialogRef<PlannedTradeDialogComponent>) {
    this.strategyTypes = this.strategyCreateService.getStrategies();
  }

  ngOnInit() {
    if (this.selectedStock && this.tradeSearchComponent) {
      this.tradeSearchComponent.selectedTrade(this.selectedStock);
    }
  }

  symbolSelectEventHandler($event: any) {
    console.log('symbol:', $event);
    this.selectedStock = $event;
    this.data.symbol = this.selectedStock.code.valueOf();
    this.data.stockId = this.selectedStock.id;
  }

  symbolLoadHandler() {
    console.log('symbols loaded...');
    if (this.data.stockId && this.data.stockId > 0 && this.tradeSearchComponent) {
      let symbolObj: StockSymbol = this.tradeSearchComponent.getSymbolById(this.data.stockId);
      console.log('symbol ob: ', symbolObj);
      if (symbolObj) {
        this.selectedStock = symbolObj;
        if (this.tradeSearchComponent) {
          this.tradeSearchComponent.selectedTrade(this.selectedStock);
        }
      }
    }
  }

  closeModal() {
    this.dialogRef.close();
  }

  onStrategyTypeChange(strategyTypeId) {
    console.log('str: ', this.strategies[strategyTypeId]);
    this.data.strategyType = this.strategies[strategyTypeId];
  }

  onActionTypeChange(actType: string) {
    console.log('act: ', this.actionTypes[actType]);
    this.data.actionType = this.actionTypes[actType];
  }

}
