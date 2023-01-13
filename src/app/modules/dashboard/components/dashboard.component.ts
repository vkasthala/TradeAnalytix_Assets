import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ImportTradePopupComponent } from '../../import-trades-history/import-trade-popup/import-trade-popup.component';
import { Brokerage } from '../../import-trades-history/models/brokerage.model';
import { CalendarComponent } from '../../reports/components/calendar/calendar.component';
import { ReportSummaryItem } from '../../reports/model/report-summary-item.model';
import { ReportDataService } from '../../reports/services/report-data.service';
import { SummaryRequest } from '../../shared/models/reports/summary-request.model';
import { BrokerageService } from '../../shared/services/brokerage.service';
import { DemoModeDetailsService } from '../../shared/services/demo-mode-details.service';
import { UserService } from '../../shared/services/user.service';
import { EconomicDialogComponent } from '../../trade-plan/components/economic-dialog/economic-dialog.component';
import { TradePlanGridRow } from '../../trade-plan/models/trade-plan-grid-row.model';
import { TradePlansService } from '../../trade-plan/services/trade-plans.service';
import { UserComment } from '../models/user-comment.model';
import { DashboardChartService } from '../services/dashboard-chart.service';
import { AskForFeatureComponent } from './ask-for-feature/ask-for-feature.component';
import { BecomeAnAffiliateComponent } from './become-an-affiliate/become-an-affiliate.component';
import { FindUsersComponent } from './find-users/find-users.component';
import { GettingStartedVideoComponent } from './getting-started-modal/getting-started-video.component';
import { LeaveReviewComponent } from './leave-review/leave-review.component';
import { ReportAnIssueComponent } from './report-an-issue/report-an-issue.component';
import { SliderModalComponent } from './slider-modal/slider-modal.component';
import { ViewFollowersComponent } from './view-followers/view-followers.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  @ViewChild('calendarReport', { static: false }) private calendarReport: CalendarComponent;

  latestTradePlan: TradePlanGridRow;

  summaryItems: ReportSummaryItem[];

  userName: string = '';
  checklist: boolean = false;
  demoToggle: boolean = true;
  currentInd: number = 0;
  showMoreMetrics: boolean = false;
  brokerages: Brokerage[] = [];
  selectedbroker: number = 1;

  constructor(
    private router: Router, private ref: ChangeDetectorRef, private tradePlanService: TradePlansService, private reportDataService: ReportDataService,
    private userService: UserService,
    private _dialog: MatDialog,
    protected toastr: ToastrService,
    private demoService: DemoModeDetailsService,
    private dashboardService: DashboardChartService,
    private brokerageService: BrokerageService
  ) { }

  ngOnInit() {
    this.loadLatestTradePlan();
    this.loadSummaryItems();
    this.loadBrokerges();
  }

  ngAfterViewInit(): void {
    const today: Date = new Date();
    this.calendarReport.loadData(today.getFullYear(), today.getMonth() + 1);
    this.loadUserDetails();
  }

  ngAfterContentChecked() {
    this.ref.detectChanges();
  }

  loadLatestTradePlan() {
    this.tradePlanService.getLatestTradePlan().subscribe(result => {
      console.log("latest trade plan:", result);
      if (result) {
        this.latestTradePlan = result;
      }
    });
  }

  loadSummaryItems() {

    this.reportDataService.getReportSummary(this.createSummaryRequest()).subscribe(result => {
      if (result) {
        this.summaryItems = result;

        //Add Volatility of Returns static item //TODO
        /*let volatilityReturn: ReportSummaryItem = new ReportSummaryItem();
        volatilityReturn.name = 'Volatility of Returns';
        volatilityReturn.id = 'volatility_of_returns';
        volatilityReturn.value = '25%';
        this.summaryItems.push(volatilityReturn);*/
      }
      console.log('summary items::', this.summaryItems);
    });
  }

  loadBrokerges() {
    this.brokerageService.getBrokerages().subscribe(result => {
      this.brokerages = result;
      this.selectedbroker = result[0].id;
    });
  }

  createSummaryRequest(): SummaryRequest {
    let summaryRequest: SummaryRequest = new SummaryRequest();
    summaryRequest.summaryType = 'dashboard';
    return summaryRequest;
  }

  getSummaryTextColor(summaryItem: ReportSummaryItem): string {
    let color: string = '#242E3A';
    if (summaryItem.id == 'total_realized_return' || summaryItem.id == 'risk_adjusted_return') {
      let value: number = parseFloat(summaryItem.value);
      if (summaryItem.value && value > 0) {
        color = '#61BC6D';
      } else {
        color = '#E7706C';
      }
    } else if (summaryItem.id == 'win_rate') {
      let value: number = parseFloat(summaryItem.value);
      if (summaryItem.value && value > 80) {
        color = '#61BC6D';
      } else {
        color = '#E7706C';
      }
    }
    return color;
  }

  getSummaryValue(item: ReportSummaryItem) {
    let val: any = item.value;
    if (!val || val === '') {
      val = item.defaultValue;
    }
    if (typeof (val) === 'number') {
      var num: number = +val;
      return Math.round(num);
    }
    return val;
  }

  getValueSuffix(summaryItem: ReportSummaryItem) {
    if (summaryItem.value === undefined || summaryItem.value === null || summaryItem.value === 'N/A') {
      return "";
    }
    let suffix: string = "";
    if (summaryItem.id == 'win_rate') {
      suffix = '%';
    } else if (summaryItem.id == 'risk_adjusted_return') {
      suffix = 'R';
    }
    return suffix;
  }

  addNewTradePlan() {
    this.router.navigate(['/dashboard/add-new-trade-plan']);
  }

  viewAllTradePlans() {
    this.router.navigate(['/dashboard/trade-plans']);
  }

  loadUserDetails() {
    this.userService.getUserDetails().subscribe(details => {
      if (details && details.name) {
        this.userName = details.name;
      }
    });
  }

  showChecklist() {
    this.checklist = !this.checklist;
  }

  showDemoMsg() {
    if (this.demoToggle) {
      this.demoToggle = false;
      this.demoService.setDemoModeStatus(true);
      this.toastr.info('You entered the demo mode. Turn off the toggle switch anytime to exit the demo mode', '');
    } else {
      this.demoToggle = true;
      this.demoService.setDemoModeStatus(false);
      this.toastr.info('You exited the demo mode', '');
    }

    let url: string = this.router.url;
    if (url === '/') {
      url = "/dashboard";
    }
    this.router.navigate([url]);
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

  ReportNow() {
    let dialogData = {
      title: 'Report an Issue',
    };
    const dialogRef = this._dialog.open(ReportAnIssueComponent, {
      disableClose: true,
      width: 'auto',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.dashboardService.reportIssue(this.createUserComment(res)).subscribe(res => {
          this.toastr.info("Issue submitted");
        });
      }
    });
  }

  askFeature() {
    let dialogData = {
      title: 'Ask for a Feature',
    };
    const dialogRef = this._dialog.open(AskForFeatureComponent, {
      disableClose: true,
      width: 'auto',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.dashboardService.createNewFeature(this.createUserComment(res)).subscribe(res => {
          this.toastr.info("New feature request submitted");
        });
      }
    });
  }

  leaveReview() {
    let dialogData = {
      title: 'Leave Review',
    };
    const dialogRef = this._dialog.open(LeaveReviewComponent, {
      disableClose: true,
      width: 'auto',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.dashboardService.createUserReview(this.createUserComment(res)).subscribe(res => {
          this.toastr.info("Your review saved successfully");
        });
      }
    });
  }


  MoreStatistics() {
    this.showMoreMetrics = !this.showMoreMetrics
  }

  BecomeAnAffiliate() {
    let dialogData = {
      title: 'Become an Affiliate',
    };
    const dialogRef = this._dialog.open(BecomeAnAffiliateComponent, {
      disableClose: true,
      width: 'auto',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.dashboardService.createContactUsRequest(this.createUserComment(res)).subscribe(res => {
          this.toastr.info("Your request received, our team will contact you ASAP");
        });
      }
    });
  }

  viewFollowers() {
    let dialogData = {
      title: 'View Followers',
    };
    const dialogRef = this._dialog.open(ViewFollowersComponent, {
      disableClose: true,
      width: 'auto',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe((res) => {
    });
  }

  findUsers() {
    let dialogData = {
      title: 'Find Traders to Follow',
    };
    const dialogRef = this._dialog.open(FindUsersComponent, {
      disableClose: true,
      width: 'auto',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe((res) => {
    });
  }

  private createUserComment(data: any): UserComment {
    let userComment: UserComment = new UserComment();
    userComment.name = data.name;
    userComment.email = data.email;
    userComment.description = data.description;
    userComment.contact = data.contact;
    userComment.postAllowed = data.postAllowed;
    return userComment;
  }

  gettingStartedVideo() {
    let dialogData = {
      title: 'Getting Started',
      videoType: "GettingStarted",
    };
    const dialogRef = this._dialog.open(GettingStartedVideoComponent, {
      panelClass: 'guided-tour-panel',
      backdropClass: 'guided-tour-modal',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe((res) => {
    });
  }

  importTrades() {
    let dialogData = {
      selectedbroker: this.selectedbroker
    }
    const dialogRef = this._dialog.open(ImportTradePopupComponent, {
      disableClose: true,
      width: 'auto',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe((res) => {
      
    });
  }

  openEconomicModal() {
    const dialogRef = this._dialog.open(EconomicDialogComponent, {
      disableClose: false,
      width: 'auto',
      data: {
        title: 'Economic Calendar',
      }
    });
    dialogRef.afterClosed().subscribe((res) => {

    });
  }

}
