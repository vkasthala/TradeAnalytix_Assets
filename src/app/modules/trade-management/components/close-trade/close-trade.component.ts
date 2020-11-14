import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatStepper, MatDialog } from '@angular/material';
import { SingleInputModalComponent } from 'src/app/modules/shared/components/modals/single-input-modal/single-input-modal.component';

import { AddNewTradeComponent } from '../add-trade/add-new-trade.component';
import { UserStockStatsService } from 'src/app/modules/shared/services/user-stock-stats.service';
import { TradeStrategyService } from '../../services/trade-strategy.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-close-trade',
  templateUrl: '../add-trade/add-new-trade.component.html',
  styleUrls: ['../add-trade/add-new-trade.component.scss']
  // templateUrl: './close-trade.component.html',
  // styleUrls: ['./close-trade.component.scss']
})
export class CloseTradeComponent extends AddNewTradeComponent implements OnInit {
  constructor(
    userStockStatsService: UserStockStatsService,
    tradeStrategyService: TradeStrategyService,
    router: Router,
    toastr: ToastrService,
    _dialog: MatDialog) {
    super(userStockStatsService, tradeStrategyService, router, toastr, _dialog);
    this.close = true;
    this.edit = false;
    this.add = false;
  }

  @ViewChild('stepper', { static: false }) private tradeStepper: MatStepper;
  @ViewChild('tradeMobileStepper', { static: false }) private tradeMobileStepper: MatStepper;
  panelOpenStateOne = false;
  panelOpenStateTwo = false;
  step = 0;

  ngOnInit() {
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  exitRules() {
    this.router.navigate(['dashboard/exit-rules'])
  }

  navigateToTradeStrategies() {
    this.router.navigate(['/dashboard/trade-strategies'])
  }

  navigaateToExitRules() {
    this.tradeMobileStepper.next();
  }

  navigateToExitThesis() {
    this.tradeMobileStepper.previous();
  }

  addValue(value) {
    const dialogRef = this._dialog.open(SingleInputModalComponent, {
      disableClose: true,
      width: 'auto',
      data : {title: value}
    });

    dialogRef.afterClosed().subscribe((res) => {
      
    });
  }
  goForward(moveTwoSteps?,mobileView?) {
    let stepper = mobileView ? this.tradeMobileStepper : this.tradeStepper;
    if(stepper && !moveTwoSteps) {
      stepper.next();
    }else if(stepper && moveTwoSteps) {
      stepper.next();stepper.next();
    }
  }
}
