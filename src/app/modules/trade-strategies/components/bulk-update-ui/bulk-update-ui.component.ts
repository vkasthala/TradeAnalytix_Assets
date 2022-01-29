import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ColDef } from 'ag-grid-community';
import { BulkStrategyUpdateModel } from '../../models/bulk-strategy-update-model.model';

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
    { field: 'tags', headerName: 'Tags' },
    { field: 'source', headerName: 'Source' }
  ];


  constructor(public dialogRef: MatDialogRef<BulkUpdateUiComponent>,
    @Inject(MAT_DIALOG_DATA) data) { }

  ngOnInit() {
  }

}
