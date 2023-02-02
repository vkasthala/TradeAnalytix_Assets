import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TradePlanEntry } from '../../models/trade-plan-entry.model';
import { TradePlanStrategy } from '../../models/trade-plan-strategy.model';
import { TradePlansService } from '../../services/trade-plans.service';
import { StrategyActionTextDialogComponent } from '../strategy-action-text-dialog/strategy-action-text-dialog.component';

@Component({
  selector: 'app-open-strategies-grid',
  templateUrl: './open-strategies-grid.component.html',
  styleUrls: ['./open-strategies-grid.component.scss']
})
export class OpenStrategiesGridComponent implements OnInit, AfterViewInit {

  strategiesDataSource: TradePlanStrategy[];
  public hideRuleContent: boolean[] = [];
  protected openStategiesGridData: any;

  @Input('selectedPlan') selectedPlan: TradePlanEntry;

  strategiesGridColumns: string[] = ['symbol', 'strategyUid', 'totalAmount', 'maxRisk', 'returnAmount'];

  @Input('tradePlanId') tradePlanId: number;
  @Input('viewTradePlan') viewTradePlan: boolean;

  constructor(private tradePlanService: TradePlansService, private _dialog: MatDialog) {

  }

  ngOnInit() {
    // if (this.tradePlanId > 0) {
    //   this.strategiesGridColumns.push('aligned');
    // }
    // this.loadStrategies();

  }

  ngAfterViewInit(): void {
    if (this.selectedPlan) {
      this.loadStrategies(this.selectedPlan.id);
    }
  }

  loadStrategies(tradePlanId: number) {
    console.log('open strategies-- trade plan id: ', tradePlanId);
    if (tradePlanId > 0) {
      this.tradePlanService.getTradePlanStrategies(tradePlanId).subscribe(result => {
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

  onActionTextEdit(ele: TradePlanStrategy, commentType: string) {
    let dialogData: any = {
      actionText: 'Pre-Market Comments' === commentType ? ele.preMarketComment : ele.postMarketComment,
      title: commentType
    };
    const dialogRef = this._dialog.open(StrategyActionTextDialogComponent, {
      disableClose: false,
      width: 'auto',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe((res) => {
      console.log('after:', res);
      if ('Pre-Market Comments' === commentType) {
        ele.preMarketComment = res.actionText;
      } else {
        ele.postMarketComment = res.actionText;
      }
    });
  }
  Collaps(index: number) {
    // this.expandedIndex[index] = !this.expandedIndex[index];
    this.hideRuleContent[index] = !this.hideRuleContent[index];
  }
}
