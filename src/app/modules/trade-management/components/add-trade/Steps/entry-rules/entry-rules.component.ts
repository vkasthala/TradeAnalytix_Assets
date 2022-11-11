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
  @Output('evalRulesEvent') evalRulesEvent = new EventEmitter();

  ruleGridColumns = ['msg', 'aligned', 'comment'];
  entryRules: RuleDto[];

  protected hideEntryRules: boolean = false;
  showMoreRules:boolean = false;
  constructor(
    private _dialog: MatDialog,
    private router: Router,
    private entryExitRuleService: EntryExitRuleService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    let type = 'Entry';
    if (this.inputState != undefined && this.inputState.tradeStrategy && this.inputState.tradeStrategy.id) {
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

  updateEntryRules(rules: RuleDto[]) {
    let newRules: RuleDto[] = [];
    if (this.entryRules && this.entryRules.length > 0) {
      for (let ind = 0; ind < this.entryRules.length; ind++) {
        if (this.entryRules[ind].type === 'Coded') {
          continue;
        }
        newRules.push(this.entryRules[ind]);
      }
    }
    if (rules && rules.length > 0) {
      this.entryRules = rules.concat(newRules);
    } else {
      this.entryRules = newRules;
    }
  }

  evalRules(event) {
    event.stopPropagation();
    this.evalRulesEvent.emit(event);
    
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

  toggleTradingRules() {
    this.showMoreRules = !this.showMoreRules;
  }
}
