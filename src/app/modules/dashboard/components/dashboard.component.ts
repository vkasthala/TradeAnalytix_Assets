import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarComponent } from '../../reports/components/calendar/calendar.component';
import { ReportSummaryItem } from '../../reports/model/report-summary-item.model';
import { ReportDataService } from '../../reports/services/report-data.service';
import { SummaryRequest } from '../../shared/models/reports/summary-request.model';
import { UserService } from '../../shared/services/user.service';
import { TradePlanGridRow } from '../../trade-plan/models/trade-plan-grid-row.model';
import { TradePlansService } from '../../trade-plan/services/trade-plans.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DemoModeDetailsService } from '../../shared/services/demo-mode-details.service';
import { SliderModalComponent } from './slider-modal/slider-modal.component';
import { ReportAnIssueComponent } from './report-an-issue/report-an-issue.component';
import { AskForFeatureComponent } from './ask-for-feature/ask-for-feature.component';
import { LeaveReviewComponent } from './leave-review/leave-review.component';
import { BecomeAnAffiliateComponent } from './become-an-affiliate/become-an-affiliate.component';

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

  constructor(
    private router: Router, private ref: ChangeDetectorRef, private tradePlanService: TradePlansService, private reportDataService: ReportDataService,
    private userService: UserService,
    private _dialog: MatDialog,
    protected toastr: ToastrService,
    private demoService: DemoModeDetailsService
  ) { }

  ngOnInit() {
    this.loadLatestTradePlan();
    this.loadSummaryItems();
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
        this.summaryItems.forEach(item => {
          if (item.value === undefined || item.value === null) {
            item.value = 'N/A';
          }
        });

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

  getSummaryValue(val) {
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
    });
  }

  MoreStatistics(){
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
    });
  }

}
