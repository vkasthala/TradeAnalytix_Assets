import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerformanceComponent } from './components/performance/performance.component';
import { ReportsitemsComponent } from './components/reportsitems/reportsitems.component';

@NgModule({
  declarations: [PerformanceComponent, ReportsitemsComponent],
  imports: [
    CommonModule
  ]
})
export class ReportsModule { }
