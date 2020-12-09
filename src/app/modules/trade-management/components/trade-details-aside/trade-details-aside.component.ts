import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StockSymbol } from 'src/app/modules/shared/models/trade-management/stock-symbol.model';
import { UserStockSummary } from 'src/app/modules/shared/models/trade-management/user-stock-summary.model';

@Component({
  selector: 'app-trade-details-aside',
  templateUrl: './trade-details-aside.component.html',
  styleUrls: ['./trade-details-aside.component.scss']
})
export class TradeDetailsAsideComponent implements OnInit {

  @Input() selectedStock: StockSymbol;
  @Input() stockSummary: UserStockSummary;
  @Output('loadMoreStats') loadMoreStats = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }



  getDisplayValue(value, postfix) {
    if (value) {
      return value + (postfix ? postfix : '');
    }
    return "NA";
  }

}
