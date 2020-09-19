import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-reduce-to-position-popup',
  templateUrl: './reduce-to-position-popup.component.html',
  styleUrls: ['./reduce-to-position-popup.component.scss']
})
export class ReduceToPositionPopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ReduceToPositionPopupComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
 
  }

  ngOnInit() {
  }
  closeModal() {
    debugger;
    this.dialogRef.close();
  }
}
