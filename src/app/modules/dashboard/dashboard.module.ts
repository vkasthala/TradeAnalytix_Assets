import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartModule } from 'angular-highcharts';
import { DashboardRoutingModule } from './dashboard-routing-module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './components/dashboard.component';

@NgModule({
  imports: [
    ChartModule,
    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }