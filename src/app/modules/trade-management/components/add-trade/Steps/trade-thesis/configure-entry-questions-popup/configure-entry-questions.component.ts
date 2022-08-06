import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-configure-entry-questions',
  templateUrl: './configure-entry-questions.component.html',
  styleUrls: ['./configure-entry-questions.component.scss']
})
export class ConfigureEntryQuestionsComponent implements OnInit {

  title: string;

  constructor(public dialogRef: MatDialogRef<ConfigureEntryQuestionsComponent>, @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
  }

  ngOnInit() {
  }

  closeModal() {
    this.dialogRef.close();
  }


}
