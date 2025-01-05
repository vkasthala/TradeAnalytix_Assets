import { Component, Input, OnInit } from '@angular/core';
import { TodayExecutedLeg } from '../../models/today-executed-leg.model';
import { TodayExecutedTrade } from '../../models/today-executed-trade.model';
import { TradePlanEntry } from '../../models/trade-plan-entry.model';
import { TradePlansService } from '../../services/trade-plans.service';
import { OmsService } from 'src/app/modules/shared/services/oms.service';

@Component({
  selector: 'app-today-executed-legs',
  templateUrl: './today-executed-legs.component.html',
  styleUrls: ['./today-executed-legs.component.scss']
})
export class TodayExecutedLegsComponent implements OnInit {

  @Input('selectedPlan') selectedPlan: TradePlanEntry;

  todayExecutedGridColumns: string[] = ['orderType', 'symbol', 'productType', 'quantity', 'executedPrice', 'action', 'timestamp'];

  todayExecutedTrades: TodayExecutedTrade[] = [];

  todayExecutedLegsDatasource: TodayExecutedLeg[] = [];
  todayexecutedGridData: TodayExecutedLeg[] = [];
  public hideRuleContent: boolean[] = [];
  @Input('day') day: string;

  constructor(private tradePlanService: TradePlansService, 
    private omsService: OmsService) { }

  ngOnInit() {
    console.log('day::', this.selectedPlan.day);
    this.loadTodayExecutedLegs(this.selectedPlan.day);
  }

  loadTodayExecutedLegs(day) {
    this.omsService.getTodayExecutedTrades(day).subscribe(result => {
      this.todayExecutedTrades = result;
    });
    // this.tradePlanService.getTodayExecutedLegs(this.day).subscribe(result => {
    //   console.log('today legs::', result);
    //   this.todayExecutedLegsDatasource = result;
    //   this.todayexecutedGridData = result;
    // });
  }

  Collaps(index: number) {
    // this.expandedIndex[index] = !this.expandedIndex[index];
    this.hideRuleContent[index] = !this.hideRuleContent[index];
  }

}
