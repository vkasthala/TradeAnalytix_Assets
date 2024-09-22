import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
import * as fromGlobalConfig from '../../../modules/utilities/reducers/global-config.reducer';
import { Store } from '@ngrx/store';
import { NotificationService } from '../../notifications/services/notification.service';
import { ConfirmDialogComponent } from '../../shared/components/modals/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { DemoModeDetailsService } from '../../shared/services/demo-mode-details.service';
import { SliderModalComponent } from '../../dashboard/components/slider-modal/slider-modal.component';
import { map } from 'rxjs/operators';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  currentRoute: string;
  userdetails: boolean = false;
  isExpand: boolean = false;
  title: string = '';
  description: string;
  demoToggle: boolean = false;
  mySubscription;
  hamburgerMenu: boolean = false;
  public demoModeIsStarted: boolean = false;
  contactUsModal: boolean = false;
  brokerageModal: boolean = false;
  userDropDown: boolean = false;
  isMobileDevice: any;
  userData: any;
  isBrokerageActive: boolean = false;
  constructor(
    private globalStore: Store<fromGlobalConfig.State>,
    private router: Router,
    private notificationService: NotificationService,
    private _dialog: MatDialog,
    protected toastr: ToastrService,
    private demoService: DemoModeDetailsService,
    public  _activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {
    let globalSelector = (fromGlobalConfig.globalConfigFeatureKey as any);
    globalStore.select(globalSelector).subscribe(res => {
      this.currentRoute = res.currentRoute;
      //this.updateModuleName(res.currentRoute);
      this.title = sessionStorage.getItem('current-module');
      // this.isExpand = 'Bulk Update' === this.title;
    });
    
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      } else if (event instanceof NavigationStart) {
        this.currentRoute = this.identifyCurrentRoute(event.url);
        this.updateModuleName();
      }
      this.hamburgerMenu = false
    });
  }

  ngAfterViewInit(): void {
    this.loadNotificationCount();
  }

  ngOnInit() {
    this.checkDevice();
    this.isBrokerageActive = sessionStorage.getItem('isBrokerageActive') && sessionStorage.getItem('isBrokerageActive') === 'true';
    this.demoToggle = this.demoService.demoMode;
    this._activatedRoute.url.subscribe(console.log);
    let state = this._activatedRoute.paramMap.pipe(map(() => window.history.state ));
    console.log('state', state);

    this._activatedRoute.queryParamMap.subscribe(params => {
      console.log('params', params.get.name);
      //const ss = params.snapshot.queryParamMap;
    });
    this.loadUserDetails()
  }

  loadUserDetails() {
    this.userService.getUserDetails().subscribe(res => {
      if (res && res.name) {
        this.userData = res;
      }
    });
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  sidebarToggle() {
    this.isExpand = !this.isExpand
  }

  logout() {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      width: 'auto',
      height: 'auto',
      data: { 'message': 'Are you sure you want to log out from CueTrade?', 'title':'Exit CueTrade' }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        sessionStorage.clear();
        this.router.navigate(['/landing']);
      }
    });
  }

  logoutFromBrokerage() {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      width: 'auto',
      height: 'auto',
      data: { 'message': 'Are you sure you want to log out from FYERS?', 'title':'Exit FYERS' }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        this.userService.logoutFromBrokerage('FYERS').subscribe(result => {
          if(result){
          sessionStorage.removeItem('isBrokerageActive');
          this.isBrokerageActive = false;
          this.router.navigate(['/landing']);
          }
        }, err => {
          console.log("Error while exiting session "+JSON.stringify(err))
          this.toastr.error('Failed to exit session', 'Error');
        });
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
    // console.log('route:', this.currentRoute);
    switch (this.currentRoute) {
      case 'dashboard': return { breadcrumb: 'Dashboard', title: 'Dashboard', description: '' };
      case 'new-trade': return { breadcrumb: 'ADD NEW TRADE', title: 'Add New Trade', description: 'Enter the stock symbol or name for which trade strategy is being added' };

      case 'import-trades': return { breadcrumb: 'IMPORT TRADES', title: 'Import Trades', description: "Trade history files exported from brokerages can be imported into the system to add trades in bulk. All the files imported into the system are displayed as a list." };

      case 'positions': return { breadcrumb: 'Positions', title: 'Positions', description: "Trades are segregated by status and displayed as a list. Trades that are not yet executed remain in Draft status. Trades that are executed remain in Open Status. Trades that are fully closed remain in Closed status." };

      case 'trade-builder': return { breadcrumb: 'Trade Builder', title: 'Trade Builder', description: "Trades are segregated by status and displayed as a list. Trades that are not yet executed remain in Draft status. Trades that are executed remain in Open Status. Trades that are fully closed remain in Closed status." };

      case 'compare-strategies': return { breadcrumb: 'Strategy Picker', title: 'Strategy Picker', description: "Enter the first few letters of the symbol or company name and choose a stock from the list. Compare up to five trades on that symbol to pick the right trade strategy that’s in line with your risk appetite." };

      case 'strategy-comparison': return { breadcrumb: 'Strategy Picker', title: 'Strategy Picker', description: "Enter the first few letters of the symbol or company name and choose a stock from the list. Compare up to five trades on that symbol to pick the right trade strategy that’s in line with your risk appetite" };

      case 'reports': return { breadcrumb: 'Reports', title: 'Reports', description: 'Reports' };

      case 'help': return { breadcrumb: 'How-To Guides', title: 'How-To Guides', description: 'Help' };

      case 'settings': return { breadcrumb: 'SETTINGS', title: 'Settings', description: 'Settings' };

      case 'edit-trade/': return { breadcrumb: 'Journal Trade', title: 'Journal Trade', description: 'Dashboard' };

      case 'close-trade/': return { breadcrumb: 'TRADE STRATEGIES', title: 'Close Trade', description: 'Close Trade' };

      case 'exit-rules': return { breadcrumb: 'TRADE STRATEGIES', title: 'Exit Rules', description: 'Dashboard' };

      case 'trade-plans': return { breadcrumb: 'Daily Plan', title: 'Daily Plan', description: "Trade plans created by the user are segregated by status and displayed as a list. A trade plan would be in Open status when created. Once the user updates the trade plan after market hours, it status would change to Closed." };

      case 'profile': return { breadcrumb: 'USER PROFILE', title: 'User Profile', description: "User Profile" };

      case 'payoff-analyzer': return { breadcrumb: 'Payoff  Analyzer', title: 'Payoff  Analyzer', description: "Enter the first few letters of the symbol or company name and choose a stock from the list. Build a trade strategy on that stock to analyze its risk and profitability in different scenarios while varying stock price, implied volatility, and days to expiration" };

      case 'add-new-trade-plan': return { breadcrumb: 'TRADING PLAN', breadcrumbChild: 'ADD TRADE PLAN', title: 'Add Trade Plan', description: 'Add Trade Plan' };

      case 'import-trades-history': return { breadcrumb: 'Import Trades', title: 'Import Trades', description: 'Trade history files exported from brokerages can be imported into the system to add trades in bulk. All the files imported into the system are displayed as a list.' };

      case 'rules': return { breadcrumb: 'Trading Rules', title: 'Trading Rules', description: "Manual rules are user-specific rules that show up in the Rules section of a trade when the user adds, edits, or closes a trade. User can review these rules and should manually mark them aligned or not aligned." };

      case 'insights': return { breadcrumb: 'Insights', title: 'Insights', description: 'Insights' };

      case 'bulk-update': return { breadcrumb: 'Bulk Journal', title: 'Bulk Journal', description: 'Bulk Update Journal' };
      default: return { breadcrumb: 'Dashboard', title: 'Dashboard', description: '' };
    }
  }

  updateModuleName() {
    let module: any = this.currentNavigation;
    if (module) {
      this.title = module.title;
      sessionStorage.setItem('current-module', module.title);
      this.description = module.description;
    }
  }

  identifyCurrentRoute(url: string) {
    let route: string;
    if (url.indexOf('/edit-trade/') > -1) {
      route = 'edit-trade/';
    } else if (url.indexOf('/close-trade/') > -1) {
      route = 'close-trade/';
    } else {
      const lastSlashInd = url.lastIndexOf('/');
      route = url.substring(lastSlashInd + 1);
    }
    return route;
  }

  loadNotificationCount() {
    this.notificationService.loadNotificationCount();
  }

  demoMsg() {
    if (this.demoToggle) {
      this.demoService.setDemoModeStatus(true);
      this.toastr.info('You entered the demo mode. Turn off the toggle switch anytime to exit the demo mode', '');
    } else {
      this.demoService.setDemoModeStatus(false);
      this.toastr.info('You exited the demo mode', '');
    }

    let url: string = this.router.url;
    if (url === '/') {
      url = "/dashboard";
    }
    this.router.navigate([url]);
    // this.demoModeIsStarted = !this.demoModeIsStarted;
  }
  
  menuToggle() {
    this.hamburgerMenu = !this.hamburgerMenu
  }

  startTour() {
    this.loadSliderModal();
  }

  loadSliderModal() {
    const dialogRef = this._dialog.open(SliderModalComponent, {
      disableClose: true,
      width: 'auto',
      panelClass: 'guided-tour-panel',
      backdropClass: 'guided-tour-modal'
    });

    dialogRef.afterClosed().subscribe((res) => {
    });
  }

  openContactUsModal() {
    this.contactUsModal= !this.contactUsModal;
  }
  
  closeContactUsModal() {
    this.contactUsModal = !this.contactUsModal;
  }

  showUserDropDown() {
    this.userDropDown = !this.userDropDown
  }

  closeUserDropDownUI(event: any) {
    this.userDropDown = false;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkDevice();
  }

  checkDevice() {
    setTimeout(() => {
      const agent = window.navigator.userAgent.toLowerCase();
      let regexp = /android|iphone|kindle|ipad/i;
      let deviceType = regexp.test(agent);
      if (deviceType) {
        this.isMobileDevice = true;
        if (this.router.url === "/dashboard") {
          this.router.navigate(['/market-watch'])
        }
      } else {
        this.isMobileDevice = false;
        if (this.router.url === "/market-watch") {
          this.router.navigate(['/dashboard'])
        }
      }
    }, 100)

  }

  fyersLogin(){
    this.userService.fyersLogin().subscribe(response => {
      if (response != null) {
        console.log("response");
        const location = response['redirectUri'];
        if (location) {
          window.location.href = location;
        }
      }
    });
  }
  openBrokerageModal() {
    this.brokerageModal= !this.brokerageModal;
  }
  
  closeBrokerageModal() {
    this.brokerageModal = !this.brokerageModal;
  }

  onBrokerageChange(value) {
    if(value === 'FYERS') {
      this.fyersLogin();
    } else {
      this.toastr.info('Only FYERS is supported at present. Stay tuned for more integrations soon!', '');
    }
  }

}
