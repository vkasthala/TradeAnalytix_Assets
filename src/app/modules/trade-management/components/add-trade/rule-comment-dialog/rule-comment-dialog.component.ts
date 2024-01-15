import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-rule-comment-dialog',
  templateUrl: './rule-comment-dialog.component.html',
  styleUrls: ['./rule-comment-dialog.component.scss']
})
export class RuleCommentDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<RuleCommentDialogComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
  }

  closeModal() {
    this.dialogRef.close();
  }

}
