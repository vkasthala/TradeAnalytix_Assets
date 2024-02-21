import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TradingDashboardRoutingModule } from './trading-dashboard-routing-module';
import { TradingDashboardComponent } from './trading-dashboard.component';



@NgModule({
  declarations: [
    TradingDashboardComponent
  ],
  imports: [
    CommonModule,
    TradingDashboardRoutingModule,
    // SharedModule
  ]
})
export class TradingDashboardModule { }
