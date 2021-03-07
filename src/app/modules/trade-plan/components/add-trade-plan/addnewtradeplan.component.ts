import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatStepper } from '@angular/material';
import { MatDialog } from '@angular/material';
import { ManageRulePopupComponent } from '../../../settings/components/managerules/manage-rule-popup/manage-rule-popup.component';
import { MarketStatus } from '../../models/market-status.model';
import { MindsetType } from 'src/app/modules/trade-management/models/mindset-type.model';
import { UserMetadataService } from 'src/app/modules/trade-management/services/user-metadata.service';
import { TradePlansService } from '../../services/trade-plans.service';
import { PlannedTrade } from '../../models/planned-trade.model';
import { PlannedTradeDialogComponent } from '../planned-trade-dialog/planned-trade-dialog.component';
import { Subject } from 'rxjs';
import { OpenStrategiesGridComponent } from '../open-strategies-grid/open-strategies-grid.component';
import { PlannedTradesGridComponent } from '../planned-trades-grid/planned-trades-grid.component';
import { TradePlan } from '../../models/trade-plan.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-addnewtradeplan',
  templateUrl: './addnewtradeplan.component.html',
  styleUrls: ['./addnewtradeplan.component.scss']
})
export class AddnewtradeplanComponent implements OnInit {
  protected add = true;
  protected edit = false;
  protected tradePlanId: number = 0;

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
  ) { }

  ngOnInit() {
    this.loadMetadata();
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

    this.router.navigate(['/dashboard/trade-plans'])
  }

  previous() { this.router.navigate(['/dashboard/trade-plans']) }


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
      this.toastr.success('Trade plan successfully created');
    });
  }

  submitTradePlan() {
    let tradePlan: TradePlan = this.createTradePlan();
    tradePlan.statusId = 2;
    console.log('trade plan to be updated: ', tradePlan);
    this.tradePlanService.updateTradePlan(tradePlan).subscribe(result => {
      this.toastr.success('Trade plan successfully submitted');
    });
  }

  createTradePlan(): TradePlan {
    this.tradePlan.tradePlanStrategies = this.tradeStrategiesGrid.getOpenStrategies();
    this.tradePlan.plannedTrades = this.plannedTradesGrid.getPlannedTrades();
    return this.tradePlan;
  }


}
