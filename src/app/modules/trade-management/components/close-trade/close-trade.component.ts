import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatStepper, MatDialog } from '@angular/material';
import { SingleInputModalComponent } from 'src/app/modules/shared/components/modals/single-input-modal/single-input-modal.component';

@Component({
  selector: 'app-close-trade',
  templateUrl: './close-trade.component.html',
  styleUrls: ['./close-trade.component.scss']
})
export class CloseTradeComponent implements OnInit {
  @ViewChild('stepper', { static: false }) private tradeStepper: MatStepper;
  @ViewChild('tradeMobileStepper', { static: false }) private tradeMobileStepper: MatStepper;
  panelOpenStateOne = false;
  panelOpenStateTwo = false;
  step = 0;
  constructor(private router: Router, private _dialog: MatDialog) { }

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
