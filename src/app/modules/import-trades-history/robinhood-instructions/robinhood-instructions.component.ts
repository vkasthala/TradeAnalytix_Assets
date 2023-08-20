import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-robinhood-instructions',
  templateUrl: './robinhood-instructions.component.html',
  styleUrls: ['./robinhood-instructions.component.scss']
})
export class RobinhoodInstructionsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RobinhoodInstructionsComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) { }

  ngOnInit() {
  }

  closeModal() {
    this.dialogRef.close();
  }

}
