import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-to-stock-position-popup',
  templateUrl: './add-to-stock-position-popup.component.html',
  styleUrls: ['./add-to-stock-position-popup.component.scss']
})
export class AddToStockPositionPopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddToStockPositionPopupComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
 
  }

  ngOnInit() {
  }
  closeModal() {
    this.dialogRef.close();
  }
}
