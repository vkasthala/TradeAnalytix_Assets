import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';
import { TradeExecutionDateComponent } from './components/modals/trade-execution-date/trade-execution-date.component';
import { EditableListComponent } from './components/widgets/editable-list/editable-list.component';
import { EditableGridComponent } from './components/widgets/editable-grid/editable-grid.component';
import { StrategyDetailsComponent } from '../compare-strategies/components/strategy-details/strategy-details.component';
import { DropdownComponent } from './components/widgets/dropdown/dropdown.component';
import { TextboxComponent } from './components/widgets/textbox/textbox.component';
import { DatefieldComponent } from './components/widgets/datefield/datefield.component';
import { TextAreaComponent } from './components/widgets/text-area/text-area.component';
import { SharedService } from './services/shared.service';
import { DragDropModule } from '@angular/cdk/drag-drop';

const modules = [
  CommonModule,
  

]
const components = [
  TradeExecutionDateComponent, 
  EditableListComponent, 
  EditableGridComponent, 
  StrategyDetailsComponent, 
  DropdownComponent, 
  TextboxComponent, 
  DatefieldComponent, 
  TextAreaComponent,
    
  // IndianNumberPipe
];

const providers = [
  // SharedService
];

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    ...modules
  ],
  exports: [
    ...modules,
    ...components,
  ],
  providers: [
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        ...providers,
      ]
    };
  }
}
