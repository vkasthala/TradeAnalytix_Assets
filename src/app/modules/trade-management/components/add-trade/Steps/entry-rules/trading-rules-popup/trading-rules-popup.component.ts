import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-trading-rules-popup',
  templateUrl: './trading-rules-popup.component.html',
  styleUrls: ['./trading-rules-popup.component.scss']
})
export class TradingRulesPopupComponent implements OnInit {

  category: string;
  title: string;

  constructor(
    public dialogRef: MatDialogRef<TradingRulesPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    ) {
    this.category = data.category;
    this.title = data.title;
  }

  ngOnInit() {
    
  }

  

  closeModal() {
    this.dialogRef.close();
  }

}
