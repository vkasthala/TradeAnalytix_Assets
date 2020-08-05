import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { AddNewTradeComponent } from './components/add-new-trade/add-new-trade.component';
import { ImportTradesComponent } from './components/import-trades/import-trades.component';
import { TradeStrategiesComponent } from './components/trade-strategies/trade-strategies.component';
import { CompareStrategiesComponent } from './components/compare-strategies/compare-strategies.component';
import { ReportsComponent } from './components/reports/reports.component';
import { SettingsComponent } from './components/settings/settings.component';
import { HelpComponent } from './components/help/help.component';
import { combineLatest } from 'rxjs';
import { CloseTradeComponent } from './components/close-trade/close-trade.component';
import { ExitRulesComponent } from './components/exit-rules/exit-rules.component';
import { AddnewtradeplanComponent } from './components/addnewtradeplan/addnewtradeplan.component';
import { TradePlansComponent } from './components/trade-plans/trade-plans.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RiskAnalysisComponent } from './components/risk-analysis/risk-analysis.component';

const routes: Routes = [
  {
    path : '',
    component : DashboardComponent,
    children: [
        {
          path : '',
          component: HomeComponent
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
          path : 'help',
          component: HelpComponent
        },
        {
          path: 'close-trade/:id',
          component: CloseTradeComponent
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
          path: 'trade-plans',
          component: TradePlansComponent
        },
        {
          path : 'profile',
          component : ProfileComponent
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
export class DashboardRoutingModule { }
