import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

declare const TradingView: any;

@Component({
  selector: 'app-trading-dashboard',
  templateUrl: './trading-dashboard.component.html',
  styleUrls: ['./trading-dashboard.component.scss']
})
export class TradingDashboardComponent implements OnInit {
  // @ViewChild('tradingview') tradingview?: ElementRef;
  symbol: any = 'ICICIBANK';
  exchange: string = 'NASDAQ';

  userName: string = "";

  constructor(
    private _renderer2: Renderer2,
    private router: ActivatedRoute,
    private _router: Router,
  ) { }

  ngOnInit() {
    this.loadChart();
  }

  loadChart() {
    let country = sessionStorage.getItem('country');
    if(country == '1') {
      this.exchange = 'SENSEX';
    } else if(country == '2') {
      this.exchange = 'BSE';
    }

    new TradingView.widget({
      "autosize": true,
      "width": 900,
      "height": '100%',
      "symbol": this.symbol,
      "interval": "D",
      "timezone": "Etc/UTC",
      "theme": "light",
      "style": "1",
      "locale": "en",
      "toolbar_bg": "#f1f3f6",
      "enable_publishing": false,
      "allow_symbol_change": true,
      "container_id": "tradingview_5ee15"
    });
  }

}

