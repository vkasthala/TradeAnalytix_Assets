import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import * as fromGlobalConfig from '../../../modules/utilities/reducers/global-config.reducer';
import { Store } from '@ngrx/store';
import { NotificationService } from '../../notifications/services/notification.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  currentRoute: string;
  userdetails: boolean = false;
  isExpand: boolean = true;
  title: string;

  constructor(
    private globalStore: Store<fromGlobalConfig.State>,
    private router: Router,
    private notificationService: NotificationService
  ) {
    let globalSelector = (fromGlobalConfig.globalConfigFeatureKey as any);
    globalStore.select(globalSelector).subscribe(res => {
      this.currentRoute = res.currentRoute;
      this.updateModuleName();
    })
  }

  ngAfterViewInit(): void {
    this.loadNotificationCount();
  }

  ngOnInit() {
  }

  sidebarToggle() {
    this.isExpand = !this.isExpand
  }

  logout() {
    this.router.navigate(['/landing']);
  }

  @HostListener('document:click', ['$event'])
  @HostListener('document:touchstart', ['$event'])
  toggle(event) {
    var target = event.target;
    if (target.closest(".user-details")) {
      this.userdetails = !this.userdetails;
    } else {
      this.userdetails = false;
    }
  }

  get currentNavigation() {
    //console.log('route:', this.currentRoute);
    switch (this.currentRoute) {
      case 'dashboard': return { breadcrumb: 'DASHBOARD', title: 'Dashboard' };
      case 'new-trade': return { breadcrumb: 'ADD NEW TRADE', title: 'Add New Trade' };
      case 'import-trades': return { breadcrumb: 'IMPORT TRADES', title: 'Import Trades' };
      case 'trade-strategies': return { breadcrumb: 'Trade Strategies', title: 'My Trades' };
      case 'compare-strategies': return { breadcrumb: 'COMPARE STRATEGIES', title: 'Compare Strategies' };
      case 'strategy-comparison': return { breadcrumb: 'COMPARE STRATEGIES', title: 'Compare Strategies' };
      case 'reports': return { breadcrumb: 'REPORTS', title: 'Reports' };
      case 'help': return { breadcrumb: 'HELP', title: 'Help' };
      case 'setttings': return { breadcrumb: 'SETTINGS', title: 'Settings' };
      case 'edit-trade': return { breadcrumb: 'Edit TRADE', title: 'Edit Trade' };
      case 'close-trade': return { breadcrumb: 'TRADE STRATEGIES', title: 'Close Trade' };
      case 'exit-rules': return { breadcrumb: 'TRADE STRATEGIES', title: 'Exit Rules' };
      case 'trade-plans': return { breadcrumb: 'TRADING PLAN', title: 'Trade Plan' };
      case 'profile': return { breadcrumb: 'USER PROFILE', title: 'User Profile' };
      case 'risk-analysis': return { breadcrumb: 'RISK ANALYSIS', title: 'Risk Analysis' };
      case 'add-new-trade-plan': return { breadcrumb: 'TRADING PLAN', breadcrumbChild: 'ADD TRADE PLAN', title: 'Add Trade Plan' };
      case 'import-trades-history': return { breadcrumb: 'Import Trades History', title: 'Import Trades History' };
      case 'notifications': return { breadcrumb: 'Notifications', title: 'Notifications' };
      default: return null;
    }
  }

  updateModuleName() {
    let module: any = this.currentNavigation;
    if (module) {
      this.title = module.title;
    }
  }

  loadNotificationCount() {
    this.notificationService.loadNotificationCount();
  }

}
