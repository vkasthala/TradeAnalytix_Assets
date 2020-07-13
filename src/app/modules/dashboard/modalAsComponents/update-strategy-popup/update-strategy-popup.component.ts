import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-update-strategy-popup',
  templateUrl: './update-strategy-popup.component.html',
  styleUrls: ['./update-strategy-popup.component.scss']
})
export class UpdateStrategyPopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UpdateStrategyPopupComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
 
  }

  ngOnInit() {
  }

  closeModal() {
    this.dialogRef.close();
  }
}
