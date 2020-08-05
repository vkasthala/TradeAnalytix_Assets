import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import * as fromGlobalConfig from '../../../utilities/reducers/global-config.reducer';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currentRoute: string;
  constructor(
    private globalStore: Store<fromGlobalConfig.State>,
    private router: Router
  ) { 
        let globalSelector = (fromGlobalConfig.globalConfigFeatureKey as any);
        globalStore.select(globalSelector).subscribe(res => {
          this.currentRoute = res.currentRoute;
        })
    }

  ngOnInit() {
  }

  logout() {
    this.router.navigate(['/landing']);
  }


  get currentNavigation() {
    switch (this.currentRoute) {
      case 'dashboard': return {breadcrumb : 'DASHBOARD', title: 'DASHBOARD'};
      case 'new-trade': return {breadcrumb : 'ADD NEW TRADE', title: 'ADD NEW TRADE'};
      case 'import-trades': return {breadcrumb : 'IMPORT TRADES', title: 'IMPORT TRADES'};
      case 'trade-strategies': return {breadcrumb : 'TRADE STRATEGIES', title: 'TRADE STRATEGIES'};
      case 'compare-strategies': return {breadcrumb : 'COMPARE STRATEGIES', title: 'COMPARE STRATEGIES'};
      case 'reports': return {breadcrumb : 'REPORTS', title: 'REPORTS'};
      case 'help': return {breadcrumb : 'HELP', title: 'HELP'};
      case 'setttings': return {breadcrumb : 'SETTINGS', title: 'MANAGE RULES'};
      case 'close-trade' : return {breadcrumb : 'TRADE STRATEGIES', title: 'CLOSE TRADE'};
      case 'exit-rules' : return {breadcrumb : 'TRADE STRATEGIES', title: 'EXIT RULES'};
      case 'trade-plans' : return {breadcrumb : 'TRADING PLAN', title: 'TRADE PLAN'};
      case 'profile' : return {breadcrumb : 'USER PROFILE', title: 'USER PROFILE'};
      case 'risk-analysis' : return {breadcrumb : 'RISK ANALYSIS', title: 'RISK ANALYSIS'};
      case 'add-new-trade-plan' : return {breadcrumb : 'TRADING PLAN', breadcrumbChild: 'ADD TRADE PLAN',title: 'ADD TRADE PLAN'};
      default :  return {breadcrumb : 'TRADE STRATEGIES', title: 'TRADE STRATEGIES'};
    }
  }

}
