import { Component, Input, OnInit } from '@angular/core';
import { TodayExecutedLeg } from '../../models/today-executed-leg.model';
import { TradePlansService } from '../../services/trade-plans.service';

@Component({
  selector: 'app-today-executed-legs',
  templateUrl: './today-executed-legs.component.html',
  styleUrls: ['./today-executed-legs.component.scss']
})
export class TodayExecutedLegsComponent implements OnInit {

  todayExecutedGridColumns: string[] = ['strategyUid', 'symbol', 'action', 'quantity', 'strike', 'expiryDate', 'optionType', 'entryPrice', 'exitPrice'];

  todayExecutedLegsDatasource: TodayExecutedLeg[] = [];
  todayexecutedGridData: TodayExecutedLeg[] = [];
  public hideRuleContent: boolean[] = [];
  @Input('day') day: string;

  constructor(private tradePlanService: TradePlansService) { }

  ngOnInit() {
    console.log('day::', this.day);
    this.loadTodayExecutedLegs();
  }

  loadTodayExecutedLegs() {
    this.tradePlanService.getTodayExecutedLegs(this.day).subscribe(result => {
      console.log('today legs::', result);
      this.todayExecutedLegsDatasource = result;
      this.todayexecutedGridData = result;
    });
  }

  Collaps(index: number) {
    // this.expandedIndex[index] = !this.expandedIndex[index];
    this.hideRuleContent[index] = !this.hideRuleContent[index];
  }

}
