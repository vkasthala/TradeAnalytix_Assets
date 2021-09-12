import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { PerformanceComponent } from './components/performance/performance.component';
import { ReportsitemsComponent } from './components/reportsitems/reportsitems.component';
import { RiskmanagementComponent } from './components/riskmanagement/riskmanagement.component';
import { GoalsComponent } from './components/goals/goals.component';
import { CommissionsComponent } from './components/commissions/commissions.component';
import { DisciplineComponent } from './components/discipline/discipline.component';
import { ReportTabContentComponent } from './components/report-tab-content/report-tab-content.component';
import { ReportsRulesComponent } from './components/reports-rules/reports-rules.component';

@NgModule({
  declarations: [PortfolioComponent,PerformanceComponent, ReportsitemsComponent, RiskmanagementComponent, GoalsComponent, CommissionsComponent, DisciplineComponent, ReportTabContentComponent, ReportsRulesComponent],
  imports: [
    CommonModule
  ]
})
export class ReportsModule { }
