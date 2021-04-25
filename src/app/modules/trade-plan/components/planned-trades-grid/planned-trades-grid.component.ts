import { Component, OnInit, Input } from '@angular/core';
import { PlannedTrade } from '../../models/planned-trade.model';
import { TradePlansService } from '../../services/trade-plans.service';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material';
import { PlannedTradeDialogComponent } from '../planned-trade-dialog/planned-trade-dialog.component';

@Component({
  selector: 'app-planned-trades-grid',
  templateUrl: './planned-trades-grid.component.html',
  styleUrls: ['./planned-trades-grid.component.scss']
})
export class PlannedTradesGridComponent implements OnInit {

  plannedTradesDataSource: PlannedTrade[] = [];

  plannedTradesGridColumns: string[] = ['symbol', 'strategyType', 'actionType', 'maxRisk', 'profit', 'reason', 'actions'];

  @Input('tradePlanId') tradePlanId: number;

  constructor(private tradePlanService: TradePlansService, private _dialog: MatDialog) {

  }

  ngOnInit() {
    if (this.tradePlanId > 0) {
      this.plannedTradesGridColumns.push('executed');
    }
    this.loadPlannedTrades();
  }

  loadPlannedTrades() {
    if (this.tradePlanId > 0) {
      this.tradePlanService.getPlannedTrades(this.tradePlanId).subscribe(result => {
        this.plannedTradesDataSource = result;
      });
    }
  }

  openPlannedTradeDialog() {
    let dialogData: PlannedTrade = new PlannedTrade();
    const dialogRef = this._dialog.open(PlannedTradeDialogComponent, {
      disableClose: false,
      width: 'auto',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe((res) => {
      console.log('after:', res);
      this.plannedTradesDataSource.push(res);
      let cloned = this.plannedTradesDataSource.slice()
      this.plannedTradesDataSource = cloned;
    });
  }

  getPlannedTrades(): PlannedTrade[] {
    return this.plannedTradesDataSource;
  }

}
