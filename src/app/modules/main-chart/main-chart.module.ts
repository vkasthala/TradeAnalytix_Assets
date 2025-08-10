import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MainChartComponent } from './main-chart.component';
import { SharedModule } from '../shared/shared.module';
import { MainChartRoutingModule } from './main-chart-routing-module';

@NgModule({
  declarations: [MainChartComponent],
  imports: [
    CommonModule,
    SharedModule,
    MainChartRoutingModule

  ]
})
export class MainChartModule { }