import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-manage-rule-popup',
  templateUrl: './manage-rule-popup.component.html',
  styleUrls: ['./manage-rule-popup.component.scss']
})
export class ManageRulePopupComponent implements OnInit {
  title:string;
  btnText:string;
  rowData:string;
  entryexitruleform;
  public event: EventEmitter<any> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ManageRulePopupComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.title = data.title;
    this.btnText = data.btnText;
    this.rowData = data.formData;
    this.entryexitruleform = this.formBuilder.group({
      type: "",
      description:"",
      source:""
      })
  }

  ngOnInit() {
  }

  closeModal(form) {    
    this.event.emit({ data: form.value });
    this.dialogRef.close(form.value);
  }


}
