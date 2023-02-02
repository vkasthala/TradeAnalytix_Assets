import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-reduce-to-position',
  templateUrl: './reduce-to-position.component.html',
  styleUrls: ['./reduce-to-position.component.scss']
})
export class ReduceToPositionComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ReduceToPositionComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {

  }

  ngOnInit() {
  }

  closeModal() {
    this.dialogRef.close();
  }

}
