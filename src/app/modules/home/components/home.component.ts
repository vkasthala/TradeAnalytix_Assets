import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import * as fromGlobalConfig from '../../../modules/utilities/reducers/global-config.reducer';
import { Store } from '@ngrx/store';
import { NotificationService } from '../../notifications/services/notification.service';
import { ConfirmDialogComponent } from '../../shared/components/modals/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';
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
  description: string;

  constructor(
    private globalStore: Store<fromGlobalConfig.State>,
    private router: Router,
    private notificationService: NotificationService,
    private _dialog: MatDialog
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
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      width: 'auto',
      height: 'auto',
      data: { 'message': 'Are you sure you want to logout?' }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        this.router.navigate(['/landing']);
      }
    });
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
      case 'dashboard': return { breadcrumb: 'DASHBOARD', title: 'Dashboard', description: 'Dashboard' };
      case 'new-trade': return { breadcrumb: 'ADD NEW TRADE', title: 'Add New Trade', description: 'Enter the stock symbol or name for which trade strategy is being added' };

      case 'import-trades': return { breadcrumb: 'IMPORT TRADES', title: 'Import Trades', description: "Trade history files exported from brokerages can be imported into the system to add trades in bulk. All the files imported into the system are displayed as a list." };

      case 'trade-strategies': return { breadcrumb: 'Trade Strategies', title: 'Portfolio', description: "Trades are segregated by status and displayed as a list. Trades that are not yet executed remain in Draft status. Trades that are executed remain in Open Status. Trades that are fully closed remain in Closed status." };

      case 'compare-strategies': return { breadcrumb: 'COMPARE STRATEGIES', title: 'Compare Strategies', description: "Enter the first few letters of the symbol or company name and choose a stock from the list. Compare up to five trades on that symbol to pick the right trade strategy that’s in line with your risk appetite." };

      case 'strategy-comparison': return { breadcrumb: 'COMPARE STRATEGIES', title: 'Compare Strategies', description: "Enter the first few letters of the symbol or company name and choose a stock from the list. Compare up to five trades on that symbol to pick the right trade strategy that’s in line with your risk appetite" };

      case 'reports': return { breadcrumb: 'REPORTS', title: 'Reports', description: 'Reports' };

      case 'help': return { breadcrumb: 'HELP', title: 'Help', description: 'Help' };

      case 'setttings': return { breadcrumb: 'SETTINGS', title: 'Settings', description: 'Settings' };
      case 'edit-trade': return { breadcrumb: 'Edit TRADE', title: 'Edit Trade', description: 'Dashboard' };

      case 'close-trade': return { breadcrumb: 'TRADE STRATEGIES', title: 'Close Trade', description: 'Close Trade' };

      case 'exit-rules': return { breadcrumb: 'TRADE STRATEGIES', title: 'Exit Rules', description: 'Dashboard' };

      case 'trade-plans': return { breadcrumb: 'TRADING PLAN', title: 'Trade Plan', description: "Trade plans created by the user are segregated by status and displayed as a list. A trade plan would be in Open status when created. Once the user updates the trade plan after market hours, it status would change to Closed." };

      case 'profile': return { breadcrumb: 'USER PROFILE', title: 'User Profile', description: "User Profile" };

      case 'risk-analysis': return { breadcrumb: 'RISK ANALYSIS', title: 'Risk Analysis', description: "Enter the first few letters of the symbol or company name and choose a stock from the list. Build a trade strategy on that stock to analyze its risk and profitability in different scenarios while varying stock price, implied volatility, and days to expiration" };

      case 'add-new-trade-plan': return { breadcrumb: 'TRADING PLAN', breadcrumbChild: 'ADD TRADE PLAN', title: 'Add Trade Plan', description: 'Add Trade Plan' };

      case 'import-trades-history': return { breadcrumb: 'Import Trades', title: 'Import Trades', description: 'Trade history files exported from brokerages can be imported into the system to add trades in bulk. All the files imported into the system are displayed as a list.' };

      case 'rules': return { breadcrumb: 'Rules', title: 'Rules', description: "Manual rules are user-specific rules that show up in the Rules section of a trade when the user adds, edits, or closes a trade. User can review these rules and should manually mark them aligned or not aligned." };

      case 'notifications': return { breadcrumb: 'Notifications', title: 'Notifications', description: 'Notifications' };
      default: return null;
    }
  }

  updateModuleName() {
    let module: any = this.currentNavigation;
    if (module) {
      this.title = module.title;
      this.description = module.description;
    }
  }

  loadNotificationCount() {
    this.notificationService.loadNotificationCount();
  }

}
