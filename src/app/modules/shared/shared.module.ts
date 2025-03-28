import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';

import { CommonModule, DatePipe } from '@angular/common';
import { WatchListComponent } from '../watch-list/components/watch-list/watch-list.component';
import { SearchComponent } from '../watch-list/components/search/search.component';
import { OrdersModalComponent } from '../watch-list/components/orders-modal/orders-modal.component';
import { ClickOutsideDirective } from 'src/app/clickOutside';
import { SharedService } from './services/shared.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DashboardComponent } from '../dashboard/components/dashboard.component';
import { CalendarComponent } from '../reports/components/calendar/calendar.component';
import { TradingviewChartComponent } from '../tradingview-chart/tradingview-chart.component';

const modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  DragDropModule
];

const components = [
  WatchListComponent,
  SearchComponent,
  OrdersModalComponent,
  ClickOutsideDirective,
  CalendarComponent,
  TradingviewChartComponent
];
const providers = [
  SharedService,
  DatePipe
];

@NgModule({
  declarations: [
    ...components,
    DashboardComponent,
  ],
  imports: [
    ...modules
  ],
  exports: [
    ...modules,
    ...components,
    DashboardComponent,
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
