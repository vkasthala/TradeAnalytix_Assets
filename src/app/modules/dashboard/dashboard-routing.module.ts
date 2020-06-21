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
