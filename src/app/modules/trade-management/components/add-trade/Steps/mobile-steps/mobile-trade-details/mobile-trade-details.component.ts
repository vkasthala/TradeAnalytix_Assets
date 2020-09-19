import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
@Component({
  selector: 'app-mobile-trade-details',
  templateUrl: './mobile-trade-details.component.html',
  styleUrls: ['./mobile-trade-details.component.scss']
})
export class MobileTradeDetailsComponent implements OnInit {
  
  currentState: number = 1;
  @Output('nextStep') nextStep = new EventEmitter();
  @Input('stockOptions') stockOptions:any[];
  @Input('stockAdded') stockAdded: boolean;
  @Output('updateStockAdded') updateStockAdded = new EventEmitter();
  quantity: number = 10;
  constructor() { }

  ngOnInit() {
  }

  enterSymbol() {
    this.currentState++;
  }

  addStock() {
    this.stockAdded = true;
    this.updateStockAdded.emit(true)
  }

  removeStock() {
    this.stockAdded = false;
    this.updateStockAdded.emit(false);
  }

  addOption() {
    if (this.stockOptions.length < 4) {
      if(this.stockOptions.length == 0) {
        this.stockOptions.push({
          title: 'Option-1 (Sell 460 Call)',
          quantity: 2,
          daysLeft: 10,
          impliedValue: 10
        })
      }else if(this.stockOptions.length == 1) {
        this.stockOptions.push({
          title: 'Option-2 (Buy 500 Call)',
          quantity: 2,
          daysLeft: 10,
          impliedValue: 10
        })
      }else if(this.stockOptions.length == 2) {
        this.stockOptions.push({
          title: 'Option-3 (Buy 380 Put)',
          quantity: 2,
          daysLeft: 10,
          impliedValue: 10
        })
      }else if(this.stockOptions.length == 3) {
        this.stockOptions.push({
          title: 'Option-4 (Sell 420 Put)',
          quantity: 2,
          daysLeft: 10,
          impliedValue: 10
        })
      }
    }
  }

  deleteStockOption(index) {
    this.stockOptions.splice(index, 1);
  }

  next() {
    this.nextStep.emit()
  }

  increaseStockOptionQuantity(index) {
    let stock = this.stockOptions[index];
    if (stock.quantity >= 0 && stock.quantity < 731) {
      stock.quantity++;
    }
  }

  decreaseStockOptionQuantity(index) {
    let stock = this.stockOptions[index];
    if (stock.quantity >= 0 && stock.quantity < 731) {
      stock.quantity++;
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
        case 'increaseQuantity': this.increaseQuantity(); break;
        case 'decreaseQuantity': this.decreaseQuantity(); break;
        case 'increaseStockOptionQuantity': this.increaseStockOptionQuantity(index); break;
        case 'decreaseStockOptionQuantity': this.decreaseStockOptionQuantity(index); break;
      }
      this.name += 1;
    }, 100);
  }

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity == 0) return;

    this.quantity--;
  }

  preventNegatives(e, preventDecimal?: boolean) {

    if (preventDecimal) {
      if (!((e.keyCode > 95 && e.keyCode < 106)
        || (e.keyCode > 47 && e.keyCode < 58)
        || e.keyCode == 8 || e.keyCode == 17 || e.keyCode == 110)) {
        if (e.keyCode != 190) {
          return false;
        } else {
          return true;
        }
      }
    } else {
      if (!((e.keyCode > 95 && e.keyCode < 106)
        || (e.keyCode > 47 && e.keyCode < 58)
        || e.keyCode == 8)) {
        if (e.keyCode != 190) {
          return false;
        } else {
          return true;
        }
      }
    }
  }

  checkForDecimalValidation(event) {
    event.target.value = parseFloat(event.target.value).toFixed(2);
  }

}
