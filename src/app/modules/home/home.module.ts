import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDatepickerModule,
  MatNativeDateModule,
  MatInputModule,
  MatTooltipModule,
  MatListModule,
  MatCheckboxModule

} from '@angular/material';
import { TradeStrategiesComponent } from '../trade-strategies/components/trade-strategies.component';
import { DashboardComponent } from '../dashboard/components/dashboard.component';
import { HomeComponent } from './components/home.component';
import { AddNewTradeComponent } from '../trade-management/components/add-trade/add-new-trade.component';
import { ImportTradesComponent } from '../import-trades/components/import-trades.component';
import { CompareStrategiesComponent } from '../compare-strategies/components/compare-strategies.component';
import { ReportsComponent } from '../reports/components/reports.component';
import { SettingsComponent } from '../settings/components/settings.component';
import { TradeDetailsComponent } from '../trade-management/components/add-trade/Steps/trade-details/trade-details.component';
import { TradeSearchComponent } from '../trade-management/components/add-trade/Steps/search-trade/trade-search.component';
import { TradeThesisComponent } from '../trade-management/components/add-trade/Steps/trade-thesis/trade-thesis.component';
import { RiskManagementComponent } from '../trade-management/components/add-trade/Steps/risk-management/risk-management.component';
import { EntryRulesComponent } from '../trade-management/components/add-trade/Steps/entry-rules/entry-rules.component';
import { AddTradeConfirmationPopupComponent } from '../trade-management/components/add-trade/add-trade-confirmation-popup/add-trade-confirmation-popup.component';
import { MobileEntryRulesComponent } from '../trade-management/components/add-trade/Steps/mobile-steps/mobile-entry-rules/mobile-entry-rules.component';
import { MobileRiskManagementComponent } from '../trade-management/components/add-trade/Steps/mobile-steps/mobile-risk-management/mobile-risk-management.component';
import { MobileTradeDetailsComponent } from '../trade-management/components/add-trade/Steps/mobile-steps/mobile-trade-details/mobile-trade-details.component';
import { MobileTradeThesisComponent } from '../trade-management/components/add-trade/Steps/mobile-steps/mobile-trade-thesis/mobile-trade-thesis.component';
import { MobileRiskAnalysisComponent } from '../trade-management/components/add-trade/Steps/mobile-steps/mobile-risk-analysis/mobile-risk-analysis.component';
import { MobileTradeAnalysisComponent } from '../trade-management/components/add-trade/Steps/mobile-steps/mobile-trade-analysis/mobile-trade-analysis.component';
import { CloseTradeComponent } from '../trade-management/components/close-trade/close-trade.component';
import { EditTradeComponent } from '../trade-management/components/edit-trade/edit-trade.component';
import { ViewTradeComponent } from '../trade-management/components/view-trade/view-trade.component';
import { UpdateStrategyPopupComponent } from '../compare-strategies/components/update-strategy-popup/update-strategy-popup.component';
import { ManagerulesComponent } from '../settings/components/managerules/managerules.component';
import { UpdatePriceRangeComponent } from '../compare-strategies/components/update-price-range/update-price-range.component';
import { SingleInputModalComponent } from '../shared/components/modals/single-input-modal/single-input-modal.component';
import { ManageRulePopupComponent } from '../settings/components/managerules/manage-rule-popup/manage-rule-popup.component';
import { AddnewtradeplanComponent } from '../trade-plan/components/add-trade-plan/addnewtradeplan.component';
import { TradePlansComponent } from '../trade-plan/components/trade-plans.component';
import { ProfileComponent } from '../user-profile/components/profile.component';
import { RiskAnalysisComponent } from '../risk-analysis/components/risk-analysis.component';
import { EditTradeDetailsComponent } from '../trade-management/components/edit-trade/edit-trade-details/edit-trade-details.component';
import { AddToPositionComponent } from '../shared/components/modals/add-to-position/add-to-position.component';
import { AddToStockPositionComponent } from '../shared/components/modals/add-to-stock-position/add-to-stock-position.component';
import { ReduceToPositionComponent } from '../shared/components/modals/reduce-to-position/reduce-to-position.component';
import { ReduceToStockPositionComponent } from '../shared/components/modals/reduce-to-stock-position/reduce-to-stock-position.component';
import { CloseTradeDetailsComponent } from '../trade-management/components/close-trade/close-trade-details/close-trade-details.component';
import { TradeDetailsHeaderComponent } from '../trade-management/components/trade-details-header/trade-details-header.component';
import { TradeDetailsAsideComponent } from '../trade-management/components/add-trade/trade-details-aside/trade-details-aside.component';
import { TradeDetailsBottomComponent } from '../trade-management/components/add-trade/trade-details-bottom/trade-details-bottom.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './routing.module';
import { UtilitiesModule } from '../utilities/utilities.module';
import { TradeExecutionDateComponent } from '../shared/components/modals/trade-execution-date/trade-execution-date.component';

import { TradeStrategiesGrid } from '../trade-strategies/components/trade-strategies-grid/trade-strategies-grid';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { OauthRedirectComponent } from '../utilities/components/oauth-redirect/oauth-redirect.component';
import { RiskAnalysisChartComponent } from '../risk-analysis/components/risk-analysis-chart/risk-analysis-chart.component';
import { ChartModule } from 'angular-highcharts';
import { ConfirmDialogComponent } from '../shared/components/modals/confirm-dialog/confirm-dialog.component';
import { ExitRulesComponent } from '../trade-management/components/add-trade/Steps/exit-rules/exit-rules.component';
// import { MatTableDataSource } from '@angular/material';
import { InvestmentGoalsComponent } from '../settings/components/investmentgoals/investmentgoals.component';
import { DepositswithdrawalsComponent } from '../settings/components/depositswithdrawals/depositswithdrawals.component';
import { DatasetupComponent } from '../settings/components/datasetup/datasetup.component';
import { PerformanceComponent } from '../reports/components/performance/performance.component';
import { PortfolioComponent } from '../reports/components/portfolio/portfolio.component';
import { GoalsComponent } from '../reports/components/goals/goals.component';

import { ReportsitemsComponent } from '../reports/components/reportsitems/reportsitems.component';
import { RiskmanagementComponent } from '../reports/components/riskmanagement/riskmanagement.component';
import { CommissionsComponent } from '../reports/components/commissions/commissions.component';
import { DisciplineComponent } from '../reports/components/discipline/discipline.component';
import { ReportSummaryComponent } from '../reports/components/report-summary/report-summary.component';
import { ReportChartComponent } from '../reports/components/report-chart/report-chart.component';
import { UpdateStockPricePopupComponent } from '../risk-analysis/components/update-stock-price-popup/update-stock-price-popup.component';
import { EditTradePlanComponent } from '../trade-plan/components/edit-trade-plan.component';
import { EditableListComponent } from '../shared/components/widgets/editable-list/editable-list.component';

import { StrategyComparison } from '../strategy-comparison/components/strategy-comparison.component';
import { StrategyDetailsComponent } from '../shared/components/modals/strategy-details/strategy-details.component';
import { EditStrategyComponent } from '../shared/components/modals/edit-strategy/edit-strategy.component';
import { ImportTradesHistory } from '../import-trades-history/import-trades-history';

import { from } from 'rxjs';

import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { EditableGridComponent } from '../shared/components/widgets/editable-grid/editable-grid.component';
import { OpenStrategiesGridComponent } from '../trade-plan/components/open-strategies-grid/open-strategies-grid.component';
import { PlannedTradeDialogComponent } from '../trade-plan/components/planned-trade-dialog/planned-trade-dialog.component';
import { PlannedTradesGridComponent } from '../trade-plan/components/planned-trades-grid/planned-trades-grid.component';
import { StrategyActionTextDialogComponent } from '../trade-plan/components/strategy-action-text-dialog/strategy-action-text-dialog.component';
import { RealizedReturnChartComponent } from '../dashboard/charts/realized-return-chart/realized-return-chart.component';
import { RiskByAssetChartComponent } from '../dashboard/charts/risk-by-asset-chart/risk-by-asset-chart.component';
import { UserGoalsByDateChartComponent } from '../dashboard/charts/user-goals-by-date/user-goals-by-date.component.';
import { ReturnsCalendarChartComponent } from '../dashboard/charts/returns-calendar-chart/returns-calendar-chart.component';
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MMM-YY'
  },
  display: {
    dateInput: 'DD-MMM-YY',
    monthYearLabel: 'DD-MMM-YY',
    dateA11yLabel: 'DD',
    monthYearA11yLabel: 'DD-MMM-YY',
  }
};

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
    ViewTradeComponent,
    ExitRulesComponent,
    UpdateStrategyPopupComponent,
    ManagerulesComponent,
    InvestmentGoalsComponent,
    DepositswithdrawalsComponent,
    DatasetupComponent,
    UpdatePriceRangeComponent,
    SingleInputModalComponent,
    ManageRulePopupComponent,
    AddnewtradeplanComponent,
    TradePlansComponent,
    ProfileComponent,
    RiskAnalysisComponent,
    RiskAnalysisChartComponent,
    EditTradeDetailsComponent,
    AddToPositionComponent,
    AddToStockPositionComponent,
    ReduceToPositionComponent,
    ReduceToStockPositionComponent,
    CloseTradeDetailsComponent,
    TradeDetailsHeaderComponent,
    TradeDetailsAsideComponent,
    TradeDetailsBottomComponent,
    TradeExecutionDateComponent,
    TradeStrategiesGrid,
    ConfirmDialogComponent,
    PerformanceComponent,
    GoalsComponent,
    PortfolioComponent,
    RiskmanagementComponent,
    CommissionsComponent,
    DisciplineComponent,
    ReportsitemsComponent,
    ReportSummaryComponent,
    ReportChartComponent,
    UpdateStockPricePopupComponent,
    EditTradePlanComponent,
    EditableListComponent,
    EditableGridComponent,
    StrategyComparison,
    StrategyDetailsComponent,
    EditStrategyComponent,
    OpenStrategiesGridComponent,
    PlannedTradeDialogComponent,
    PlannedTradesGridComponent,
    StrategyActionTextDialogComponent,
    RealizedReturnChartComponent,
    RiskByAssetChartComponent,
    UserGoalsByDateChartComponent,
    ReturnsCalendarChartComponent,
    ImportTradesHistory
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RoutingModule,
    UtilitiesModule,
    MatNativeDateModule,
    MatInputModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatTableModule,
    MatPaginatorModule,
    ChartModule,
    MatListModule,
    MatCheckboxModule
    // MatTableDataSource
  ],
  entryComponents: [
    AddTradeConfirmationPopupComponent,
    UpdateStrategyPopupComponent,
    UpdatePriceRangeComponent,
    SingleInputModalComponent,
    ManageRulePopupComponent,
    AddToPositionComponent,
    AddToStockPositionComponent,
    ReduceToPositionComponent,
    ReduceToStockPositionComponent,
    TradeExecutionDateComponent,
    TradeStrategiesGrid,
    ConfirmDialogComponent,
    UpdateStockPricePopupComponent,
    StrategyDetailsComponent,
    EditStrategyComponent,
    PlannedTradeDialogComponent,
    StrategyActionTextDialogComponent
  ],
  // bootstrap: [TradeStrategiesGrid],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class HomeModule { }
