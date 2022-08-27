import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { StockSymbol } from 'src/app/modules/shared/models/trade-management/stock-symbol.model';
import { UserStockSummary } from 'src/app/modules/shared/models/trade-management/user-stock-summary.model';

@Component({
  selector: 'app-trade-details-header',
  templateUrl: './trade-details-header.component.html',
  styleUrls: ['./trade-details-header.component.scss']
})
export class TradeDetailsHeaderComponent implements OnInit {
  allStats: boolean = false;
  @ViewChild('tradingview', { static: false }) tradingview: ElementRef;
  @Input() selectedStock: StockSymbol;
  @Input() stockSummary: UserStockSummary;
  @Output('loadMoreStats') loadMoreStats = new EventEmitter();
  @Input("addTrade") addTrade: boolean;
  @Input("editTrade") editTrade: boolean;
  @Input("closeTrade") closeTrade: boolean;
  @Input("viewTrade") viewTrade: boolean;
  @Input("StrategyId") StrategyId: any;

  public hideTradeHeader:boolean= false;

  constructor(
    private _renderer1: Renderer2
  ) { }

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

  ngAfterViewInit() {

  }

  openContactUsModal() {
    debugger;
    console.log(this.selectedStock)
    var e = document.getElementById('financialsView');
    e.innerHTML = "";

    let script = this._renderer1.createElement('script');
    let country = sessionStorage.getItem('country');
    let exchange;
    if(country == '1') {
      exchange = 'NASDAQ';
    } else if(country == '2') {
      exchange = 'BSE';
    }

    script.text = '';
    script.type = `text/javascript`;
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-financials.js";
    
    script.text = '{"width": "800","height": "800","symbol": " '  + exchange + ':' + this.selectedStock.name + '","locale": "en",""colorTheme": "light","trendLineColor": "#37a6ef","isTransparent": false,"autosize": false,"displayMode": "regular"}';

    this.tradingview.nativeElement.appendChild(script);
  }

}

