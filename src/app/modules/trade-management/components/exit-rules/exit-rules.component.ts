import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { EntryExitRule } from 'src/app/modules/trade-management/models/entry-exit-rule.model';
import { EntryExitRuleService } from 'src/app/modules/trade-management/services/entry-exit-rule.service';
import { TradeInputData } from 'src/app/modules/shared/models/trade-management/trade-input-data.model';

@Component({
  selector: 'app-exit-rules',
  templateUrl: './exit-rules.component.html',
  styleUrls: ['./exit-rules.component.scss']
})
export class ExitRulesComponent implements OnInit {

  checkbox2: any;
  checkbox4: any;
  checkbox6: any;
  checkbox8: any;

  @Input("inputState") inputState: TradeInputData;
  @Output('prevStep') prevStep = new EventEmitter();

  entryRules: EntryExitRule[] = this.entryExitRuleService.getEntryRules();
  constructor(private _dialog: MatDialog,
    private router: Router,
    private entryExitRuleService: EntryExitRuleService) { }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    console.log('entry rules child view init:', this.inputState);
    if (this.inputState && this.inputState.tradeStrategy.entryRules) {
      this.entryRules = this.inputState.tradeStrategy.entryRules;
    }
  }

  closeTrade() {
    this.router.navigate(['/dashboard/trade-strategies'])
  }

  previous() {
    this.router.navigate(['/dashboard/close-trade/05082020-001'])
  }
  

}
