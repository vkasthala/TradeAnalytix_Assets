import { AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StockSymbol } from 'src/app/modules/shared/models/trade-management/stock-symbol.model';

declare const TradingView: any;

@Component({
  selector: 'app-generate-chart-popup',
  templateUrl: './generate-chart-popup.component.html',
  styleUrls: ['./generate-chart-popup.component.scss']
})
export class GenerateChartPopupComponent implements OnInit, AfterViewInit {

  @ViewChild('thesisTradingview', { static: false }) thesisTradingview: ElementRef;

  width: number = 690;
  height: number = 490;

  timezone: string = 'Asia/Kolkata';

  selectedStock: StockSymbol;
  symbol: string;
  exchange: string = 'NASDAQ'; // This is to be dynamic in future

  constructor(
    private _renderer2: Renderer2,
    public dialogRef: MatDialogRef<GenerateChartPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.selectedStock = data.selectedStock;
    if (this.selectedStock) {
      this.symbol = this.selectedStock.code ? this.selectedStock.code + "" : "";
    }
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // In case of no selected stock don't show it
    if (!this.selectedStock || !this.symbol || !this.symbol.length) {
      return;
    }

    // Render trading view widget
    new TradingView.widget(
      {
        "width": this.width,
        "height": this.height,
        "symbol": this.exchange + ':' + this.symbol,
        "interval": "D",
        "timezone": this.timezone,
        "theme": "light",
        "style": "1",
        "locale": "in",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "allow_symbol_change": true,
        "container_id": "tradingview_bce0c"
      });

  }


  closeModal() {
    this.dialogRef.close();
  }

}
