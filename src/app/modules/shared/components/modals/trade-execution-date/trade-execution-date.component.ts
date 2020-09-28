import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-trade-execution-date',
  templateUrl: './trade-execution-date.component.html',
  styleUrls: ['./trade-execution-date.component.scss']
})
export class TradeExecutionDateComponent implements OnInit {

  title: string;

  constructor(
    public dialogRef: MatDialogRef<TradeExecutionDateComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.title = data.title;
  }

  ngOnInit() {
  }

  closeModal() {
    this.dialogRef.close();
  }

}

