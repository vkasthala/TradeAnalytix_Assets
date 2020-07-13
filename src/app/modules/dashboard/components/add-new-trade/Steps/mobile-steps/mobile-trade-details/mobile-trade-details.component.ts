import { Component, OnInit, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'app-mobile-trade-details',
  templateUrl: './mobile-trade-details.component.html',
  styleUrls: ['./mobile-trade-details.component.scss']
})
export class MobileTradeDetailsComponent implements OnInit {
  stockOptions: any[] = [];
  stockAdded: boolean;
  currentState: number = 1;
  @Output('nextStep') nextStep = new EventEmitter();
  quantity:number = 10;
  constructor() { }

  ngOnInit() {
  }

  enterSymbol() {
    this.currentState++;
  }

  addStock() {
    this.stockAdded = true;
  }

  addOption() {
    if (this.stockOptions.length < 4) {
      this.stockOptions.push({
        daysLeft: 23,
        impliedValue: 65,
        quantity : 10
      })
    }
  }

  deleteStockOption(index) {
    this.stockOptions.splice(index, 1);
  }

  next() {
    this.nextStep.emit()
  }

}
