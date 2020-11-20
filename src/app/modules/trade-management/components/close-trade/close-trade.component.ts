import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SingleInputModalComponent } from 'src/app/modules/shared/components/modals/single-input-modal/single-input-modal.component';
import { UserStockStatsService } from 'src/app/modules/shared/services/user-stock-stats.service';
import { TradeStrategyService } from '../../services/trade-strategy.service';
import { AddNewTradeComponent } from '../add-trade/add-new-trade.component';


@Component({
  selector: 'app-close-trade',
  templateUrl: '../add-trade/add-new-trade.component.html',
  styleUrls: ['../add-trade/add-new-trade.component.scss']
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

  panelOpenStateOne = false;
  panelOpenStateTwo = false;
  step = 0;

  ngOnInit() {
    this.setState();
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
      data: { title: value }
    });

    dialogRef.afterClosed().subscribe((res) => {

    });
  }

  goForward(moveTwoSteps?, mobileView?) {
    let stepper = mobileView ? this.tradeMobileStepper : this.tradeStepper;
    if (stepper && !moveTwoSteps) {
      stepper.next();
    } else if (stepper && moveTwoSteps) {
      stepper.next(); stepper.next();
    }
  }

}
