import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TradeDetailsAsideComponent } from './components/add-trade/trade-details-aside/trade-details-aside.component';
// import { ProﬁtPotentialComponent } from './components/add-trade/proﬁt-potential/proﬁt-potential.component';
import { TradeDetailsBottomComponent } from './components/add-trade/trade-details-bottom/trade-details-bottom.component';
import { RuleCommentDialogComponent } from './components/add-trade/rule-comment-dialog/rule-comment-dialog.component';

@NgModule({
  declarations: [TradeDetailsAsideComponent, TradeDetailsBottomComponent, RuleCommentDialogComponent],
  imports: [
    CommonModule
  ]
})
export class TradeManagementModule { }
