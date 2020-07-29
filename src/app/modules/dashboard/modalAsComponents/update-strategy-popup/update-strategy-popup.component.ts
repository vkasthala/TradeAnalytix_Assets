import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-update-strategy-popup',
  templateUrl: './update-strategy-popup.component.html',
  styleUrls: ['./update-strategy-popup.component.scss']
})
export class UpdateStrategyPopupComponent implements OnInit {

  strategiesData:any[] = [
    {
      title: 'Sell 355 Jun-19-2020 Call',
      contracts: 10,
      daysLeft: 10,
      impliedValue: 10
    },
    {
      title: 'Sell 355 Jun-19-2020 Call',
      contracts: 10,
      daysLeft: 10,
      impliedValue: 10
    },
    {
      title: 'Sell 355 Jun-19-2020 Call',
      contracts: 10,
      daysLeft: 10,
      impliedValue: 10
    }
  ]
  constructor(
    public dialogRef: MatDialogRef<UpdateStrategyPopupComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
 
  }

  ngOnInit() {
  }

  decreaseContracts(index) {
    let stock = this.strategiesData[index];
      stock.contracts--;
  }

  increaseContracts(index) {
    let stock = this.strategiesData[index];
      stock.contracts++;
    }


  decreaseDaysLeft(index) {
    let stock = this.strategiesData[index];
    if (stock.daysLeft > 0 && stock.daysLeft < 731) {
      stock.daysLeft--;
    }
  }

  increaseDaysLeft(index) {
    let stock = this.strategiesData[index];
    if (stock.daysLeft >= 0 && stock.daysLeft < 731) {
      stock.daysLeft++;
    }
  }

  decreaseImpliedValue(index) {
    let stock = this.strategiesData[index];
    if (stock.impliedValue > 1 && stock.impliedValue < 501) {
      stock.impliedValue--;
    }
  }

  increaseImpliedValue(index) {
    let stock = this.strategiesData[index];
    if (stock.impliedValue > 1 && stock.impliedValue < 501) {
      stock.impliedValue++;
    }
  }

  closeModal() {
    this.dialogRef.close();
  }

  preventNegatives(e, preventDecimal?:boolean) {
    if(preventDecimal) {
      if(!((e.keyCode > 95 && e.keyCode < 106)
      || (e.keyCode > 47 && e.keyCode < 58) 
      || e.keyCode == 8 ||e.keyCode == 17 || e.keyCode == 110)) {
        if(e.keyCode != 190) {
          return false;
        }else {
          return true;
        }
    }
    }else {
      if(!((e.keyCode > 95 && e.keyCode < 106)
      || (e.keyCode > 47 && e.keyCode < 58) 
      || e.keyCode == 8)) {
        if(e.keyCode != 190) {
          return false;
        }else {
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
         case 'decreaseDaysLeft': this.decreaseDaysLeft(index); break;
         case 'increaseDaysLeft': this.increaseDaysLeft(index); break;
         case 'decreaseImpliedValue': this.decreaseImpliedValue(index); break;
         case 'increaseImpliedValue': this.increaseImpliedValue(index); break;
       }
       this.name += 1;
     }, 100);
   }
 
 }

