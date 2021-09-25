import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RuleEvalResult } from 'src/app/modules/trade-management/models/rule-eval-result.model';

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

export class LandingComponent {}
