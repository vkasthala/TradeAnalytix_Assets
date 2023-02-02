import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TradeInputData } from 'src/app/modules/shared/models/trade-management/trade-input-data.model';
import { RuleDto } from 'src/app/modules/trade-management/models/rule-dto.model';
import { EntryExitRuleService } from 'src/app/modules/trade-management/services/entry-exit-rule.service';
import { AddTradeConfirmationPopupComponent } from '../../add-trade-confirmation-popup/add-trade-confirmation-popup.component';
import { RuleCommentDialogComponent } from '../../rule-comment-dialog/rule-comment-dialog.component';

@Component({
  selector: 'app-exit-rules',
  templateUrl: './exit-rules.component.html',
  styleUrls: ['./exit-rules.component.scss']
})
export class ExitRulesComponent implements OnInit {

  exitRules: RuleDto[] = [];
  ruleGridColumns = ['msg', 'aligned', 'comment'];

  @Input("inputState") inputState: TradeInputData;

  @Input("addTrade") addTrade: boolean;
  @Input("editTrade") editTrade: boolean;
  @Input("closeTrade") closeTrade: boolean;
  @Input("viewTrade") viewTrade: boolean;
  @Output('prevStep') prevStep = new EventEmitter();

  protected hideExitRules: boolean = false;
  tradeStatus: number;
  constructor(
    private _dialog: MatDialog,
    private router: Router,
    private entryExitRuleService: EntryExitRuleService) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    console.log('exit rules child view init:', this.inputState);
    this.closeTrade = false;
    //No state initialization in exit rules
    let type = 'Exit';
    this.tradeStatus = this.inputState.tradeStrategy.statusId;
    if (this.inputState != undefined) {
      this.entryExitRuleService.getTradeExitRules(this.inputState.tradeStrategy.id).subscribe(result => {
        this.exitRules = result;
      });
    } else {
      this.entryExitRuleService.getExitRules().subscribe(result => {
        this.exitRules = result;
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

  showExitRules() {
    this.hideExitRules = !this.hideExitRules
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
