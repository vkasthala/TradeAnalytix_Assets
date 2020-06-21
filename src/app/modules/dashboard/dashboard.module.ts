import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { AddNewTradeComponent } from './components/add-new-trade/add-new-trade.component';
import { ImportTradesComponent } from './components/import-trades/import-trades.component';
import { TradeStrategiesComponent } from './components/trade-strategies/trade-strategies.component';
import { CompareStrategiesComponent } from './components/compare-strategies/compare-strategies.component';
import { ReportsComponent } from './components/reports/reports.component';
import { SettingsComponent } from './components/settings/settings.component';
import { HelpComponent } from './components/help/help.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilitiesModule } from '../utilities/utilities/utilities.module';
import { TradeDetailsComponent } from './components/add-new-trade/Steps/trade-details/trade-details.component';
import { RiskAnalysisComponent } from './components/add-new-trade/Steps/risk-analysis/risk-analysis.component';
import { TradeThesisComponent } from './components/add-new-trade/Steps/trade-thesis/trade-thesis.component';
import { RiskManagementComponent } from './components/add-new-trade/Steps/risk-management/risk-management.component';
import { EntryRulesComponent } from './components/add-new-trade/Steps/entry-rules/entry-rules.component';
@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    AddNewTradeComponent,
    ImportTradesComponent,
    TradeStrategiesComponent,
    CompareStrategiesComponent,
    ReportsComponent,
    SettingsComponent,
    HelpComponent,
    TradeDetailsComponent,
    RiskAnalysisComponent,
    TradeThesisComponent,
    RiskManagementComponent,
    EntryRulesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    UtilitiesModule
  ]
})
export class DashboardModule { }
