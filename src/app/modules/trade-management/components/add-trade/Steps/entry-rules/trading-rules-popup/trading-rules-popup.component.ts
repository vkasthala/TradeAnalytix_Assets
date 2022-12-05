import { Component, Inject, OnInit } from '@angular/core';
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

  entryRules: RuleDto[];

  constructor(
    public dialogRef: MatDialogRef<TradingRulesPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    ) {
    this.category = data.category;
    this.title = data.title;
    this.entryRules = data.entryRules;
  }

  ngOnInit() {
    
  }

  

  closeModal() {
    this.dialogRef.close();
  }

}
