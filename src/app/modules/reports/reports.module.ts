import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerformanceComponent } from './components/performance/performance.component';
import { ReportsitemsComponent } from './components/reportsitems/reportsitems.component';
import { RiskmanagementComponent } from './components/riskmanagement/riskmanagement.component';
import { CommissionsComponent } from './components/commissions/commissions.component';
import { DisciplineComponent } from './components/discipline/discipline.component';
import { ReportTabContentComponent } from './components/report-tab-content/report-tab-content.component';

@NgModule({
  declarations: [PerformanceComponent, ReportsitemsComponent, RiskmanagementComponent, CommissionsComponent, DisciplineComponent, ReportTabContentComponent],
  imports: [
    CommonModule
  ]
})
export class ReportsModule { }
