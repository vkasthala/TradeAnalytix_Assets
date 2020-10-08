import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-to-stock-position',
  templateUrl: './add-to-stock-position.component.html',
  styleUrls: ['./add-to-stock-position.component.scss']
})
export class AddToStockPositionComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddToStockPositionComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
 
  }

  ngOnInit() {
  }
  closeModal() {
    this.dialogRef.close();
  }
}
