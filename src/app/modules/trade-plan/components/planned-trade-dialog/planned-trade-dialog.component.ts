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

  constructor(private strategyCreateService: StrategyCreateService, private dialogRef: MatDialogRef<PlannedTradeDialogComponent>) {
    this.strategyTypes = this.strategyCreateService.getStrategies();
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

}
