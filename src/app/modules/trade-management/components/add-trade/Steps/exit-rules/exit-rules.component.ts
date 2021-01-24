import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AddTradeConfirmationPopupComponent } from '../../add-trade-confirmation-popup/add-trade-confirmation-popup.component';
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

  @Input("addTrade") addTrade: boolean;
  @Input("editTrade") editTrade: boolean;
  @Input("closeTrade") closeTrade: boolean;
  @Input("vieweTrade") vieweTrade: boolean;
  @Output('prevStep') prevStep = new EventEmitter();

  exitRules: EntryExitRule[] = this.entryExitRuleService.getExitRules();
  protected hideExitRules: boolean = false;
  constructor(
    private _dialog: MatDialog,
    private router: Router,
    private entryExitRuleService: EntryExitRuleService) { }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    console.log('exit rules child view init:', this.inputState);
    //No state initialization in exit rules
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
  showExitRules(){
    this.hideExitRules = !this.hideExitRules
  }

}
