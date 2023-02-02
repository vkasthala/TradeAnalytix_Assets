import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-become-an-affiliate',
  templateUrl: './become-an-affiliate.component.html',
  styleUrls: ['./become-an-affiliate.component.scss']
})
export class BecomeAnAffiliateComponent implements OnInit {

  title: string;

  constructor(public dialogRef: MatDialogRef<BecomeAnAffiliateComponent>, @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
  }

  ngOnInit() {
  }

  closeModal() {
    this.dialogRef.close();
  }

}
