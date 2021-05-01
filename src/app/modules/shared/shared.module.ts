import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TradeExecutionDateComponent } from './components/modals/trade-execution-date/trade-execution-date.component';
import { EditableListComponent } from './components/widgets/editable-list/editable-list.component';
import { EditableGridComponent } from './components/widgets/editable-grid/editable-grid.component';
import { EditStrategyComponent } from './components/modals/edit-strategy/edit-strategy.component';
import { StrategyDetailsComponent } from './components/modals/strategy-details/strategy-details.component';

@NgModule({
  declarations: [TradeExecutionDateComponent, EditableListComponent, EditableGridComponent, EditStrategyComponent, StrategyDetailsComponent],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
