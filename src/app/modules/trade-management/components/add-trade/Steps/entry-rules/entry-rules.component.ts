import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { TradeInputData } from 'src/app/modules/shared/models/trade-management/trade-input-data.model';
import { RuleDto } from 'src/app/modules/trade-management/models/rule-dto.model';
import { EntryExitRuleService } from 'src/app/modules/trade-management/services/entry-exit-rule.service';
import { AddTradeConfirmationPopupComponent } from '../../add-trade-confirmation-popup/add-trade-confirmation-popup.component';
import { RuleCommentDialogComponent } from '../../rule-comment-dialog/rule-comment-dialog.component';

@Component({
  selector: 'app-entry-rules',
  templateUrl: './entry-rules.component.html',
  styleUrls: ['./entry-rules.component.scss']
})
export class EntryRulesComponent implements OnInit {

  @Input("inputState") inputState: TradeInputData;

  @Input("addTrade") addTrade: boolean;
  @Input("editTrade") editTrade: boolean;
  @Input("closeTrade") closeTrade: boolean;
  @Input("viewTrade") viewTrade: boolean;

  @Output('prevStep') prevStep = new EventEmitter();

  ruleGridColumns = ['msg', 'aligned', 'comment'];
  entryRules: RuleDto[];

  protected hideEntryRules: boolean = false;

  constructor(
    private _dialog: MatDialog,
    private router: Router,
    private entryExitRuleService: EntryExitRuleService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    let type = 'Entry';
    if (this.inputState != undefined) {
      this.entryExitRuleService.getTradeEntryRules(this.inputState.tradeStrategy.id).subscribe(result => {
        this.entryRules = result;
      });
    }
    else {
      this.entryExitRuleService.getEntryRules().subscribe(result => {
        this.entryRules = result;
      });
    }
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

  showEntryRules() {
    this.hideEntryRules = !this.hideEntryRules
  }

  onCommentEdit(ele: RuleDto) {
    let dialogData: any = {
      comment: ele.comment
    };
    const dialogRef = this._dialog.open(RuleCommentDialogComponent, {
      disableClose: false,
      width: 'auto',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe((res) => {
      console.log('after:', res);
      ele.comment = res.comment;
    });
  }
}
