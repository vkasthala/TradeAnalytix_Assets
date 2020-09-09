import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-reduce-to-stock-position-popup',
  templateUrl: './reduce-to-stock-position-popup.component.html',
  styleUrls: ['./reduce-to-stock-position-popup.component.scss']
})
export class ReduceToStockPositionPopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ReduceToStockPositionPopupComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
  
  }

  ngOnInit() {
  }
  closeModal() {
    this.dialogRef.close();
  }
}
