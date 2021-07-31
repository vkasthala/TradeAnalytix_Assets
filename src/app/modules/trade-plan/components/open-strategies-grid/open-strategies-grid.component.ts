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
  public hideRuleContent: boolean[] = [];
  protected openStategiesGridData: any;

  strategiesGridColumns: string[] = ['symbol', 'strategyType', 'returnAmount', 'maxRisk', 'maxProfit', 'actionText', 'editColumn'];

  @Input('tradePlanId') tradePlanId: number;
  @Input('viewTradePlan') viewTradePlan: boolean;

  constructor(private tradePlanService: TradePlansService, private _dialog: MatDialog) {

  }

  ngOnInit() {
    if (this.tradePlanId > 0) {
      this.strategiesGridColumns.push('aligned');
    }
    this.loadStrategies();

  }

  loadStrategies() {
    console.log('open strategies-- trade plan id: ', this.tradePlanId);
    if (this.tradePlanId > 0) {
      this.tradePlanService.getTradePlanStrategies(this.tradePlanId).subscribe(result => {
        this.strategiesDataSource = result;
        //console.log('test rs2', result);
        this.openStategiesGridData = result;
      });
    } else {
      this.tradePlanService.getOpenStrategies().subscribe(result => {
        this.strategiesDataSource = result;
        this.openStategiesGridData = result;
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
  Collaps(index: number) {
    // this.expandedIndex[index] = !this.expandedIndex[index];
    this.hideRuleContent[index] = !this.hideRuleContent[index];
  }
}
