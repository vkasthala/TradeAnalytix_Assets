import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-to-position',
  templateUrl: './add-to-position.component.html',
  styleUrls: ['./add-to-position.component.scss']
})
export class AddToPositionComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddToPositionComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
 
  }

  ngOnInit() {
  }
  closeModal() {
    this.dialogRef.close();
  }

}
