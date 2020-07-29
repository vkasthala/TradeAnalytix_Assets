import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatStepper } from '@angular/material';
@Component({
  selector: 'app-add-new-trade',
  templateUrl: './add-new-trade.component.html',
  styleUrls: ['./add-new-trade.component.scss']
})
export class AddNewTradeComponent implements OnInit {

  @ViewChild('stepper', { static: false }) private tradeStepper: MatStepper;
  @ViewChild('tradeMobileStepper', { static: false }) private tradeMobileStepper: MatStepper;
  activeStep:boolean;
  stockOptions:any[] = [];
  stockAdded:boolean;
  constructor(private changeRef: ChangeDetectorRef) { }

  ngOnInit() {

  }

  goBack(moveTwoSteps?,mobileView?) {
    let stepper = mobileView ? this.tradeMobileStepper : this.tradeStepper;
    if(stepper && !moveTwoSteps) {
      stepper.previous();
    }else if(stepper && moveTwoSteps) {
      stepper.previous();stepper.previous();
      stepper.selectedIndex = 0;
    }
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
