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

  @ViewChild('tradeMobileStepper', { static: false }) private tradeMobileStepper: MatStepper;

  constructor(
    private _dialog: MatDialog,
    private router: Router,
    protected metadataService: UserMetadataService,
    protected tradePlanService: TradePlansService
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


}
