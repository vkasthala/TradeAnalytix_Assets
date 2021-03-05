import { Component, OnInit } from '@angular/core';
import { StockSymbol } from 'src/app/modules/shared/models/trade-management/stock-symbol.model';
import { PlannedTrade } from '../../models/planned-trade.model';
import { StrategyCreateService } from 'src/app/modules/shared/services/strategy-create.service';
import { StrategyType } from 'src/app/modules/shared/models/trade-management/strategy-type.enum';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-planned-trade-dialog',
  templateUrl: './planned-trade-dialog.component.html',
  styleUrls: ['./planned-trade-dialog.component.scss']
})
export class PlannedTradeDialogComponent implements OnInit {

  selectedStock: StockSymbol = new StockSymbol();
  data: PlannedTrade = new PlannedTrade();

  strategyTypes: String[];
  strategies = StrategyType;
  actionTypes: string[];


  constructor(private strategyCreateService: StrategyCreateService, private dialogRef: MatDialogRef<PlannedTradeDialogComponent>) {
    this.strategyTypes = this.strategyCreateService.getStrategies();
    this.actionTypes = this.strategyCreateService.getActionTypes();
  }

  ngOnInit() {
  }

  symbolSelectEventHandler($event: any) {
    console.log('symbol:', $event);
    this.selectedStock = $event;
    this.data.symbol = this.selectedStock.code.valueOf();
    this.data.stockId = this.selectedStock.id;
  }

  closeModal() {
    this.dialogRef.close();
  }

  onStrategyTypeChange(strategyTypeId) {
    console.log('str: ', this.strategyTypes[strategyTypeId].valueOf(), this.strategyTypes, this.actionTypes);
    this.data.strategyType = this.strategyTypes[strategyTypeId].valueOf();
  }

  onActionTypeChange(actType: string) {
    console.log('act: ', actType);
    this.data.actionType = this.actionTypes[actType];
  }

}
