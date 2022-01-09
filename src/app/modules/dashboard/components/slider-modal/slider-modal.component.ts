import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-slider-modal',
  templateUrl: './slider-modal.component.html',
  styleUrls: ['./slider-modal.component.scss']
})
export class SliderModalComponent implements OnInit {
  currentInd: number = 0;
  title: string;
  public data: any = [
    {
      title:"Welcome to TradeAnalytix",
    }, {
      title:'TradeAnalytix Benefits',
    }, {
      title:'Trade Journal',
    }, {
      title:'Import Trades',
    }, {
      title:'Trade Plan',
    }, {
      title:'Risk Analysis',
    }, {
      title:'Strategy Comparison',
    }, {
      title:'Reports and Metrics',
    }, {
      title:'Trading Rules',
    }, {
      title: "Prerequisites"
    }
  ];
  constructor(
    public dialogRef: MatDialogRef<SliderModalComponent>, 
  ) {
    //this.title = data.title;
  }

  ngOnInit() {
  }

  closeModal() {
    this.dialogRef.close();
  }

  priviousSlide() {
    this.currentInd--;
  }
  nextSlide() {
    if (this.currentInd === (this.data.length - 1)) {
      this.currentInd = 0;
    } else {
      this.currentInd++;
    }
  }

}
