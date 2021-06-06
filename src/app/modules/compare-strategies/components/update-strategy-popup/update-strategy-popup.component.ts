import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CompareStrategyDetails } from '../../models/compare-strategy-details.model';

@Component({
  selector: 'app-update-strategy-popup',
  templateUrl: './update-strategy-popup.component.html',
  styleUrls: ['./update-strategy-popup.component.scss']
})
export class UpdateStrategyPopupComponent implements OnInit {

  strategyDetails: CompareStrategyDetails;

  strategyUid: string;

  constructor(
    public dialogRef: MatDialogRef<UpdateStrategyPopupComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.strategyDetails = data.details;
    this.strategyUid = data.strategyUid;
  }

  ngOnInit() {
  }

  decreaseContracts(index) {
    this.strategyDetails.compareStrategyOptions[index].contracts--;
  }

  increaseContracts(index) {
    this.strategyDetails.compareStrategyOptions[index].contracts++;
  }

  decreaseDaysLeft(index) {
    this.strategyDetails.compareStrategyOptions[index].daysLeft--;
  }

  increaseDaysLeft(index) {
    this.strategyDetails.compareStrategyOptions[index].daysLeft++;
  }

  decreaseImpliedValue(index) {
    this.strategyDetails.compareStrategyOptions[index].impliedVolatility--;
  }

  increaseImpliedValue(index) {
    this.strategyDetails.compareStrategyOptions[index].impliedVolatility++;
  }

  decreaseQuantity() {
    this.strategyDetails.compareStrategyStock.quantity--;
  }

  increaseQuantity() {
    this.strategyDetails.compareStrategyStock.quantity++;
  }

  closeModal() {
    this.dialogRef.close(this.strategyDetails);
  }

  preventNegatives(e, preventDecimal?: boolean) {
    if (preventDecimal) {
      if (!((e.keyCode > 95 && e.keyCode < 106)
        || (e.keyCode > 47 && e.keyCode < 58)
        || e.keyCode == 8 || e.keyCode == 17 || e.keyCode == 110)) {
        if (e.keyCode != 190 && e.keyCode != 46 && e.keyCode != 37 && e.keyCode != 39 && e.keyCode != 9) {
          return false;
        } else {
          return true;
        }
      }
    } else {
      if (!((e.keyCode > 95 && e.keyCode < 106)
        || (e.keyCode > 47 && e.keyCode < 58)
        || e.keyCode == 8)) {
        if (e.keyCode != 190 && e.keyCode != 46 && e.keyCode != 37 && e.keyCode != 39 && e.keyCode != 9) {
          return false;
        } else {
          return true;
        }
      }
    }
  }


  //Code for handling Mouse Hold event
  name: number = 0;
  timeoutHandler;

  public mouseup() {
    if (this.timeoutHandler) {
      clearInterval(this.timeoutHandler);
      this.name = 0;
      this.timeoutHandler = null;
    }
  }

  /*
  * @mousedown 'Requires operation field which is the operation to be performed on mouse hold'
  */
  public mousedown(operations, index?) {
    this.timeoutHandler = setInterval(() => {
      switch (operations) {
        case 'decreaseContracts': this.decreaseContracts(index); break;
        case 'increaseContracts': this.increaseContracts(index); break;
        case 'decreaseQuantity': this.decreaseQuantity(); break;
        case 'increaseQuantity': this.increaseQuantity(); break;
        case 'decreaseDaysLeft': this.decreaseDaysLeft(index); break;
        case 'increaseDaysLeft': this.increaseDaysLeft(index); break;
        case 'decreaseImpliedValue': this.decreaseImpliedValue(index); break;
        case 'increaseImpliedValue': this.increaseImpliedValue(index); break;
      }
      this.name += 1;
    }, 100);
  }

}

