import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-economic-dialog',
  templateUrl: './economic-dialog.component.html',
  styleUrls: ['./economic-dialog.component.scss']
})
export class EconomicDialogComponent implements OnInit {

  title: string;

  constructor(private dialogRef: MatDialogRef<EconomicDialogComponent>, @Inject(MAT_DIALOG_DATA) public data) {
    this.title = data.title;
  }

  ngOnInit() {
  }

  closeModal() {
    this.dialogRef.close();
  }

}
