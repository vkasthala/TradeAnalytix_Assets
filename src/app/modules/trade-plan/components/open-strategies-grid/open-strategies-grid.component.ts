import { Component, OnInit, Input } from '@angular/core';
import { TradePlanStrategy } from '../../models/trade-plan-strategy.model';
import { TradePlansService } from '../../services/trade-plans.service';

@Component({
  selector: 'app-open-strategies-grid',
  templateUrl: './open-strategies-grid.component.html',
  styleUrls: ['./open-strategies-grid.component.scss']
})
export class OpenStrategiesGridComponent implements OnInit {

  strategiesDataSource: TradePlanStrategy[];

  strategiesGridColumns: string[] = ['symbol', 'strategyType', 'returnAmount', 'maxRisk', 'maxProfit', 'actionText'];

  @Input('tradePlanId') tradePlanId: number;

  constructor(private tradePlanService: TradePlansService) {
    this.loadStrategies();
  }

  ngOnInit() {
    
  }

  loadStrategies() {
    if (this.tradePlanId > 0) {
      this.tradePlanService.getTradePlanStrategies(this.tradePlanId).subscribe(result => {
        this.strategiesDataSource = result;
      });
    } else {
      this.tradePlanService.getOpenStrategies().subscribe(result => {
        this.strategiesDataSource = result;
      });
    }
  }

}
