import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TradeExecutionDateComponent } from './components/modals/trade-execution-date/trade-execution-date.component';
import { EditableListComponent } from './components/widgets/editable-list/editable-list.component';
import { EditableGridComponent } from './components/widgets/editable-grid/editable-grid.component';
import { StrategyDetailsComponent } from '../compare-strategies/components/strategy-details/strategy-details.component';
import { DropdownComponent } from './components/widgets/dropdown/dropdown.component';
import { TextboxComponent } from './components/widgets/textbox/textbox.component';
import { DatefieldComponent } from './components/widgets/datefield/datefield.component';
import { TextAreaComponent } from './components/widgets/text-area/text-area.component';

@NgModule({
  declarations: [TradeExecutionDateComponent, EditableListComponent, EditableGridComponent, StrategyDetailsComponent, DropdownComponent, TextboxComponent, DatefieldComponent, TextAreaComponent],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
