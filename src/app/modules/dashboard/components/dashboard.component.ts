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
  checklist: boolean=false;
  

  constructor(
    private router: Router, private ref: ChangeDetectorRef, private tradePlanService: TradePlansService, private reportDataService: ReportDataService, 
    private userService: UserService,
    private _dialog: MatDialog,
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
          if(item.value === undefined || item.value === null){
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

  getValueSuffix(summaryItem: ReportSummaryItem) {
    if(summaryItem.value === undefined || summaryItem.value === null || summaryItem.value === 'N/A'){
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

  showChecklist(){
    this.checklist = !this.checklist;
  }

}
