import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ask-for-feature',
  templateUrl: './ask-for-feature.component.html',
  styleUrls: ['./ask-for-feature.component.scss']
})
export class AskForFeatureComponent implements OnInit {

  title: string;

  constructor(public dialogRef: MatDialogRef<AskForFeatureComponent>, @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
  }

  ngOnInit() {
  }

  closeModal() {
    this.dialogRef.close();
  }

}
