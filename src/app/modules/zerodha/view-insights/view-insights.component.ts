import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-insights',
  templateUrl: './view-insights.component.html',
  styleUrls: ['./view-insights.component.scss']
})
export class ViewInsightsComponent implements OnInit {

  title: string;

  constructor(
    public dialogRef: MatDialogRef<ViewInsightsComponent>, 
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
