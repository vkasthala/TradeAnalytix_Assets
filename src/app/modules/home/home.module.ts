import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatCheckboxModule, MatDatepickerModule, MatInputModule, MatListModule, MatNativeDateModule, MatProgressSpinnerModule, MatRadioModule, MatTooltipModule
} from '@angular/material';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ChartModule } from 'angular-highcharts';
import { CompareStrategiesChartComponent } from '../compare-strategies/components/compare-strategies-chart/compare-strategies-chart.component';
import { CompareStrategiesComponent } from '../compare-strategies/components/compare-strategies.component';
import { StrategyDetailsComponent } from '../compare-strategies/components/strategy-details/strategy-details.component';
import { UpdatePriceRangeComponent } from '../compare-strategies/components/update-price-range/update-price-range.component';
import { UpdateStrategyPopupComponent } from '../compare-strategies/components/update-strategy-popup/update-strategy-popup.component';
import { RealizedReturnChartComponent } from '../dashboard/charts/realized-return-chart/realized-return-chart.component';
import { ReturnsCalendarChartComponent } from '../dashboard/charts/returns-calendar-chart/returns-calendar-chart.component';
import { RiskByAssetChartComponent } from '../dashboard/charts/risk-by-asset-chart/risk-by-asset-chart.component';
import { UserGoalsByDateChartComponent } from '../dashboard/charts/user-goals-by-date/user-goals-by-date.component.';
import { DashboardComponent } from '../dashboard/components/dashboard.component';
import { KeyInsightsComponent } from '../dashboard/components/key-insights/key-insights.component';
import { DefaultDashboardComponent } from '../default-dashboard/default-dashboard.component';
import { EconomicCalendarComponent } from '../economic-calendar/economic-calendar.component';
import { ImportTradePopupComponent } from '../import-trades-history/import-trade-popup/import-trade-popup.component';
import { ImportTradesHistory } from '../import-trades-history/import-trades-history';
import { ImportTradesComponent } from '../import-trades/components/import-trades.component';
import { NotificationsComponent } from '../notifications/notifications.component';
import { CalendarComponent } from '../reports/components/calendar/calendar.component';
import { CommissionsComponent } from '../reports/components/commissions/commissions.component';
import { DisciplineComponent } from '../reports/components/discipline/discipline.component';
import { GoalsComponent } from '../reports/components/goals/goals.component';
import { PerformanceComponent } from '../reports/components/performance/performance.component';
import { PortfolioComponent } from '../reports/components/portfolio/portfolio.component';
import { ReportChartComponent } from '../reports/components/report-chart/report-chart.component';
import { ReportSummaryComponent } from '../reports/components/report-summary/report-summary.component';
import { ReportsRulesComponent } from '../reports/components/reports-rules/reports-rules.component';
import { ReportsComponent } from '../reports/components/reports.component';
import { ReportsitemsComponent } from '../reports/components/reportsitems/reportsitems.component';
import { RiskmanagementComponent } from '../reports/components/riskmanagement/riskmanagement.component';
import { RiskAnalysisChartComponent } from '../risk-analysis/components/risk-analysis-chart/risk-analysis-chart.component';
import { RiskAnalysisComponent } from '../risk-analysis/components/risk-analysis.component';
import { UpdateStockPricePopupComponent } from '../risk-analysis/components/update-stock-price-popup/update-stock-price-popup.component';
import { RulesComponent } from '../rules/components/rules.component';
import { CodedRulesComponent } from '../settings/components/coded-rules/codedrules.component';
import { DatasetupComponent } from '../settings/components/datasetup/datasetup.component';
import { DepositswithdrawalsComponent } from '../settings/components/depositswithdrawals/depositswithdrawals.component';
// import { MatTableDataSource } from '@angular/material';
import { InvestmentGoalsComponent } from '../settings/components/investmentgoals/investmentgoals.component';
import { ManageRulePopupComponent } from '../settings/components/managerules/manage-rule-popup/manage-rule-popup.component';
import { ManagerulesComponent } from '../settings/components/managerules/managerules.component';
import { SettingsComponent } from '../settings/components/settings.component';
import { AddToPositionComponent } from '../shared/components/modals/add-to-position/add-to-position.component';
import { AddToStockPositionComponent } from '../shared/components/modals/add-to-stock-position/add-to-stock-position.component';
import { ConfirmDialogComponent } from '../shared/components/modals/confirm-dialog/confirm-dialog.component';
import { ReduceToPositionComponent } from '../shared/components/modals/reduce-to-position/reduce-to-position.component';
import { ReduceToStockPositionComponent } from '../shared/components/modals/reduce-to-stock-position/reduce-to-stock-position.component';
import { SingleInputModalComponent } from '../shared/components/modals/single-input-modal/single-input-modal.component';
import { StrategySelectionComponent } from '../shared/components/modals/strategy-selection/strategy-selection.component';
import { TradeExecutionDateComponent } from '../shared/components/modals/trade-execution-date/trade-execution-date.component';
import { EditableGridComponent } from '../shared/components/widgets/editable-grid/editable-grid.component';
import { EditableListComponent } from '../shared/components/widgets/editable-list/editable-list.component';
import { AddNewTradeComponent } from '../trade-management/components/add-trade/add-new-trade.component';
import { AddTradeConfirmationPopupComponent } from '../trade-management/components/add-trade/add-trade-confirmation-popup/add-trade-confirmation-popup.component';
import { RuleCommentDialogComponent } from '../trade-management/components/add-trade/rule-comment-dialog/rule-comment-dialog.component';
import { EditableSelectComponent } from '../trade-management/components/add-trade/Steps/editable-select/editable-select.component';
import { EntryRulesComponent } from '../trade-management/components/add-trade/Steps/entry-rules/entry-rules.component';
import { ExitRulesComponent } from '../trade-management/components/add-trade/Steps/exit-rules/exit-rules.component';
import { MobileEntryRulesComponent } from '../trade-management/components/add-trade/Steps/mobile-steps/mobile-entry-rules/mobile-entry-rules.component';
import { MobileRiskAnalysisComponent } from '../trade-management/components/add-trade/Steps/mobile-steps/mobile-risk-analysis/mobile-risk-analysis.component';
import { MobileRiskManagementComponent } from '../trade-management/components/add-trade/Steps/mobile-steps/mobile-risk-management/mobile-risk-management.component';
import { MobileTradeAnalysisComponent } from '../trade-management/components/add-trade/Steps/mobile-steps/mobile-trade-analysis/mobile-trade-analysis.component';
import { MobileTradeDetailsComponent } from '../trade-management/components/add-trade/Steps/mobile-steps/mobile-trade-details/mobile-trade-details.component';
import { MobileTradeThesisComponent } from '../trade-management/components/add-trade/Steps/mobile-steps/mobile-trade-thesis/mobile-trade-thesis.component';
import { RiskManagementComponent } from '../trade-management/components/add-trade/Steps/risk-management/risk-management.component';
import { TradeSearchComponent } from '../trade-management/components/add-trade/Steps/search-trade/trade-search.component';
import { TradeDetailsComponent } from '../trade-management/components/add-trade/Steps/trade-details/trade-details.component';
import { GenerateChartPopupComponent } from '../trade-management/components/add-trade/Steps/trade-thesis/generate-chart-popup/generate-chart-popup.component';
import { TradeThesisComponent } from '../trade-management/components/add-trade/Steps/trade-thesis/trade-thesis.component';
import { TradeDetailsAsideComponent } from '../trade-management/components/add-trade/trade-details-aside/trade-details-aside.component';
import { TradeDetailsBottomComponent } from '../trade-management/components/add-trade/trade-details-bottom/trade-details-bottom.component';
import { TradingViewComponent } from '../trade-management/components/add-trade/trading-view/trading-view.component';
import { CloseTradeDetailsComponent } from '../trade-management/components/close-trade/close-trade-details/close-trade-details.component';
import { CloseTradeComponent } from '../trade-management/components/close-trade/close-trade.component';
import { EditTradeDetailsComponent } from '../trade-management/components/edit-trade/edit-trade-details/edit-trade-details.component';
import { EditTradeComponent } from '../trade-management/components/edit-trade/edit-trade.component';
import { TradeDetailsHeaderComponent } from '../trade-management/components/trade-details-header/trade-details-header.component';
import { ViewTradeComponent } from '../trade-management/components/view-trade/view-trade.component';
import { AddnewtradeplanComponent } from '../trade-plan/components/add-trade-plan/addnewtradeplan.component';
import { EditTradePlanComponent } from '../trade-plan/components/edit-trade-plan.component';
import { OpenStrategiesGridComponent } from '../trade-plan/components/open-strategies-grid/open-strategies-grid.component';
import { PlannedTradeDialogComponent } from '../trade-plan/components/planned-trade-dialog/planned-trade-dialog.component';
import { PlannedTradesGridComponent } from '../trade-plan/components/planned-trades-grid/planned-trades-grid.component';
import { StrategyActionTextDialogComponent } from '../trade-plan/components/strategy-action-text-dialog/strategy-action-text-dialog.component';
import { TodayExecutedLegsComponent } from '../trade-plan/components/today-executed-legs/today-executed-legs.component';
import { TradePlansComponent } from '../trade-plan/components/trade-plans.component';
import { ViewTradePlanComponent } from '../trade-plan/components/view-trade-plan.component';
import { DraftTradesGrid } from '../trade-strategies/components/draft-trades-grid/draft-trades-grid.component';
import { HistoryGrid } from '../trade-strategies/components/history-grid/history-grid.component';
import { PortfolioGrid } from '../trade-strategies/components/portfolio-grid/portfolio-grid.component';
import { TradeStrategiesGrid } from '../trade-strategies/components/trade-strategies-grid/trade-strategies-grid';
import { TradeStrategiesComponent } from '../trade-strategies/components/trade-strategies.component';
import { ProfileComponent } from '../user-profile/components/profile.component';
import { UtilitiesModule } from '../utilities/utilities.module';
import { HomeComponent } from './components/home.component';
import { RoutingModule } from './routing.module';

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
    PortfolioGrid,
    DraftTradesGrid,
    HistoryGrid,
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
    StrategyDetailsComponent,
    OpenStrategiesGridComponent,
    PlannedTradeDialogComponent,
    PlannedTradesGridComponent,
    StrategyActionTextDialogComponent,
    RuleCommentDialogComponent,
    RealizedReturnChartComponent,
    RiskByAssetChartComponent,
    UserGoalsByDateChartComponent,
    ReturnsCalendarChartComponent,
    ImportTradesHistory,
    CodedRulesComponent,
    NotificationsComponent,
    ViewTradePlanComponent,
    CompareStrategiesChartComponent,
    TradingViewComponent,
    EconomicCalendarComponent,
    GenerateChartPopupComponent,
    TodayExecutedLegsComponent,
    KeyInsightsComponent,
    ImportTradePopupComponent,
    RulesComponent,
    CalendarComponent,
    ReportsRulesComponent,
    StrategySelectionComponent,
    EditableSelectComponent,
    DefaultDashboardComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
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
    MatCheckboxModule,
    MatRadioModule,
    MatProgressSpinnerModule
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
    PortfolioGrid,
    DraftTradesGrid,
    HistoryGrid,
    ConfirmDialogComponent,
    UpdateStockPricePopupComponent,
    StrategyDetailsComponent,
    PlannedTradeDialogComponent,
    StrategyActionTextDialogComponent,
    GenerateChartPopupComponent,
    RuleCommentDialogComponent,
    ImportTradePopupComponent,
    CalendarComponent,
    ReportsRulesComponent,
    StrategySelectionComponent,
    EditableSelectComponent
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
