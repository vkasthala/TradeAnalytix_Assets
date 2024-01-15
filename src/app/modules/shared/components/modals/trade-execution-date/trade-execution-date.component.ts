import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RuleEvalResult } from 'src/app/modules/trade-management/models/rule-eval-result.model';

@Component({
  selector: 'app-trade-execution-date',
  templateUrl: './trade-execution-date.component.html',
  styleUrls: ['./trade-execution-date.component.scss']
})
export class TradeExecutionDateComponent implements OnInit {

  title: string;

  confirmDateExcute: boolean = false;
  executed: boolean;

  executionDate: string;
  failedRules: RuleEvalResult[] = [];

  constructor(public dialogRef: MatDialogRef<TradeExecutionDateComponent>, @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
    this.failedRules = data.failedRules;
  }

  ngOnInit() {
  }

  closeModal() {
    this.dialogRef.close();
  }

  confirmEvent(e) {
    console.log(e.target.value);
    this.executed = e.target.value;
  }

}

