import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenStrategiesGridComponent } from './components/open-strategies-grid/open-strategies-grid.component';
import { PlannedTradesGridComponent } from './components/planned-trades-grid/planned-trades-grid.component';
import { PlannedTradeDialogComponent } from './components/planned-trade-dialog/planned-trade-dialog.component';
import { StrategyActionTextDialogComponent } from './components/strategy-action-text-dialog/strategy-action-text-dialog.component';

@NgModule({
  declarations: [OpenStrategiesGridComponent, PlannedTradesGridComponent, PlannedTradeDialogComponent, StrategyActionTextDialogComponent],
  imports: [
    CommonModule
  ]
})
export class TradePlanModule { }
