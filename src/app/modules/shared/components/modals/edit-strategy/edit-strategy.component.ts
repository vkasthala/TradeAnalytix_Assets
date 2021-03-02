import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserStockSummary } from '../../../models/trade-management/user-stock-summary.model';
import { OptionEntry } from '../../../models/trade-management/option-entry.model';

import { StockEntry } from '../../../models/trade-management/stock-entry.model';


@Component({
  selector: 'app-edit-strategy',
  templateUrl: './edit-strategy.component.html',
  styleUrls: ['./edit-strategy.component.scss']
})
export class EditStrategyComponent implements OnInit {
  stockSummary: UserStockSummary = new UserStockSummary();
  stockEntry: StockEntry;
  stockOptions = [
    {
      'contracts':10, 'daysLeft':23, 'impliedVolatility':35
    },
    {
      'contracts':6, 'daysLeft':27, 'impliedVolatility':28
    },
    {
      'contracts':2, 'daysLeft':13, 'impliedVolatility':17
    }
  ];

  constructor(
    public dialogRef: MatDialogRef<EditStrategyComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { 
    this.stockEntry = this.createStockEntry();
  }

  ngOnInit() {
  }
  closeModal() {
    this.dialogRef.close();
  }

  createStockEntry(): StockEntry {
    let stockEntry: StockEntry = new StockEntry();
    stockEntry.price = this.stockSummary.close;
    stockEntry.lowerBound = -10;
    stockEntry.upperBound = 10;
    stockEntry.riskFreeRate = 6;
    stockEntry.actionType = null;
    return stockEntry;
  }

  increaseContracts(index) {
    let stock = this.stockOptions[index];
    if (stock.contracts > 0 && stock.contracts < 731) {
      stock.contracts++;
    }
  }

  decreaseContracts(index) {
    let stock = this.stockOptions[index];
    if (stock.contracts > 0 && stock.contracts < 731) {
      stock.contracts--;
    }
  }
  
  increaseDaysLeft(index) {
    let stock = this.stockOptions[index];
    if (stock.daysLeft >= 0 && stock.daysLeft < 731) {
      stock.daysLeft++;
    }
  }
  decreaseDaysLeft(index) {
    let stock = this.stockOptions[index];
    if (stock.daysLeft > 0 && stock.daysLeft < 731) {
      stock.daysLeft--;
    }
  }
  increaseImpliedValue(index) {
    let stock  = this.stockOptions[index];
    if (stock.impliedVolatility > 1 && stock.impliedVolatility < 501) {
      stock.impliedVolatility++;
    }
  }
  decreaseImpliedValue(index) {
    let stock  = this.stockOptions[index];
    if (stock.impliedVolatility > 1 && stock.impliedVolatility < 501) {
      stock.impliedVolatility--;
    }
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
    public mousedown(operations, index?) {
    this.timeoutHandler = setInterval(() => {
      switch (operations) {
        case 'increaseContracts': this.increaseContracts(index); break;
        case 'decreaseContracts': this.decreaseContracts(index); break;
        case 'decreaseDaysLeft': this.decreaseDaysLeft(index); break;
        case 'increaseDaysLeft': this.increaseDaysLeft(index); break;
        case 'decreaseImpliedValue': this.decreaseImpliedValue(index); break;
        case 'increaseImpliedValue': this.increaseImpliedValue(index); break;
      }
      this.name += 1;
    }, 100);
  }

}
