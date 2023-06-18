import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-rate-experience',
  templateUrl: './rate-experience.component.html',
  styleUrls: ['./rate-experience.component.scss']
})
export class RateExperienceDialogComponent implements OnInit {
  title: string;

  constructor(
    private dialogRef: MatDialogRef<RateExperienceDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.title = data.title;
  }

  ngOnInit() {
  }

  closeModal() {
    this.dialogRef.close();
  }

}
