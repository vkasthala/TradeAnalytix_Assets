import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-single-input-modal',
  templateUrl: './single-input-modal.component.html',
  styleUrls: ['./single-input-modal.component.scss']
})
export class SingleInputModalComponent implements OnInit {

  title: string;
  value: string;

  constructor(
    public dialogRef: MatDialogRef<SingleInputModalComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.title = data.title;
    if (data.value) {
      this.value = data.value;
    }
  }

  ngOnInit() {
  }

  closeModal() {
    this.dialogRef.close(this.value);
  }

}
