import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Watchlistsymbol } from '../models/watchlistsymbol.model';
declare const Datafeeds: any;

@Injectable({
  providedIn: 'root'
})
export class TradingViewDatafeedServiceService {
  symbolData: Watchlistsymbol = new Watchlistsymbol();

  constructor(private http: HttpClient) { }

  private createHttpHeaders(): HttpHeaders {
    return new HttpHeaders({
      Brokerage: 'FYERS',
      Authorization: 'Bearer ' + sessionStorage.getItem('token')
    });
  }

  setSymbol(symbol: Watchlistsymbol){
    this.symbolData = symbol;
  }

  createDatafeed(): any {
    return new CustomDatafeed(this.http, environment.tradingServiceUri+"/api/tradingview", this.createHttpHeaders(), this.symbolData);
  }
}

class CustomDatafeed {
  private subscriptions: Map<string, any> = new Map();
  constructor(private http: HttpClient, private baseUrl: string, private headers: HttpHeaders, private symbolData: Watchlistsymbol) {}

  onReady(callback: any) {
    console.log('Datafeed: Using custom config without calling /config');
    setTimeout(() => callback(this.getConfig()), 0);
  }

  // Config moved here
  getConfig(): any {
    return {
    supports_search: false,
    supports_group_request: false
    };
  }

  resolveSymbol(symbolName: string, onSymbolResolvedCallback: any, onErrorCallback: any) {
       onSymbolResolvedCallback(
      {"name":this.symbolData.tradingSymbolShort,
      "exchange-traded":this.symbolData.exchange,
      "exchange-listed":this.symbolData.exchange,
      "timezone":"Asia/Kolkata",
      "minmov":5,
      // "minmov2":0,
      // "pointvalue":1,
      "session":"0915-1530",
      "has_intraday":true,
      "visible_plots_set":"ohlcv",
      "description": this.symbolData.symbolDesc,
      "type": this.symbolData.segment == '11' ? "option" : "stock",
      "supported_resolutions":["5S", "10S", "15S", "30S", "45S", "1", "2", "3", "5", "10", "15", "20", "30", "60", "120", "240", "1D", "1W", "1M"],
      "pricescale":2,
      "ticker":this.symbolData.trading_symbol,
      // "logo_urls":["https://s3-symbol-logo.tradingview.com/apple.svg"],
      // "exchange_logo":"https://s3-symbol-logo.tradingview.com/country/US.svg",
      "base_name":[this.symbolData.trading_symbol],
      "listed_exchange":this.symbolData.exchange,
      "exchange":this.symbolData.exchange,
      "has_daily":true,
      "intraday_multipliers":["5S", "10S", "15S", "30S", "45S", "1", "2", "3", "5", "10", "15", "20", "30", "60", "120", "240", "1D", "1W", "1M"],
      "format":"price"});
  }

   getEpochInIST(date: Date): number {
    const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
    return Math.floor((date.getTime() + istOffset) / 1000);
  }

   adjustRange(from: number, to: number, resolution: string) {
    const oneDay = 24 * 60 * 60; // In seconds
    const maxDays = 100 * oneDay; // Max allowed difference
  
    if (['1', '2', '3', '5', '10', '15', '20', '30', '45', '60', '120', '180', '240'].includes(resolution)) {
      const maxDays = 100 * oneDay;
      if ((to - from) > maxDays) {
        from = to - maxDays; // Limit to 100 days
      }
    }
    if(resolution == '1D'){
      const maxDays = 366 * oneDay;
      if ((to - from) > maxDays) {
        from = to - maxDays; // Limit to 366 days
      }
    }
    return { adjustedFrom: from, adjustedTo: to };
  }

  getBars(symbolInfo: any, resolution: any, range: any, onHistoryCallback: any, onErrorCallback: any) {
    debugger;
    const startDate = this.getEpochInIST(new Date('2017-07-03T00:00:00'));
    const endDate = range.to;
    let adjustedRange = this.adjustRange(startDate, endDate, resolution);
    const url = `${this.baseUrl}/history?symbol=${symbolInfo.ticker}&resolution=${resolution}&from=${adjustedRange.adjustedFrom}&to=${adjustedRange.adjustedTo}`;
    this.http.get(url, { headers: this.headers }).subscribe(
      (response: any) => {
        if (response && response.t && response.t.length) {
          const bars = response.t.map((timestamp: number, index: number) => ({
            time: timestamp * 1000, // Convert to milliseconds
            open: response.o[index],
            high: response.h[index],
            low: response.l[index],
            close: response.c[index],
            volume: response.v[index]
          }));
          debugger;
          onHistoryCallback(bars, { noData: false });
        } else {
          onHistoryCallback([], { noData: true });
        }
      },
      (error) => {
        console.error('Error fetching bars:', error);
        onErrorCallback(error);
      }
    );
  }
}

