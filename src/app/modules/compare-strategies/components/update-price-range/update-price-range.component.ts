import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-price-range',
  templateUrl: './update-price-range.component.html',
  styleUrls: ['./update-price-range.component.scss']
})
export class UpdatePriceRangeComponent implements OnInit {

  priceStartRange:number = 0;
  priceEndRange:number = 0; 
  constructor(
    public dialogRef: MatDialogRef<UpdatePriceRangeComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
 
  }

  ngOnInit() {
  }

  closeModal() {
    this.dialogRef.close();
  }

  increasePriceStartRange() {
    this.priceStartRange++;
  }

  decreasePriceStartRange() {
    this.priceStartRange--;
  }

  increasePriceEndRange() {
    this.priceEndRange++;
  }

  decreasePriceEndRage() {
    this.priceEndRange--;
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
   public mousedown(operations) {
     this.timeoutHandler = setInterval(() => {
       switch (operations) {
         case 'increasePriceEndRange': this.increasePriceEndRange(); break;
         case 'decreasePriceEndRage': this.decreasePriceEndRage(); break;
         case 'increasePriceStartRange': this.increasePriceStartRange(); break;
         case 'decreasePriceStartRange': this.decreasePriceStartRange(); break;
       }
       this.name += 1;
     }, 100);
   }

}
