import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-copy-cueTrade',
  templateUrl: './copy-cueTrade.component.html',
  styleUrls: ['./copy-cueTrade.component.scss']
})
export class CopyCueTradeComponent implements OnInit {

  title: string;

  constructor(
    public dialogRef: MatDialogRef<CopyCueTradeComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
  }

  ngOnInit() {
  }

  closeModal() {
    this.dialogRef.close();
  }

}
