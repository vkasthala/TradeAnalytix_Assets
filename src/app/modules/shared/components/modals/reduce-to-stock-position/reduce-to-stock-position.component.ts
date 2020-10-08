import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-reduce-to-stock-position',
  templateUrl: './reduce-to-stock-position.component.html',
  styleUrls: ['./reduce-to-stock-position.component.scss']
})
export class ReduceToStockPositionComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ReduceToStockPositionComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
  
  }

  ngOnInit() {
  }
  closeModal() {
    this.dialogRef.close();
  }
}
