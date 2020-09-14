import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { UtilitiesModule } from '../Utilities/utilities.module';
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
import { EditTradeComponent } from './components/edit-trade/edit-trade.component';
import { ExitRulesComponent } from './components/exit-rules/exit-rules.component';
import { UpdateStrategyPopupComponent } from './modalAsComponents/update-strategy-popup/update-strategy-popup.component';
import { ManagerulesComponent } from './components/managerules/managerules.component';
import { UpdatePriceRangeComponent } from './modalAsComponents/update-price-range/update-price-range.component';
import { SingleInputModalComponent } from './modalAsComponents/single-input-modal/single-input-modal.component';
import { ManageRulePopupComponent } from './modalAsComponents/manage-rule-popup/manage-rule-popup.component';
import { AddnewtradeplanComponent } from './components/addnewtradeplan/addnewtradeplan.component';
import { TradePlansComponent } from './components/trade-plans/trade-plans.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RiskAnalysisComponent } from './components/risk-analysis/risk-analysis.component';
import { TradeSearchComponent } from './components/add-new-trade/Steps/search-trade/trade-search.component';

import { 
  MatDatepickerModule,
  MatNativeDateModule,
  MatInputModule
} from '@angular/material';
import { EditTradeDetailsComponent } from './components/edit-trade-details/edit-trade-details.component';
import { AddToPositionPopupComponent } from './components/edit-trade/add-to-position-popup/add-to-position-popup.component';
import { AddToStockPositionPopupComponent } from './components/edit-trade/add-to-stock-position-popup/add-to-stock-position-popup.component';
import { ReduceToPositionPopupComponent } from './components/edit-trade/reduce-to-position-popup/reduce-to-position-popup.component';
import { ReduceToStockPositionPopupComponent } from './components/edit-trade/reduce-to-stock-position-popup/reduce-to-stock-position-popup.component';
import { CloseTradeDetailsComponent } from './components/close-trade/close-trade-details/close-trade-details.component';
import { TradeDetailsHeaderComponent } from './components/common/trade-details-header/trade-details-header.component';

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
    TradeSearchComponent,
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
    EditTradeComponent,
    ExitRulesComponent,
    UpdateStrategyPopupComponent,
    ManagerulesComponent,
    UpdatePriceRangeComponent,
    SingleInputModalComponent,
    ManageRulePopupComponent,
    AddnewtradeplanComponent,
    TradePlansComponent,
    ProfileComponent,
    RiskAnalysisComponent,
    EditTradeDetailsComponent,
    AddToPositionPopupComponent,
    AddToStockPositionPopupComponent,
    ReduceToPositionPopupComponent,
    ReduceToStockPositionPopupComponent,
    CloseTradeDetailsComponent,
    TradeDetailsHeaderComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    UtilitiesModule,
    MatNativeDateModule,
    MatInputModule,
    MatDatepickerModule
  ],
  entryComponents: [
    AddTradeConfirmationPopupComponent,
    UpdateStrategyPopupComponent,
    UpdatePriceRangeComponent,
    SingleInputModalComponent,
    ManageRulePopupComponent,
    AddToPositionPopupComponent,
    AddToStockPositionPopupComponent,
    ReduceToPositionPopupComponent,
    ReduceToStockPositionPopupComponent
  ]
})
export class DashboardModule { }
