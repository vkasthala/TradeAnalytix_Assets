import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-to-position-popup',
  templateUrl: './add-to-position-popup.component.html',
  styleUrls: ['./add-to-position-popup.component.scss']
})
export class AddToPositionPopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddToPositionPopupComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
 
  }

  ngOnInit() {
  }
  closeModal() {
    this.dialogRef.close();
  }

}
