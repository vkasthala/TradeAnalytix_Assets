import { Component, OnInit, ViewChild } from '@angular/core';
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

import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { DateAdapter } from '@angular/material';
import { IMyDateRangeModel, IMyDrpOptions } from 'mydaterangepicker';
import * as _moment from 'moment';
import { EconomicDialogComponent } from '../economic-dialog/economic-dialog.component';
import { SettingsService } from 'src/app/modules/settings/services/settings.service';
const moment = _moment;

@Component({
  selector: 'app-addnewtradeplan',
  templateUrl: './addnewtradeplan.component.html',
  styleUrls: ['./addnewtradeplan.component.scss']
})
export class AddnewtradeplanComponent implements OnInit {
  protected add = true;
  protected edit = false;
  protected view = false;
  protected isDemoMode = false;
  showMmydaterange:boolean=false;

  tradePlanId: number = 0;
  day: string;
  planDate;
  marketStatuses: MarketStatus[];
  mindsetTypes: MindsetType[];

  tradePlan: TradePlan = new TradePlan();

  @ViewChild('tradeMobileStepper', { static: false }) private tradeMobileStepper: MatStepper;
  @ViewChild('tradeStrategiesGrid', { static: false }) protected tradeStrategiesGrid: OpenStrategiesGridComponent;
  @ViewChild('plannedTradesGrid', { static: false }) protected plannedTradesGrid: PlannedTradesGridComponent;

  planDates: any= ['Nov 18, 2022','Nov 17, 2022','Nov 16, 2022','Nov 15, 2022','Nov 14, 2022','Nov 13, 2022','Nov 12, 2022','Nov 11, 2022','Nov 10, 2022','Nov 9, 2022','Nov 8, 2022','Nov 7, 2022','Nov 6, 2022','Nov 5, 2022','Nov 4, 2022' ]

  constructor(
    protected _dialog: MatDialog,
    protected router: Router,
    protected metadataService: UserMetadataService,
    protected tradePlanService: TradePlansService,
    protected toastr: ToastrService,
    protected demoService: DemoModeDetailsService,
    private dateAdapter: DateAdapter<Date>,
    private settingsService: SettingsService,
  ) {
    this.initState();
  }

  ngOnInit() {
    this.loadMetadata();
  }

  loadTradePlanData() {
    this.tradePlanService.getTradePlanData(this.tradePlanId).subscribe(result => {
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
    if (this.tradePlanId > 0) {
      console.log('here..');
      this.loadTradePlanData();
    }
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

  loadMetadata() {
    this.metadataService.getMindsetTypes().subscribe(result => {
      this.mindsetTypes = result;
    });

    this.tradePlanService.getMarketStatusValues().subscribe(result => {
      this.marketStatuses = result;
    });

  }

  addTradePlan() {
    let tradePlan: TradePlan = this.createTradePlan();
    tradePlan.statusId = 1;
    console.log('trade plan to be created: ', tradePlan);
    this.tradePlanService.createTradePlan(tradePlan).subscribe(result => {
      this.toastr.success('Trade plan created', 'Success');
      this.router.navigate(['/trade-plans']);
    }, () => {
      this.toastr.error("Failed to create trade plan for the day", 'Error', 
      { 
        tapToDismiss:false,
        closeButton:true,
        disableTimeOut: true
      })
    });
  }

  submitTradePlan() {
    let tradePlan: TradePlan = this.createTradePlan();
    tradePlan.statusId = 2;
    console.log('trade plan to be updated: ', tradePlan);
    this.tradePlanService.updateTradePlan(tradePlan).subscribe(result => {
      this.toastr.success('Trade plan updated', 'Success');
      this.router.navigate(['/trade-plans']);
    });
  }

  createTradePlan(): TradePlan {
    this.tradePlan.tradePlanStrategies = this.tradeStrategiesGrid.getOpenStrategies();
    this.tradePlan.plannedTrades = this.plannedTradesGrid.getPlannedTrades();
    this.tradePlan.tradeItemsPlanned = this.getPlannedTradeSymbols(this.tradePlan.plannedTrades);
    return this.tradePlan;
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
    let xx = ((document.getElementById('tradePlanDate') as HTMLInputElement).value)
    this.planDates.unshift(xx);
    (document.getElementById('tradePlanDate') as HTMLInputElement).value = '';
    this.planDate = null;
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
    dateFormat: 'dd.mm.yyyy',
    editableDateRangeField: false,
    ariaLabelInputField: 'Date'
  };

  mydaterangeOpen() {
    this.showMmydaterange = !this.showMmydaterange;
  }
  
  onDateRangeChanged(event: IMyDateRangeModel) {
    console.log('date change: ', event);
    let filter;
    
    if (event.beginJsDate && event.endJsDate) {
      filter.fromDate = event.beginDate.year + '-' + event.beginDate.month + '-' + event.beginDate.day;
      filter.toDate = event.endDate.year + '-' + event.endDate.month + '-' + event.endDate.day;
    } else {
      filter.fromDate = undefined;
      filter.toDate = undefined;
    }
    console.log('trade plans filter after date range: ', filter);
  }

  addEntryExitRule(title, btnText) {
    const dialogRef = this._dialog.open(ManageRulePopupComponent, {
      disableClose: true,
      width: 'auto',
      data : {
        title: title,
        btnText: btnText,
        isDemoMode:this.isDemoMode,
        formData:''
      }
    });
    
    dialogRef.afterClosed().subscribe((res) => {
      this.settingsService.saveEntryExitRule(res).subscribe(data => {
        this.toastr.success('Manual rule added', 'Success');
        // this.loadPage();
      }, err => {
        this.toastr.error('Failed to add entry exit rule', 'Error', 
        { 
          tapToDismiss:false,
          closeButton:true,
          disableTimeOut: true
        });
      });
    });
  
  }

}
