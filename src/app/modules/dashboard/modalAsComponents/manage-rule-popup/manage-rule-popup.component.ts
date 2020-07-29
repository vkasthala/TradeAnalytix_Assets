import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-manage-rule-popup',
  templateUrl: './manage-rule-popup.component.html',
  styleUrls: ['./manage-rule-popup.component.scss']
})
export class ManageRulePopupComponent implements OnInit {
  title:string;
  btnText:string;
  constructor(
    public dialogRef: MatDialogRef<ManageRulePopupComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.title = data.title;
    this.btnText = data.btnText;
  }

  ngOnInit() {
  }

  closeModal() {
    this.dialogRef.close();
  }

}
