import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { WatchListComponent } from '../watch-list/components/watch-list/watch-list.component';
import { SearchComponent } from '../watch-list/components/search/search.component';
import { OrdersModalComponent } from '../watch-list/components/orders-modal/orders-modal.component';
import { ClickOutsideDirective } from 'src/app/clickOutside';
import { OrdersComponent } from '../orders/orders.component';
import { MainChartComponent } from '../main-chart/main-chart.component';
import { SharedService } from './services/shared.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';

const modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule
];

const components = [
  WatchListComponent,
  SearchComponent,
  OrdersModalComponent,
  ClickOutsideDirective,
  // OrdersComponent  
];
const providers = [
  SharedService
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
