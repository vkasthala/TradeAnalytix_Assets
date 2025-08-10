import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-stock-price-popup',
  templateUrl: './update-stock-price-popup.component.html',
  styleUrls: ['./update-stock-price-popup.component.scss']
})
export class UpdateStockPricePopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UpdateStockPricePopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  closeModal() {
    this.dialogRef.close();
  }

}
