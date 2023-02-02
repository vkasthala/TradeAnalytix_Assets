import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { StockSymbol } from 'src/app/modules/shared/models/trade-management/stock-symbol.model';


@Component({
  selector: 'app-trading-view',
  templateUrl: './trading-view.component.html',
  styleUrls: ['./trading-view.component.scss']
})
export class TradingViewComponent implements OnInit, AfterViewInit {

  @ViewChild('tradingview') tradingview: ElementRef;

  @Input() selectedStock: StockSymbol;

  constructor(private _renderer2: Renderer2) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    let script = this._renderer2.createElement('script');
    script.type = `text/javascript`;
    let country = sessionStorage.getItem('country');
    let exchange;
    if(country == '1') {
      exchange = 'NASDAQ';
    } else if(country == '2') {
      exchange = 'BSE';
    }
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
    script.text = '{"symbol": " '  + exchange + ':' + this.selectedStock.code + '","width": "100%","height": 220,"locale": "in","dateRange": "12M","colorTheme": "light","trendLineColor": "#37a6ef","underLineColor": "#E3F2FD","isTransparent": false,"autosize": false,"largeChartUrl": ""}';

    this.tradingview.nativeElement.appendChild(script);
  }

}
