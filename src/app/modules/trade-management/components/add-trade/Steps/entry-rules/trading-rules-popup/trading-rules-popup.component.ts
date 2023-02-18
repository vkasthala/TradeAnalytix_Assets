import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RuleDto } from 'src/app/modules/trade-management/models/rule-dto.model';

@Component({
  selector: 'app-trading-rules-popup',
  templateUrl: './trading-rules-popup.component.html',
  styleUrls: ['./trading-rules-popup.component.scss']
})
export class TradingRulesPopupComponent implements OnInit {
  category: string;
  title: string;
  entryexitruleform;
  entryRules: RuleDto[];
  public event: EventEmitter<any> = new EventEmitter();
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<TradingRulesPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    ) {
    this.category = data.category;
    this.title = data.title;
    this.entryRules = data.entryRules;
    this.entryexitruleform = this.formBuilder.group({
      type: "",
      description:"",
      source:""
    })
  }

  ngOnInit() {
    
  }

  

  closeModal(form) {
    this.dialogRef.close();
    // this.event.emit({ data: form.value });
    // this.dialogRef.close(form.value);
  }

  saveRules() {
    this.dialogRef.close(this.entryRules);
  }

}
