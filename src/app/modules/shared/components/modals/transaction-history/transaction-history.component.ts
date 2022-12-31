import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TransactionHistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {

  }

  ngOnInit() {
  }

  closeModal() {
    this.dialogRef.close();
  }

}
