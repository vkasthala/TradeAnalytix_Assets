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
import { AgGridModule } from 'ag-grid-angular';
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
import { AskForFeatureComponent } from '../dashboard/components/ask-for-feature/ask-for-feature.component';
import { BecomeAnAffiliateComponent } from '../dashboard/components/become-an-affiliate/become-an-affiliate.component';
import { DashboardComponent } from '../dashboard/components/dashboard.component';
import { FindUsersComponent } from '../dashboard/components/find-users/find-users.component';
import { KeyInsightsComponent } from '../dashboard/components/key-insights/key-insights.component';
import { LeaveReviewComponent } from '../dashboard/components/leave-review/leave-review.component';
import { ReportAnIssueComponent } from '../dashboard/components/report-an-issue/report-an-issue.component';
import { SliderModalComponent } from '../dashboard/components/slider-modal/slider-modal.component';
import { ViewFollowersComponent } from '../dashboard/components/view-followers/view-followers.component';
import { EconomicCalendarComponent } from '../economic-calendar/economic-calendar.component';
import { CompareStrategyComponent } from '../help/components/compare-strategy/compare-strategy.component';
import { HelpDataSetupComponent } from '../help/components/data-setup/data-setup.component';
import { GettingStartedComponent } from '../help/components/getting-started/getting-started.component';
import { HelpReportsComponent } from '../help/components/help-reports/help-reports.component';
import { HelpComponent } from '../help/components/help.component';
import { ImportTradeComponent } from '../help/components/import-trade/import-trade.component';
import { HelpRiskAnalysisComponent } from '../help/components/risk-analysis/risk-analysis.component';
import { HelpAddNewTradeComponent } from '../help/components/trade-journal/add-trade/help-add-trade.component';
import { HelpCloseTradeComponent } from '../help/components/trade-journal/clode-trade/clode-trade.component';
import { HelpEditTradeComponent } from '../help/components/trade-journal/edit-trade/help-edit-trade.component';
import { TradeJournalComponent } from '../help/components/trade-journal/trade-journal.component';
import { TradePlaneComponent } from '../help/components/trade-plan/trade-plan.component';
import { TradingRulesComponent } from '../help/components/trading-rules/trading-rules.component';
import { AutoImportTradePopupComponent } from '../import-trades-history/auto-import-trade-popup/auto-import-trade-popup.component';
import { ImportTradePopupComponent } from '../import-trades-history/import-trade-popup/import-trade-popup.component';
import { ImportTradesHistory } from '../import-trades-history/import-trades-history';
import { ZerodhaPopupComponent } from '../import-trades-history/zerodha-popup/zerodha-popup.component';
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
import { AddTradeCanDeactivateGuard } from '../trade-management/components/add-trade.can-deactivate.guard';
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
import { CloseTradeCanDeactivateGuard } from '../trade-management/components/close-trade.can-deactivate.guard';
import { CloseTradeDetailsComponent } from '../trade-management/components/close-trade/close-trade-details/close-trade-details.component';
import { CloseTradeComponent } from '../trade-management/components/close-trade/close-trade.component';
import { EditTradeCanDeactivateGuard } from '../trade-management/components/edit-trade.can-deactivate.guard';
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
import { TradePlansCanDeactivateGuard } from '../trade-plan/components/trade-plans.can-deactivate.guard';
import { TradePlansComponent } from '../trade-plan/components/trade-plans.component';
import { ViewTradePlanComponent } from '../trade-plan/components/view-trade-plan.component';
import { CloseEventEditorComponent } from '../bulk-update/close-event-editor/close-event-editor.component';
import { CloseSourceEditorComponent } from '../bulk-update/close-source-editor/close-source-editor.component';
import { ContrarianEditorComponent } from '../bulk-update/contrarian-editor/contrarian-editor.component';
import { DirectionEditorComponent } from '../bulk-update/direction-editor/direction-editor.component';
import { EventEditorComponent } from '../bulk-update/event-editor/event-editor.component';
import { MindsetEditorComponent } from '../bulk-update/mindset-editor/mindset-editor.component';
import { PlannedEditorComponent } from '../bulk-update/planned-editor/planned-editor.component';
import { SourceEditorComponent } from '../bulk-update/source-editor/source-editor.component';
import { TechnicalIndicatorEditorComponent } from '../bulk-update/technical-indicator-editor/technical-indicator-editor.component';
import { CommunityTradesGrid } from '../trade-strategies/components/community-trades-grid/community-trades-grid.component';
import { DraftTradesGrid } from '../trade-strategies/components/draft-trades-grid/draft-trades-grid.component';
import { HistoryGrid } from '../trade-strategies/components/history-grid/history-grid.component';
import { PortfolioGrid } from '../trade-strategies/components/portfolio-grid/portfolio-grid.component';
import { TradeStrategiesGrid } from '../trade-strategies/components/trade-strategies-grid/trade-strategies-grid';
import { TradeStrategiesComponent } from '../trade-strategies/components/trade-strategies.component';
import { ProfileComponent } from '../user-profile/components/profile.component';
import { UtilitiesModule } from '../utilities/utilities.module';
import { HomeComponent } from './components/home.component';
import { RoutingModule } from './routing.module';
import { BulkUpdateComponent } from '../bulk-update/bulk-update.component';
import { ReferralModalComponent } from '../dashboard/components/referral-modal/referral-modal.component';
import { GettingStartedVideoComponent } from '../dashboard/components/getting-started-modal/getting-started-video.component';
import { ImportTradeBookComponent } from '../dashboard/components/import-tradebook/import-tradebook.component';
import { ConfigureFieldsPopupComponent } from '../shared/components/widgets/configure-fields-popup/configure-fields-popup.component';
import { TextboxComponent } from '../shared/components/widgets/textbox/textbox.component';
import { DropdownComponent } from '../shared/components/widgets/dropdown/dropdown.component';
import { DatefieldComponent } from '../shared/components/widgets/datefield/datefield.component';
import { TextAreaComponent } from '../shared/components/widgets/text-area/text-area.component';
import { JournalPopupComponent } from '../trade-management/components/add-trade/Steps/trade-thesis/journal-popup/journal-popup.component';
import { TradeTagsComponent } from '../trade-management/components/add-trade/Steps/trade-tags/trade-tags.component';
import { UploadFilesComponent } from '../trade-management/components/add-trade/Steps/trade-thesis/upload-files/upload-files.component';
import { TradingRulesPopupComponent } from '../trade-management/components/add-trade/Steps/entry-rules/trading-rules-popup/trading-rules-popup.component';
import { EquityCurveChartComponent } from '../dashboard/charts/equity-curve/equity-curve-chart.component';
import { DailyStatisticsComponent } from '../trade-plan/components/daily-statistics/daily-statistics.component';
import { MetricsComponent } from '../reports/components/metrics/metrics.component';
import { EconomicDialogComponent } from '../trade-plan/components/economic-dialog/economic-dialog.component';
import { TradeBuilderComponent } from '../trade-builder/components/trade-builder.component';
import { TransactionHistoryComponent } from '../shared/components/modals/transaction-history/transaction-history.component';

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
    EquityCurveChartComponent,
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
    AutoImportTradePopupComponent,
    RulesComponent,
    CalendarComponent,
    ReportsRulesComponent,
    StrategySelectionComponent,
    EditableSelectComponent,
    HelpComponent,
    GettingStartedComponent,
    TradeJournalComponent,
    HelpAddNewTradeComponent,
    HelpEditTradeComponent,
    HelpCloseTradeComponent,
    ImportTradeComponent,
    TradePlaneComponent,
    HelpRiskAnalysisComponent,
    CompareStrategyComponent,
    TradingRulesComponent,
    HelpReportsComponent,
    HelpDataSetupComponent,
    SliderModalComponent,
    SourceEditorComponent,
    TechnicalIndicatorEditorComponent,
    MindsetEditorComponent,
    EventEditorComponent,
    CloseSourceEditorComponent,
    CloseEventEditorComponent,
    DirectionEditorComponent,
    ContrarianEditorComponent,
    PlannedEditorComponent,
    ReportAnIssueComponent,
    AskForFeatureComponent,
    LeaveReviewComponent,
    CommunityTradesGrid,
    BecomeAnAffiliateComponent,
    ViewFollowersComponent,
    FindUsersComponent,
    ZerodhaPopupComponent,
    BulkUpdateComponent,
    ReferralModalComponent,
    GettingStartedVideoComponent,
    ImportTradeBookComponent,
    ConfigureFieldsPopupComponent,
    TextboxComponent,
    DropdownComponent,
    DatefieldComponent,
    TextAreaComponent,
    JournalPopupComponent,
    TradeTagsComponent,
    UploadFilesComponent,
    TradingRulesPopupComponent,
    DailyStatisticsComponent,
    MetricsComponent,
    EconomicDialogComponent,
    TradeBuilderComponent,
    TransactionHistoryComponent
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
    MatProgressSpinnerModule,
    AgGridModule.withComponents([BulkUpdateComponent]),
    // MatTableDataSource,
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
    AutoImportTradePopupComponent,
    CalendarComponent,
    ReportsRulesComponent,
    StrategySelectionComponent,
    EditableSelectComponent,
    SliderModalComponent,
    BulkUpdateComponent,
    SourceEditorComponent,
    TechnicalIndicatorEditorComponent,
    MindsetEditorComponent,
    EventEditorComponent,
    CloseSourceEditorComponent,
    CloseEventEditorComponent,
    DirectionEditorComponent,
    ContrarianEditorComponent,
    PlannedEditorComponent,
    ReportAnIssueComponent,
    AskForFeatureComponent,
    LeaveReviewComponent,
    CommunityTradesGrid,
    BecomeAnAffiliateComponent,
    ViewFollowersComponent,
    FindUsersComponent,
    ZerodhaPopupComponent,
    ReferralModalComponent,
    GettingStartedVideoComponent,
    ImportTradeBookComponent,
    ConfigureFieldsPopupComponent,
    TextboxComponent,
    DropdownComponent,
    DatefieldComponent,
    TextAreaComponent,
    JournalPopupComponent,
    TradeTagsComponent,
    UploadFilesComponent,
    TradingRulesPopupComponent,
    DailyStatisticsComponent,
    MetricsComponent,
    EconomicDialogComponent,
    TransactionHistoryComponent
  ],
  // bootstrap: [TradeStrategiesGrid],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    AddTradeCanDeactivateGuard,
    EditTradeCanDeactivateGuard,
    CloseTradeCanDeactivateGuard,
    TradePlansCanDeactivateGuard,
  ],
})
export class HomeModule { }
