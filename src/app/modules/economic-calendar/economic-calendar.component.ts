import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';


@Component({
  selector: 'app-economic-calendar',
  templateUrl: './economic-calendar.component.html',
  styleUrls: ['./economic-calendar.component.scss']
})
export class EconomicCalendarComponent implements OnInit, AfterViewInit {
  @ViewChild('tradingview', { static: false }) tradingview: ElementRef;
  constructor(private _renderer2: Renderer2) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    let script = this._renderer2.createElement('script');
    script.type = `text/javascript`;
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-events.js";
    script.text = '{"width": "100%","height": 300,"locale": "us","dateRange": "12M","colorTheme": "light","trendLineColor": "#37a6ef","underLineColor": "#E3F2FD","isTransparent": false,"autosize": false,"importanceFilter": "-1,0,1", "currencyFilter": "INR"}';

    this.tradingview.nativeElement.appendChild(script);
  }

}
