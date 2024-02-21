import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TradingDashboardComponent } from './trading-dashboard.component';

const routes: Routes = [{
  path: '',
  component: TradingDashboardComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TradingDashboardRoutingModule {}

