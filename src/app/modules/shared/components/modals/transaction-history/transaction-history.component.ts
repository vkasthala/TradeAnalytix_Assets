import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TransactionHistory } from '../../../models/trade-management/transaction-history.model';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit {

  history: TransactionHistory[] = [];

  constructor(
    public dialogRef: MatDialogRef<TransactionHistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.history = data.history;
  }

  ngOnInit() {
  }

  closeModal() {
    this.dialogRef.close();
  }

}
