import { Component, OnInit, Input } from '@angular/core';
import { PlannedTrade } from '../../models/planned-trade.model';
import { TradePlansService } from '../../services/trade-plans.service';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material';
import { PlannedTradeDialogComponent } from '../planned-trade-dialog/planned-trade-dialog.component';
import { ConfirmDialogComponent } from 'src/app/modules/shared/components/modals/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-planned-trades-grid',
  templateUrl: './planned-trades-grid.component.html',
  styleUrls: ['./planned-trades-grid.component.scss']
})
export class PlannedTradesGridComponent implements OnInit {

  plannedTradesDataSource: PlannedTrade[] = [];

  plannedTradesGridColumns: string[] = ['strategyUid', 'symbol', 'strategyType', 'maxRisk', 'amount', 'reason', 'actions'];

  public hideRuleContent: boolean[] = [];
  protected planOpenGridData: any;

  tradePlanId: number;
  viewTradePlan: boolean;

  //@Input('tradePlanId') tradePlanId: number;
  //@Input('viewTradePlan') viewTradePlan: boolean;
  
  constructor(private tradePlanService: TradePlansService, private _dialog: MatDialog) {

  }

  ngOnInit() {
    // if (this.tradePlanId > 0) {
    //   this.plannedTradesGridColumns.push('executed');
    // }
    // this.loadPlannedTrades();    
  }

  initPlannedTradesGrid(tradePlanId: number, view: boolean) {
    this.tradePlanId = tradePlanId;
    this.viewTradePlan = view;
    /*
    if (this.tradePlanId > 0) {
      this.plannedTradesGridColumns.push('executed');
    }
    */
    this.loadPlannedTrades();
  }

  loadPlannedTrades() {
    if (this.tradePlanId > 0) {
      this.tradePlanService.getPlannedTrades(this.tradePlanId).subscribe(result => {
        this.plannedTradesDataSource = result;
        this.planOpenGridData = result;
        console.log("test 3 rs", this.planOpenGridData);
      });
    }
  }

  deletePlannedTrade(ind: number) {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      width: 'auto',
      height: 'auto',
      data: { 'message': 'Are you sure you want to delete?' }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        this.plannedTradesDataSource.splice(ind, 1)
        this.plannedTradesDataSource = this.plannedTradesDataSource.slice();
      }
    });

  }

  openPlannedTradeDialog(plannedTrade: PlannedTrade, ind: number) {
    let dialogData: PlannedTrade;
    if (!plannedTrade) {
      dialogData = new PlannedTrade();
    } else {
      dialogData = Object.create(plannedTrade);
    }

    const dialogRef = this._dialog.open(PlannedTradeDialogComponent, {
      disableClose: false,
      width: 'auto',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        console.log('result..', res);
        if (ind != undefined && ind > -1) {
          this.plannedTradesDataSource[ind] = res;
        } else {
          this.plannedTradesDataSource.push(res);
        }
        let cloned = this.plannedTradesDataSource.slice()
        this.plannedTradesDataSource = cloned;
      }
    });
  }

  getPlannedTrades(): PlannedTrade[] {
    return this.plannedTradesDataSource;
  }
  Collaps(index: number) {
    // this.expandedIndex[index] = !this.expandedIndex[index];
    this.hideRuleContent[index] = !this.hideRuleContent[index];
  }

}
