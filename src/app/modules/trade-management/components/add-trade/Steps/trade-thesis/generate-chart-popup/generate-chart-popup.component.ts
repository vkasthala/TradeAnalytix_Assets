import { AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-generate-chart-popup',
  templateUrl: './generate-chart-popup.component.html',
  styleUrls: ['./generate-chart-popup.component.scss']
})
export class GenerateChartPopupComponent implements OnInit, AfterViewInit {

  @ViewChild('thesisTradingview', { static: false }) thesisTradingview: ElementRef;
  constructor(
    private _renderer2: Renderer2,
    public dialogRef: MatDialogRef<GenerateChartPopupComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    let script = this._renderer2.createElement('script');
    script.type = `text/javascript`;
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
    script.text = '{"symbol": " BSE:' + this.data.selectedStock.code + '","width": 600,"height": 400,"interval": "1", "timezone": "Etc/UTC","theme": "light","style": "1","locale": "en","toolbar_bg": "#f1f3f6","enable_publishing": true,"withdateranges": true,"hide_side_toolbar": false,"allow_symbol_change": true,"details": true,"hotlist": true,"calendar": true,"container_id": "tradingview_7e17d"}';

    this.thesisTradingview.nativeElement.appendChild(script);


  }

  closeModal() {
    this.dialogRef.close();
  }

}
