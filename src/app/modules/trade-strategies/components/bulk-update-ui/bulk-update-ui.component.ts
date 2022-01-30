import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ColDef } from 'ag-grid-community';
import { BulkStrategyUpdateModel } from '../../models/bulk-strategy-update-model.model';
import { TradeStrategyGridService } from '../../services/trade-strategy-grid.service';

@Component({
  selector: 'app-bulk-update-ui',
  templateUrl: './bulk-update-ui.component.html',
  styleUrls: ['./bulk-update-ui.component.scss']
})
export class BulkUpdateUiComponent implements OnInit {

  strategies: BulkStrategyUpdateModel[] = [];

  columnDefs: ColDef[] = [
    { field: 'uid', headerName: 'ID' },
    { field: 'symbol', headerName: 'Symbol' },
    { field: 'status', headerName: 'Status' },
    { field: 'openDate', headerName: 'Open Date' },
    { field: 'totalAmount', headerName: 'Total Amount' },
    { field: 'tags', headerName: 'Tags', editable: true },
    { field: 'source', headerName: 'Source', editable: true },
    { field: 'reason', headerName: ' Reasons for the trade', editable: true },
    { field: 'targetPrice', headerName: 'Target price', editable: true },
    { field: 'targetCloseDate', headerName: 'Target Close Date', editable: true },
    { field: 'Contrarian', headerName: 'Contrarian Trade', editable: true },
    { field: 'direction', headerName: 'Direction', editable: true },
    { field: 'technicalIndicator', headerName: 'Technical Indicator', editable: true },
    { field: 'events', headerName: 'Events', editable: true },
    { field: 'planned', headerName: 'Planned Trade', editable: true },
    { field: 'mindSet', headerName: 'Mindset', editable: true },
    { field: 'closeTrigger', headerName: 'Trigger for Closure', editable: true },
    { field: 'closeReason', headerName: 'Reason for Closure', editable: true },
    { field: 'gainLossAttribute', headerName: 'Gain or loss attributed to', editable: true },
    { field: 'lessons', headerName: 'Lessons learnt', editable: true }
  ];


  constructor(public dialogRef: MatDialogRef<BulkUpdateUiComponent>,
    @Inject(MAT_DIALOG_DATA) data, private tradeStrategyGridService: TradeStrategyGridService) { }

  ngOnInit() {
    this.tradeStrategyGridService.loadTradeStrategiesForBulkUpdate().subscribe(result => {
      this.strategies = result;
    });
  }

  closeModal() {
    this.dialogRef.close();
  }

}
