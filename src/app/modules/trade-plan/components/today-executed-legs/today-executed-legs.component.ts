import { Component, Input, OnInit } from '@angular/core';
import { TodayExecutedLeg } from '../../models/today-executed-leg.model';
import { TodayExecutedTrade } from '../../models/today-executed-trade.model';
import { TradePlanEntry } from '../../models/trade-plan-entry.model';
import { TradePlansService } from '../../services/trade-plans.service';

@Component({
  selector: 'app-today-executed-legs',
  templateUrl: './today-executed-legs.component.html',
  styleUrls: ['./today-executed-legs.component.scss']
})
export class TodayExecutedLegsComponent implements OnInit {

  @Input('selectedPlan') selectedPlan: TradePlanEntry;

  todayExecutedGridColumns: string[] = ['symbol', 'strategyUid', 'amount', 'maxRisk', 'returnAmount'];

  todayExecutedTrades: TodayExecutedTrade[] = [];

  todayExecutedLegsDatasource: TodayExecutedLeg[] = [];
  todayexecutedGridData: TodayExecutedLeg[] = [];
  public hideRuleContent: boolean[] = [];
  @Input('day') day: string;

  constructor(private tradePlanService: TradePlansService) { }

  ngOnInit() {
    console.log('day::', this.day);
    // this.loadTodayExecutedLegs();
  }

  loadTodayExecutedLegs(day) {
    this.tradePlanService.getTodayExecutedTrades(day).subscribe(result => {
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
