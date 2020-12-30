import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerformanceComponent } from './components/performance/performance.component';
import { ReportsitemsComponent } from './components/reportsitems/reportsitems.component';
import { RiskmanagementComponent } from './components/riskmanagement/riskmanagement.component';
import { CommissionsComponent } from './components/commissions/commissions.component';
import { DisciplineComponent } from './components/discipline/discipline.component';

@NgModule({
  declarations: [PerformanceComponent, ReportsitemsComponent, RiskmanagementComponent, CommissionsComponent, DisciplineComponent],
  imports: [
    CommonModule
  ]
})
export class ReportsModule { }
