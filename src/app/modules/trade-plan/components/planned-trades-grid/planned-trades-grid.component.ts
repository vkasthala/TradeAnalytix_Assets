import { Component, OnInit, Input } from '@angular/core';
import { PlannedTrade } from '../../models/planned-trade.model';
import { TradePlansService } from '../../services/trade-plans.service';

@Component({
  selector: 'app-planned-trades-grid',
  templateUrl: './planned-trades-grid.component.html',
  styleUrls: ['./planned-trades-grid.component.scss']
})
export class PlannedTradesGridComponent implements OnInit {

  plannedTradesDataSource: PlannedTrade[];

  plannedTradesGridColumns: string[] = ['symbol', 'strategyType', 'actionType', 'maxRisk', 'profit', 'reason'];

  @Input('tradePlanId') tradePlanId: number;

  constructor(private tradePlanService: TradePlansService) {
    this.loadPlannedTrades();
  }

  ngOnInit() {

  }

  loadPlannedTrades() {
    if (this.tradePlanId > 0) {
      this.tradePlanService.getPlannedTrades(this.tradePlanId).subscribe(result => {
        this.plannedTradesDataSource = result;
      });
    }
  }

}
