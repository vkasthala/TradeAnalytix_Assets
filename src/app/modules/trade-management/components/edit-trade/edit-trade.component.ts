import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AddNewTradeComponent } from '../add-trade/add-new-trade.component';
import { UserStockStatsService } from 'src/app/modules/shared/services/user-stock-stats.service';
import { TradeStrategyService } from '../../services/trade-strategy.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { RiskAnalysisService } from 'src/app/modules/risk-analysis/services/risk-analysis.service';
import { EntryExitRuleService } from '../../services/entry-exit-rule.service';

@Component({
  selector: 'app-edit-trade',
  templateUrl: '../add-trade/add-new-trade.component.html',
  styleUrls: ['../add-trade/add-new-trade.component.scss']
})
export class EditTradeComponent extends AddNewTradeComponent implements OnInit {

  constructor(
    userStockStatsService: UserStockStatsService,
    tradeStrategyService: TradeStrategyService,
    riskAnalysisService: RiskAnalysisService,
    entryExitRuleService: EntryExitRuleService,
    router: Router,
    toastr: ToastrService,
    _dialog: MatDialog) {
    super(userStockStatsService, tradeStrategyService, riskAnalysisService, entryExitRuleService, router, toastr, _dialog);
    this.edit = true;
    this.close = false;
    this.add = false;
    this.view = false;
  }

  ngOnInit() {
    this.setState();
  }

  isValidTradeStrategy(): boolean {
    return super.isValidTradeStrategy();
  }

}
