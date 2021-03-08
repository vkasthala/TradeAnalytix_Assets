import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TradePlanStrategy } from '../../models/trade-plan-strategy.model';
import { TradePlansService } from '../../services/trade-plans.service';
import { StrategyActionTextDialogComponent } from '../strategy-action-text-dialog/strategy-action-text-dialog.component';

@Component({
  selector: 'app-open-strategies-grid',
  templateUrl: './open-strategies-grid.component.html',
  styleUrls: ['./open-strategies-grid.component.scss']
})
export class OpenStrategiesGridComponent implements OnInit {

  strategiesDataSource: TradePlanStrategy[];

  strategiesGridColumns: string[] = ['symbol', 'strategyType', 'returnAmount', 'maxRisk', 'maxProfit', 'actionText'];

  @Input('tradePlanId') tradePlanId: number;

  constructor(private tradePlanService: TradePlansService, private _dialog: MatDialog) {
  
  }

  ngOnInit() {
    if(this.tradePlanId > 0){
      this.strategiesGridColumns.push('aligned');
    }
    this.loadStrategies();
  }

  loadStrategies() {
    console.log('open strategies-- trade plan id: ', this.tradePlanId);
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

  getOpenStrategies(): TradePlanStrategy[] {
    return this.strategiesDataSource;
  }

  onActionTextEdit(ele: TradePlanStrategy) {
    let dialogData: any = {
      actionText: ele.actionText
    };
    const dialogRef = this._dialog.open(StrategyActionTextDialogComponent, {
      disableClose: false,
      width: 'auto',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe((res) => {
      console.log('after:', res);
      ele.actionText = res.actionText;
    });
  }

}
