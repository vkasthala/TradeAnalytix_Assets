import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompareStrategyComponent } from './modules/help/components/compare-strategy/compare-strategy.component';
import { HelpDataSetupComponent } from './modules/help/components/data-setup/data-setup.component';
import { GettingStartedComponent } from './modules/help/components/getting-started/getting-started.component';
import { HelpReportsComponent } from './modules/help/components/help-reports/help-reports.component';
import { HelpComponent } from './modules/help/components/help.component';
import { ImportTradeComponent } from './modules/help/components/import-trade/import-trade.component';
import { HelpRiskAnalysisComponent } from './modules/help/components/risk-analysis/risk-analysis.component';
import { TradeJournalComponent } from './modules/help/components/trade-journal/trade-journal.component';
import { TradePlaneComponent } from './modules/help/components/trade-plan/trade-plan.component';
import { TradingRulesComponent } from './modules/help/components/trading-rules/trading-rules.component';
import { LandingComponent } from './modules/login/components/landing.component';

const routes: Routes = [
  {
    path : '',
    redirectTo: 'landing',
    pathMatch : 'full'
  },
  {
    path: 'landing',
    component : LandingComponent
  },
  {
    path: 'help',
    component : HelpComponent,
    children: [
      {
        path : '',
        component: GettingStartedComponent
      },
      {
        path : 'getting-started',
        component: GettingStartedComponent
      },
      {
        path : 'trade-journal',
        component: TradeJournalComponent
      },
      {
        path : 'import-trade',
        component: ImportTradeComponent
      },
      {
        path : 'trade-plan',
        component: TradePlaneComponent
      },
      {
        path : 'helprisk-analysis',
        component: HelpRiskAnalysisComponent
      },
      {
        path : 'compare-strategy',
        component: CompareStrategyComponent
      },
      {
        path : 'trading-rules',
        component: TradingRulesComponent
      },
      {
        path : 'helpreports',
        component: HelpReportsComponent
      },
      {
        path : 'data-setup',
        component: HelpDataSetupComponent
      },
    ]
  },
  {
    path : '',
    loadChildren : './modules/home/home.module#HomeModule'
  },
  {
    path : '**',
    redirectTo : 'landing',
    pathMatch : 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
