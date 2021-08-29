import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { DashboardComponent } from '../../modules/dashboard/components/dashboard.component';
import { AddNewTradeComponent } from '../../modules/trade-management/components/add-trade/add-new-trade.component';
import { ImportTradesComponent } from '../../modules/import-trades/components/import-trades.component';
import { TradeStrategiesComponent } from '../../modules/trade-strategies/components/trade-strategies.component';
import { CompareStrategiesComponent } from '../../modules/compare-strategies/components/compare-strategies.component';
import { ReportsComponent } from '../../modules/reports/components/reports.component';
import { SettingsComponent } from '../../modules/settings/components/settings.component';
import { CloseTradeComponent } from '../../modules/trade-management/components/close-trade/close-trade.component';
import { EditTradeComponent } from '../../modules/trade-management/components/edit-trade/edit-trade.component';
import { ViewTradeComponent } from '../../modules/trade-management/components/view-trade/view-trade.component';
import { AddnewtradeplanComponent } from '../../modules/trade-plan/components/add-trade-plan/addnewtradeplan.component';
import { EditTradePlanComponent } from '../../modules/trade-plan/components/edit-trade-plan.component';
import { TradePlansComponent } from '../../modules/trade-plan/components/trade-plans.component';
import { ProfileComponent } from '../../modules/user-profile/components/profile.component';
import { RiskAnalysisComponent } from '../../modules/risk-analysis/components/risk-analysis.component';
import { OauthRedirectComponent } from '../utilities/components/oauth-redirect/oauth-redirect.component';
import { ExitRulesComponent } from '../trade-management/components/add-trade/Steps/exit-rules/exit-rules.component';
import { ImportTradesHistory } from '../../modules/import-trades-history/import-trades-history';
import { NotificationsComponent } from '../../modules/notifications/notifications.component';
import { ViewTradePlanComponent } from '../../modules/trade-plan/components/view-trade-plan.component';
import { RulesComponent } from '../rules/components/rules.component';


const routes: Routes = [
  {
    path : '',
    component : HomeComponent,
    children: [
        {
          path : '',
          component: DashboardComponent
        },
        {
          path : 'new-trade',
          component: AddNewTradeComponent
        },
        {
          path : 'import-trades',
          component: ImportTradesComponent
        },
        {
          path : 'risk-analysis',
          component : RiskAnalysisComponent
        },
        {
          path : 'trade-strategies',
          component: TradeStrategiesComponent
        },
        {
          path : 'compare-strategies',
          component: CompareStrategiesComponent
        },
        {
          path : 'reports',
          component: ReportsComponent
        },
        {
          path : 'setttings',
          component: SettingsComponent
        },
        {
          path: 'close-trade/:id',
          component: CloseTradeComponent
        },
        {
          path: 'edit-trade/:id',
          component: EditTradeComponent
        },
        {
          path: 'view-trade/:id',
          component: ViewTradeComponent
        },
        {
          path : 'exit-rules',
          component: ExitRulesComponent
        },
        {
          path: 'add-new-trade-plan',
          component: AddnewtradeplanComponent
        },
        {
          path: 'edit-trade-plan',
          component: EditTradePlanComponent
        },
        {
          path: 'view-trade-plan',
          component: ViewTradePlanComponent
        },
        {
          path: 'trade-plans',
          component: TradePlansComponent
        },
        {
          path : 'profile',
          component : ProfileComponent
        },
        {
          path: 'oauth-redirect',
          component: OauthRedirectComponent
        },
        {
          path: 'strategy-comparison',
          component: CompareStrategiesComponent
        },
        {
          path: 'import-trades-history',
          component: ImportTradesHistory
        },
        {
          path: 'notifications',
          component: NotificationsComponent
        },
        {
          path: 'rules',
          component: RulesComponent
        }
    ]
  },
  {
    path : '**',
    redirectTo : '',
    pathMatch : 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
