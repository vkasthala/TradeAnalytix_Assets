import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-join-waitlist',
  templateUrl: './join-waitlist.component.html',
  styleUrls: ['./join-waitlist.component.scss']
})
export class JoinWaitlistComponent implements OnInit {

  title: string;

  constructor(public dialogRef: MatDialogRef<JoinWaitlistComponent>, @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
  }

  ngOnInit() {
  }

  closeModal() {
    this.dialogRef.close();
  }

}
