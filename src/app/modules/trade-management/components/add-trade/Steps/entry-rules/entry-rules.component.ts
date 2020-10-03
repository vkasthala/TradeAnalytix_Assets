import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AddTradeConfirmationPopupComponent } from '../../add-trade-confirmation-popup/add-trade-confirmation-popup.component';
import { EntryExitRule } from 'src/app/modules/trade-management/models/entry-exit-rule.model';
import { EntryExitRuleService } from 'src/app/modules/trade-management/services/entry-exit-rule.service';

@Component({
  selector: 'app-entry-rules',
  templateUrl: './entry-rules.component.html',
  styleUrls: ['./entry-rules.component.scss']
})
export class EntryRulesComponent implements OnInit {

  checkbox2:any;
  checkbox4:any;
  checkbox6:any;
  checkbox8:any;
  @Output('prevStep') prevStep = new EventEmitter();

  entryRules: EntryExitRule[] = this.entryExitRuleService.getEntryRules();

  constructor(
    private _dialog: MatDialog,
    private router: Router,
    private entryExitRuleService: EntryExitRuleService
  ) { }

  ngOnInit() {
  }

  previous() {
    this.prevStep.emit()
  }

  confirmAddTrade() {
    const dialogRef = this._dialog.open(AddTradeConfirmationPopupComponent, {
      disableClose: true,
      width: 'auto'
    });

    dialogRef.afterClosed().subscribe((res) => {
      res ? this.router.navigate(['/dashboard/trade-strategies']) : 0;
    });
  }
}
