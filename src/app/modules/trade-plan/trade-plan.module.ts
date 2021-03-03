import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenStrategiesGridComponent } from './components/open-strategies-grid/open-strategies-grid.component';
import { PlannedTradesGridComponent } from './components/planned-trades-grid/planned-trades-grid.component';

@NgModule({
  declarations: [OpenStrategiesGridComponent, PlannedTradesGridComponent],
  imports: [
    CommonModule
  ]
})
export class TradePlanModule { }
