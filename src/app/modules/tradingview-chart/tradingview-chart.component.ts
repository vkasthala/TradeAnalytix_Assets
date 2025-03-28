import { Component, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TradingViewDatafeedServiceService } from '../shared/services/trading-view-datafeed-service.service';
import { Watchlistsymbol } from '../shared/models/watchlistsymbol.model';
import { SharedService } from '../shared/services/shared.service';

declare const TradingView: any;
declare const Datafeeds: any;

@Component({
  selector: 'app-tradingview-chart',
  templateUrl: './tradingview-chart.component.html',
  styleUrls: ['./tradingview-chart.component.scss']
})
export class TradingviewChartComponent implements AfterViewInit, OnChanges {
    chart: any;
    @Input('symbolData') symbol: any = Watchlistsymbol;

    constructor(private tvDatafeedService: TradingViewDatafeedServiceService) { }

    ngAfterViewInit() {
        this.createChart();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['symbol'] && !changes['symbol'].firstChange) {
            // Destroy the existing chart and create a new one when symbol changes
            if (this.chart) {
                this.chart.remove();
            }
            this.createChart();
        }
    }

    private createChart() {
        this.tvDatafeedService.setSymbol(this.symbol);
        const datafeed = this.tvDatafeedService.createDatafeed();

        this.chart = new TradingView.widget({
            container: 'chartContainer',
            locale: 'en',
            library_path: 'assets/charting_library/',
            datafeed: datafeed,
            symbol: this.symbol.tradingSymbolShort,
            interval: '60',
            fullscreen: true,
            autosize: true,
            debug: true,
            timezone: 'Asia/Kolkata',
            disabled_features: [
                "header_symbol_search",          
                "symbol_search_hot_key",       
                "symbol_info",                  
                "edit_buttons_in_legend",       
                "timeframes_toolbar",          
                "control_bar",                  
                "context_menus"
        ]
        });
    }
}