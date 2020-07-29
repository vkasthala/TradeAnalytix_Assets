import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatStepper, MatDialog } from '@angular/material';
import { SingleInputModalComponent } from '../../modalAsComponents/single-input-modal/single-input-modal.component';

@Component({
  selector: 'app-close-trade',
  templateUrl: './close-trade.component.html',
  styleUrls: ['./close-trade.component.scss']
})
export class CloseTradeComponent implements OnInit {
  panelOpenStateOne = false;
  panelOpenStateTwo = false;
  step = 0;
  @ViewChild('tradeMobileStepper', { static: false }) private tradeMobileStepper: MatStepper;
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
}
