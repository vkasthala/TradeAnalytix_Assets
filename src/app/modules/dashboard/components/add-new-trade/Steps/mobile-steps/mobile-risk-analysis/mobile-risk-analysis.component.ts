import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-mobile-risk-analysis',
  templateUrl: './mobile-risk-analysis.component.html',
  styleUrls: ['./mobile-risk-analysis.component.scss']
})
export class MobileRiskAnalysisComponent implements OnInit {
  
  @Output('nextStep') nextStep = new EventEmitter();
  @Output('prevStep') prevStep = new EventEmitter();

  stockPriceStartRange:number = 0;
  stockPriceEndRange:number = 0;

  @Input('stockOptions') stockOptions:any[];
  @Input('stockAdded') stockAdded: boolean;


  constructor() { }

  ngOnInit() {
  }

  previous() {
    this.prevStep.emit()
  }

  next() {
    this.nextStep.emit()
  }

  increaseStockPriceStartRange() {
    this.stockPriceStartRange++;
  }

  decreaseStockPriceStartRange() {
    this.stockPriceStartRange--;
  }

  increaseStockPriceEndRange() {
      this.stockPriceEndRange++;
  }

  decreaseStockPriceEndRage() {
    this.stockPriceEndRange--;
  }

  decreaseDaysLeft(index) {
    let stock = this.stockOptions[index];
    if (stock.daysLeft > 0 && stock.daysLeft < 731) {
      stock.daysLeft--;
    }
  }

  increaseDaysLeft(index) {
    let stock = this.stockOptions[index];
    if (stock.daysLeft >= 0 && stock.daysLeft < 731) {
      stock.daysLeft++;
    }
  }

  decreaseImpliedValue(index) {
    let stock = this.stockOptions[index];
    if (stock.impliedValue > 1 && stock.impliedValue < 501) {
      stock.impliedValue--;
    }
  }

  increaseImpliedValue(index) {
    let stock = this.stockOptions[index];
    if (stock.impliedValue > 1 && stock.impliedValue < 501) {
      stock.impliedValue++;
    }
  }


  preventNegatives(e, preventDecimal?:boolean) {
    if(preventDecimal) {
      if(!((e.keyCode > 95 && e.keyCode < 106)
      || (e.keyCode > 47 && e.keyCode < 58) 
      || e.keyCode == 8 ||e.keyCode == 17 || e.keyCode == 110)) {
        if(e.keyCode == 190) {
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
}
