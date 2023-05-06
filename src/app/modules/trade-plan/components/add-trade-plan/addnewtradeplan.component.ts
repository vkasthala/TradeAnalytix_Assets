import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatStepper } from '@angular/material';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DemoModeDetailsService } from 'src/app/modules/shared/services/demo-mode-details.service';
import { MindsetType } from 'src/app/modules/trade-management/models/mindset-type.model';
import { UserMetadataService } from 'src/app/modules/trade-management/services/user-metadata.service';
import { ManageRulePopupComponent } from '../../../settings/components/managerules/manage-rule-popup/manage-rule-popup.component';
import { MarketStatus } from '../../models/market-status.model';
import { PlannedTrade } from '../../models/planned-trade.model';
import { TradePlanGridRow } from '../../models/trade-plan-grid-row.model';
import { TradePlan } from '../../models/trade-plan.model';
import { TradePlansService } from '../../services/trade-plans.service';
import { OpenStrategiesGridComponent } from '../open-strategies-grid/open-strategies-grid.component';
import { PlannedTradesGridComponent } from '../planned-trades-grid/planned-trades-grid.component';

import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DateAdapter } from '@angular/material';
import { IMyDate, IMyDateRangeModel, IMyDrpOptions } from 'mydaterangepicker';
import * as _moment from 'moment';
import { EconomicDialogComponent } from '../economic-dialog/economic-dialog.component';
import { SettingsService } from 'src/app/modules/settings/services/settings.service';
import { TradePlanEntry } from '../../models/trade-plan-entry.model';
import { TradePlanStrategy } from '../../models/trade-plan-strategy.model';
import { TodayExecutedTrade } from '../../models/today-executed-trade.model';
import { SummaryRequest } from 'src/app/modules/shared/models/reports/summary-request.model';
import { ReportDataService } from 'src/app/modules/reports/services/report-data.service';
import { TradePlanSummary } from '../../models/trade-plan-summary.model';
import { DailyStatisticsComponent } from '../daily-statistics/daily-statistics.component';
import { TodayExecutedLegsComponent } from '../today-executed-legs/today-executed-legs.component';
import { Subject } from 'rxjs';
import { UserCodedRule } from 'src/app/modules/settings/models/user-coded-rule.model';
import { CodedRuleService } from 'src/app/modules/settings/services/coded-rule.service';
import { ConfirmDialogComponent } from 'src/app/modules/shared/components/modals/confirm-dialog/confirm-dialog.component';
const moment = _moment;

@Component({
  selector: 'app-addnewtradeplan',
  templateUrl: './addnewtradeplan.component.html',
  styleUrls: ['./addnewtradeplan.component.scss']
})
export class AddnewtradeplanComponent implements OnInit, AfterViewInit {
  protected add = true;
  protected edit = false;
  protected view = false;
  protected isDemoMode = false;
  showMmydaterange: boolean = false;

  tradePlanId: number = 0;
  day: string;
  planDate: _moment.Moment;
  marketStatuses: MarketStatus[];
  mindsetTypes: MindsetType[];

  tradePlan: TradePlan = new TradePlan();
  minDate : Date;
  maxDate: Date;


  @ViewChild('tradeMobileStepper', { static: false }) private tradeMobileStepper: MatStepper;
  @ViewChild('openStrategiesGrid', { static: false }) protected tradeStrategiesGrid: OpenStrategiesGridComponent;
  @ViewChild('plannedTradesGrid', { static: false }) protected plannedTradesGrid: PlannedTradesGridComponent;
  @ViewChild('todayExcutedTradesGrid', { static: false }) protected todayExcutedTradesGrid: TodayExecutedLegsComponent;
  @ViewChild('dailyPlanStats', { static: false }) protected dailyPlanStats: DailyStatisticsComponent;

  dataChangeSubject: Subject<void> = new Subject<void>();


  planDates: TradePlanEntry[] = [];
  selectedPlan: TradePlanEntry;

  openStrategies: TradePlanStrategy[] = [];
  executedStrategies: TodayExecutedTrade[] = [];
  plannedTradesDataSource: PlannedTrade[] = [];

  tradeLevelRules=[];
  userCodedRules: UserCodedRule[];
  portfolioLevelRules=[];
  selecedDate:any;

  constructor(
    protected _dialog: MatDialog,
    protected router: Router,
    protected metadataService: UserMetadataService,
    protected tradePlanService: TradePlansService,
    protected toastr: ToastrService,
    protected demoService: DemoModeDetailsService,
    private dateAdapter: DateAdapter<Date>,
    private settingsService: SettingsService,
    private codedRuleService: CodedRuleService,
  ) {
    this.initState();
  }

  ngAfterViewInit(): void {
    this.loadPlanEntries(null);
    this.loadMetadata();
    if (this.selectedPlan) {
      if (this.plannedTradesGrid) {
        this.plannedTradesGrid.initPlannedTradesGrid(this.selectedPlan.id, false);
      }
      if (this.dailyPlanStats) {
        this.dailyPlanStats.loadSummary(this.selectedPlan);
      }
      if (this.tradeStrategiesGrid) {
        this.tradeStrategiesGrid.loadStrategies(this.selectedPlan.id);
      }
      if (this.todayExcutedTradesGrid) {
        this.todayExcutedTradesGrid.loadTodayExecutedLegs(this.selectedPlan.day);
      }
    }
    this.dataChangeSubject.asObservable().subscribe((res) => {
      this.updateTradePlan();
    });
    this.loadCodedRulesData();
  }

  ngOnInit() {
  }

  loadTradePlanData() {
    this.tradePlanService.getTradePlanData(this.selectedPlan.id).subscribe(result => {
      this.tradePlan = result;
    });
  }

  initState(): void {
    this.isDemoMode = this.demoService.demoMode;
    if (!this.router.getCurrentNavigation()) {
      return;
    }
    let extras: NavigationExtras = this.router.getCurrentNavigation().extras;
    console.log('state---:', extras.state);
    if (extras.state) {
      let state: TradePlanGridRow = <TradePlanGridRow>extras.state;
      this.tradePlanId = state.id;
      this.day = state.day;
      console.log('trade pla id: ', this.tradePlanId);
    }
    this.setDateRange();
    // if (this.tradePlanId > 0) {
    //   console.log('here..');
    //   this.loadTradePlanData();
    // }
  }

  setDateRange() {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // set time to midnight
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // set to the next day
    this.minDate = today;
    this.maxDate = tomorrow;
  }

  isWithinTodayOrTomorrow = (date) => {
    return date >= this.minDate && date <= this.maxDate;
  }
  

  addRule(title, btnText) {
    const dialogRef = this._dialog.open(ManageRulePopupComponent, {
      disableClose: true,
      width: 'auto',
      data: {
        title: title,
        btnText: btnText,
        formData: ''
      }
    });

    dialogRef.afterClosed().subscribe((res) => {
    });
  }

  addEntry() {
    this.router.navigate(['/trade-plans'])
  }

  previous() { this.router.navigate(['/trade-plans']) }


  goForward() {
    this.tradeMobileStepper.next();
  }

  loadPlanEntries(selectedDay: string) {
    this.tradePlanService.getTopPlanEntries().subscribe(result => {
      this.planDates = result;
      this.selecedDate = result[0];
      this.initTradePlanSelect(selectedDay);
    });
  }

  loadHoldings() {
    if (this.selectedPlan.id > 0) {
      this.tradePlanService.getTradePlanStrategies(this.selectedPlan.id).subscribe(result => {
        this.openStrategies = result;
      });
    } else {
      this.tradePlanService.getOpenStrategies().subscribe(result => {
        this.openStrategies = result;
      });
    }
  }

  loadTodayTrades() {
    this.tradePlanService.getTodayExecutedTrades(this.selectedPlan.day).subscribe(result => {
      this.executedStrategies = result;
    });
  }

  loadPlannedTrades() {
    if (this.selectedPlan.id > 0) {
      this.tradePlanService.getPlannedTrades(this.tradePlanId).subscribe(result => {
        this.plannedTradesDataSource = result;
      });
    }
  }

  initTradePlanSelect(selectedDay: string) {
    if (this.planDates.length) {
      if (!selectedDay) {
        this.selectedPlan = this.planDates[0];
      } else {
        let filtered: TradePlanEntry[] = this.planDates.filter(date => date.day == selectedDay);
        if (filtered && filtered.length) {
          this.selectedPlan = filtered[0];
        } else {
          this.selectedPlan = this.planDates[0];
        }
      }
    } else {
      this.selectedPlan = undefined;
    }
    this.refreshSelectedPlanData();
  }

  refreshSelectedPlanData() {
    if (this.selectedPlan) {
      this.loadTradePlanData();
      this.loadHoldings();
      if (this.plannedTradesGrid) {
        this.plannedTradesGrid.initPlannedTradesGrid(this.selectedPlan.id, false);
      }
      this.loadTodayTrades();
      if (this.dailyPlanStats) {
        this.dailyPlanStats.loadSummary(this.selectedPlan);
      }
      if (this.tradeStrategiesGrid) {
        this.tradeStrategiesGrid.loadStrategies(this.selectedPlan.id);
      }
      if (this.todayExcutedTradesGrid) {
        this.todayExcutedTradesGrid.loadTodayExecutedLegs(this.selectedPlan.day);
      }
    }
  }

  loadMetadata() {
    this.metadataService.getMindsetTypes().subscribe(result => {
      this.mindsetTypes = result;
    });

    this.tradePlanService.getMarketStatusValues().subscribe(result => {
      this.marketStatuses = result;
    });

  }

  addTradePlan() {
    let plan: TradePlan = this.createTradePlan();
    plan.statusId = 1;
    console.log('trade plan to be created: ', plan);
    this.tradePlanService.createTradePlan(plan).subscribe(result => {
      this.loadPlanEntries(plan.day);
    }, () => {
      this.toastr.error("Failed to create trade plan for the day", 'Error')
    });
  }

  updateTradePlan() {
    this.tradePlan.id = this.selectedPlan.id;
    this.tradePlan.day = this.selectedPlan.day;
    this.tradePlan.statusId = 2;
    console.log('trade plan to be updated: ', this.tradePlan);
    this.tradePlanService.updateTradePlan(this.tradePlan).subscribe(result => {
      this.toastr.success('Trade plan updated', 'Success');
      //this.router.navigate(['/trade-plans']);
    });
  }

  createTradePlan(): TradePlan {
    //this.tradePlan.tradePlanStrategies = this.tradeStrategiesGrid.getOpenStrategies();
    //this.tradePlan.plannedTrades = this.plannedTradesGrid.getPlannedTrades();
    //this.tradePlan.tradeItemsPlanned = this.getPlannedTradeSymbols(this.tradePlan.plannedTrades);
    let plan: TradePlan = new TradePlan();
    plan.day = this.planDate.year() + '-' + (this.planDate.month() + 1) + '-' + this.planDate.date();
    return plan;
  }

  deleteTradePlan(plan: TradePlanEntry) {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      width: 'auto',
      height: 'auto',
      data: { 'message': 'Are you sure you want to delete?' }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        this.tradePlanService.deleteTradePlan(plan.id).subscribe(() => {
          console.log('Trade strategy deleted..', plan.id);
          this.loadPlanEntries(null);
          this.toastr.success("Successfully deleted trade plan")
        }, err => {
          this.toastr.error("Failed to delete trade plan", 'Error')
        });
      }
    });

  }

  getPlannedTradeSymbols(plannedTrades: PlannedTrade[]) {
    let symbols: string = ""
    if (plannedTrades && plannedTrades.length > 0) {
      for (let ind = 0; ind < plannedTrades.length; ind++) {
        if (ind > 0) {
          symbols = symbols + ', ';
        }
        symbols = symbols + plannedTrades[ind].symbol;
      }
    }
    return symbols;
  }

  addTradePlanDate() {
    if (!this.planDate || !this.isWithinTodayOrTomorrow(this.planDate.toDate())) {
      this.toastr.error('Please select valid date', 'Invalid Date');
      return;
    }

    this.addTradePlan();

    /*
    let entry: TradePlanEntry = new TradePlanEntry();
    entry.day = this.planDate.year() + '-' + (this.planDate.month() + 1) + '-' + this.planDate.date();
    entry.id = 0;
    this.planDates.unshift(entry);
    this.selectedPlan = entry;
    this.refreshSelectedPlanData();
    */

    //let xx = ((document.getElementById('tradePlanDate') as HTMLInputElement).value)
    //this.planDates.unshift(xx);
    //(document.getElementById('tradePlanDate') as HTMLInputElement).value = '';
    //this.planDate = null;
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    let dd = moment(event.value);
    (document.getElementById('tradePlanDate') as HTMLInputElement).value = dd.format('MMM DD, YYYY');
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
  myDateRangePickerOptions: IMyDrpOptions = {
    dateFormat: 'mmm dd, yyyy',
    editableDateRangeField: false,
    ariaLabelInputField: 'Date'
  };

  mydaterangeOpen() {
    this.showMmydaterange = !this.showMmydaterange;
  }

  onDateRangeChanged(event: IMyDateRangeModel) {
    console.log('date change: ', event);
    let fromDate;
    let toDate;

    if (event.beginJsDate && event.endJsDate) {
      fromDate = event.beginDate.year + '-' + event.beginDate.month + '-' + event.beginDate.day;
      toDate = event.endDate.year + '-' + event.endDate.month + '-' + event.endDate.day;
    }

    if (fromDate && toDate) {
      this.tradePlanService.getTradePlanEntries(fromDate, toDate).subscribe(result => {
        this.planDates = result;
        this.initTradePlanSelect(null);
      });
    } else {
      this.loadPlanEntries(null);
    }
  }

  onPlanSelect(plan: TradePlanEntry) {
    this.selectedPlan = plan;
    this.selecedDate = plan;
    this.refreshSelectedPlanData();
  }

  addEntryExitRule(title, btnText) {
    const dialogRef = this._dialog.open(ManageRulePopupComponent, {
      disableClose: true,
      width: 'auto',
      data: {
        title: title,
        btnText: btnText,
        isDemoMode: this.isDemoMode,
        formData: ''
      }
    });

    dialogRef.afterClosed().subscribe((res) => {
      this.settingsService.saveEntryExitRule(res).subscribe(data => {
        this.toastr.success('Manual rule added', 'Success');
        // this.loadPage();
      }, err => {
        this.toastr.error('Failed to add entry exit rule', 'Error');
      });
    });

  }

  loadCodedRulesData() {
    this.codedRuleService.getUserCodedRules().subscribe(result => {
      this.userCodedRules = result;
      this.tradeLevelRules=[];
      this.portfolioLevelRules=[];
      this.userCodedRules.forEach((rule, i) => {
        rule.checked = rule.id && rule.id !== null && rule.id > 0;
        this.portfolioLevelRules.push(rule);
      })
    });
  }

}
