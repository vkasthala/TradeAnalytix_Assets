import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StockSymbol } from 'src/app/modules/shared/models/trade-management/stock-symbol.model';
import { UserStockSummary } from 'src/app/modules/shared/models/trade-management/user-stock-summary.model';
import { MaxRiskDetails } from 'src/app/modules/risk-analysis/models/max-risk-details.model';

@Component({
  selector: 'app-trade-details-aside',
  templateUrl: './trade-details-aside.component.html',
  styleUrls: ['./trade-details-aside.component.scss']
})
export class TradeDetailsAsideComponent implements OnInit {

  @Input() selectedStock: StockSymbol;
  @Input() stockSummary: UserStockSummary;
  
  @Output('loadMoreStats') loadMoreStats = new EventEmitter();
  @Output('calculateMaxRisk') calculateMaxRisk: EventEmitter<any> = new EventEmitter();

  maxRiskDetails: MaxRiskDetails;

  constructor() { }

  ngOnInit() {
  }



  getDisplayValue(value, postfix) {
    if (value) {
      return value + (postfix ? postfix : '');
    }
    return "NA";
  }

  calculateMaxProfitAndRisk(){
    this.calculateMaxRisk.emit();
  }

}
