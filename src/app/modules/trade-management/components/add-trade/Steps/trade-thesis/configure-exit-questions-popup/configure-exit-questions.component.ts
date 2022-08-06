import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-configure-exit-questions',
  templateUrl: './configure-exit-questions.component.html',
  styleUrls: ['./configure-exit-questions.component.scss']
})
export class ConfigureExitQuestionsComponent implements OnInit {

  title: string;

  constructor(
    public dialogRef: MatDialogRef<ConfigureExitQuestionsComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
  }

  ngOnInit() {
  }

  closeModal() {
    this.dialogRef.close();
  }


}
