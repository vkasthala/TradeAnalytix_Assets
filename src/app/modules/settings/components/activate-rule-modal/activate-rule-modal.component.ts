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

  jsonData:any;

  constructor(
    public dialogRef: MatDialogRef<ActivateRuleModalComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.title = data.title;
    this.jsonData = data;
    if (data) {
      this.value = data.val;
    }
  }

  ngOnInit() {
    
  }

  closeModal() {
    this.dialogRef.close();
  }

  Activate() {
    this.dialogRef.close();
    // this.event.emit({ data: form.value });
    this.dialogRef.close(this.value);
  }

}
