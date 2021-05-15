import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatStepper } from '@angular/material';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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


@Component({
  selector: 'app-addnewtradeplan',
  templateUrl: './addnewtradeplan.component.html',
  styleUrls: ['./addnewtradeplan.component.scss']
})
export class AddnewtradeplanComponent implements OnInit {
  protected add = true;
  protected edit = false;
  tradePlanId: number = 0;

  marketStatuses: MarketStatus[];
  mindsetTypes: MindsetType[];

  tradePlan: TradePlan = new TradePlan();

  @ViewChild('tradeMobileStepper', { static: false }) private tradeMobileStepper: MatStepper;
  @ViewChild('tradeStrategiesGrid', { static: false }) protected tradeStrategiesGrid: OpenStrategiesGridComponent;
  @ViewChild('plannedTradesGrid', { static: false }) protected plannedTradesGrid: PlannedTradesGridComponent;

  constructor(
    protected _dialog: MatDialog,
    protected router: Router,
    protected metadataService: UserMetadataService,
    protected tradePlanService: TradePlansService,
    protected toastr: ToastrService
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
    if (!this.router.getCurrentNavigation()) {
      return;
    }
    let extras: NavigationExtras = this.router.getCurrentNavigation().extras;
    console.log('state---:', extras.state);
    if (extras.state) {
      let state: TradePlanGridRow = <TradePlanGridRow>extras.state;
      this.tradePlanId = state.id;
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
      this.toastr.success('Trade plan added');
      this.router.navigate(['/trade-plans']);
    });
  }

  submitTradePlan() {
    let tradePlan: TradePlan = this.createTradePlan();
    tradePlan.statusId = 2;
    console.log('trade plan to be updated: ', tradePlan);
    this.tradePlanService.updateTradePlan(tradePlan).subscribe(result => {
      this.toastr.success('Trade plan successfully submitted');
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


}
