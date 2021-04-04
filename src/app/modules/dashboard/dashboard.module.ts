import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartModule } from 'angular-highcharts';
import { DashboardChartComponent } from './components/dashboard-chart/dashboard-chart.component';

@NgModule({
  declarations: [DashboardChartComponent],
  imports: [
    CommonModule,
    ChartModule
  ]
})
export class DashboardModule { }