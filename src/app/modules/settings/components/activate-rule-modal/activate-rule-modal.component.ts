import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-activate-rule-modal',
  templateUrl: './activate-rule-modal.component.html',
  styleUrls: ['./activate-rule-modal.component.scss']
})
export class ActivateRuleModalComponent implements OnInit {

  title: string;
  value: any;
  ruleType: any;
  btnText: string;

  jsonData:any;

  constructor(
    public dialogRef: MatDialogRef<ActivateRuleModalComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.title = data.title;
    this.jsonData = data.res;
    this.btnText = data.btnText;
    if (data) {
      this.value = data.res.val;
      this.ruleType = data.res.ruleType;
    }
  }

  ngOnInit() {
    
  }

  closeModal() {
    this.dialogRef.close();
  }

  Activate() {
    if (this.jsonData.uiLabel === "A trading plan should be created everyday") {
      this.value = 1;
    } else if (this.value === null || this.value === undefined) {
      this.value = 0;
    }
    // this.event.emit({ data: form.value });
    this.dialogRef.close(this.value);
  }

}
