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
import { TradeThesisComponent } from './components/add-new-trade/Steps/trade-thesis/trade-thesis.component';
import { RiskManagementComponent } from './components/add-new-trade/Steps/risk-management/risk-management.component';
import { EntryRulesComponent } from './components/add-new-trade/Steps/entry-rules/entry-rules.component';
import { AddTradeConfirmationPopupComponent } from './modalAsComponents/add-trade-confirmation-popup/add-trade-confirmation-popup.component';
import { MobileEntryRulesComponent } from './components/add-new-trade/Steps/mobile-steps/mobile-entry-rules/mobile-entry-rules.component';
import { MobileRiskManagementComponent } from './components/add-new-trade/Steps/mobile-steps/mobile-risk-management/mobile-risk-management.component';
import { MobileTradeDetailsComponent } from './components/add-new-trade/Steps/mobile-steps/mobile-trade-details/mobile-trade-details.component';
import { MobileTradeThesisComponent } from './components/add-new-trade/Steps/mobile-steps/mobile-trade-thesis/mobile-trade-thesis.component';
import { MobileRiskAnalysisComponent } from './components/add-new-trade/Steps/mobile-steps/mobile-risk-analysis/mobile-risk-analysis.component';
import { MobileTradeAnalysisComponent } from './components/add-new-trade/Steps/mobile-steps/mobile-trade-analysis/mobile-trade-analysis.component';
import { CloseTradeComponent } from './components/close-trade/close-trade.component';
import { ExitRulesComponent } from './components/exit-rules/exit-rules.component';
import { UpdateStrategyPopupComponent } from './modalAsComponents/update-strategy-popup/update-strategy-popup.component';
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
    TradeThesisComponent,
    RiskManagementComponent,
    EntryRulesComponent,
    AddTradeConfirmationPopupComponent,
    MobileEntryRulesComponent,
    MobileRiskManagementComponent,
    MobileTradeDetailsComponent,
    MobileTradeThesisComponent,
    MobileRiskAnalysisComponent,
    MobileTradeAnalysisComponent,
    CloseTradeComponent,
    ExitRulesComponent,
    UpdateStrategyPopupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    UtilitiesModule
  ],
  entryComponents: [
    AddTradeConfirmationPopupComponent,
    UpdateStrategyPopupComponent
  ]
})
export class DashboardModule { }
