import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenStrategiesGridComponent } from './components/open-strategies-grid/open-strategies-grid.component';
import { PlannedTradesGridComponent } from './components/planned-trades-grid/planned-trades-grid.component';
import { PlannedTradeDialogComponent } from './components/planned-trade-dialog/planned-trade-dialog.component';
import { StrategyActionTextDialogComponent } from './components/strategy-action-text-dialog/strategy-action-text-dialog.component';
import { TodayExecutedLegsComponent } from './components/today-executed-legs/today-executed-legs.component';

@NgModule({
  declarations: [OpenStrategiesGridComponent, PlannedTradesGridComponent, PlannedTradeDialogComponent, StrategyActionTextDialogComponent, TodayExecutedLegsComponent],
  imports: [
    CommonModule
  ]
})
export class TradePlanModule { }
