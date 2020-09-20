import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { StockSymbol } from 'src/app/modules/shared/models/trade-management/stock-symbol.model';
import { UserStockSummary } from 'src/app/modules/shared/models/user-stock-summary.model';

@Component({
  selector: 'app-trade-details-header',
  templateUrl: './trade-details-header.component.html',
  styleUrls: ['./trade-details-header.component.scss']
})
export class TradeDetailsHeaderComponent implements OnInit {
  allStats: boolean = false;

  @Input() selectedStock: StockSymbol;
  @Input() stockSummary: UserStockSummary;
  @Output('loadMoreStats') loadMoreStats = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  showMoreStats() {
    this.allStats = !this.allStats;
    this.loadMoreStats.emit();
  }

  getDisplayValue(value, postfix) {
    if (value) {
      return value +  (postfix ? postfix : '');
    }
    return "NA";
  }

}
