import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-zerodha-instructions',
  templateUrl: './zerodha-instructions.component.html',
  styleUrls: ['./zerodha-instructions.component.scss']
})
export class ZerodhaInstructionsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ZerodhaInstructionsComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) { }

  ngOnInit() {
  }

  closeModal() {
    this.dialogRef.close();
  }

}
