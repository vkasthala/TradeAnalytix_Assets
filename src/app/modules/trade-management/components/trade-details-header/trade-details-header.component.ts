import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StockSymbol } from 'src/app/modules/shared/models/trade-management/stock-symbol.model';
import { UserStockSummary } from 'src/app/modules/shared/models/trade-management/user-stock-summary.model';

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
  @Input("addTrade") addTrade: boolean;
  @Input("editTrade") editTrade: boolean;
  @Input("closeTrade") closeTrade: boolean;
  @Input("viewTrade") viewTrade: boolean;
  @Input("StrategyId") StrategyId: any;

  public hideTradeHeader:boolean= false;

  constructor() { }

  ngOnInit() {
  }

  showMoreStats() {
    this.allStats = !this.allStats;
    this.loadMoreStats.emit();
  }

  getDisplayValue(value, postfix) {
    if (value) {
      return value + (postfix ? postfix : '');
    }
    return "NA";
  }
  CollapsTradeHeader() {  
    this.hideTradeHeader = !this.hideTradeHeader; 
  }

}
