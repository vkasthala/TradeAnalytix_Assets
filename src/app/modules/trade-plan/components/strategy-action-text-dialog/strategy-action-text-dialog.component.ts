import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PlannedTradeDialogComponent } from '../planned-trade-dialog/planned-trade-dialog.component';

@Component({
  selector: 'app-strategy-action-text-dialog',
  templateUrl: './strategy-action-text-dialog.component.html',
  styleUrls: ['./strategy-action-text-dialog.component.scss']
})
export class StrategyActionTextDialogComponent implements OnInit {

  title: string;

  constructor(private dialogRef: MatDialogRef<PlannedTradeDialogComponent>, @Inject(MAT_DIALOG_DATA) public data) {
    this.title = data.title;
  }

  ngOnInit() {
  }

  closeModal() {
    this.dialogRef.close();
  }

}
