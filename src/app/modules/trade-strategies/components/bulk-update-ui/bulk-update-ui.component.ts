import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ColDef, ICellEditorParams } from 'ag-grid-community';
import { retry } from 'rxjs/operators';
import { SourceType } from 'src/app/modules/trade-management/models/source-type.model';
import { UserMetadataService } from 'src/app/modules/trade-management/services/user-metadata.service';
import { BulkStrategyUpdateModel } from '../../models/bulk-strategy-update-model.model';
import { TradeStrategyGridService } from '../../services/trade-strategy-grid.service';
import { SourceEditorComponent } from './source-editor/source-editor.component';

@Component({
  selector: 'app-bulk-update-ui',
  templateUrl: './bulk-update-ui.component.html',
  styleUrls: ['./bulk-update-ui.component.scss']
})
export class BulkUpdateUiComponent implements OnInit {

  test: ICellEditorParams;
  strategies: BulkStrategyUpdateModel[] = [];

  sourceTypes: SourceType[] = [];

  columnDefs: ColDef[] = [];

  private frameworkComponents;


  constructor(public dialogRef: MatDialogRef<BulkUpdateUiComponent>,
    @Inject(MAT_DIALOG_DATA) data, private tradeStrategyGridService: TradeStrategyGridService, private metadataService: UserMetadataService) { }

  ngOnInit() {
    this.frameworkComponents = {
      sourceEditor: SourceEditorComponent
    };
    this.initColumnDefns();
    this.tradeStrategyGridService.loadTradeStrategiesForBulkUpdate().subscribe(result => {
      this.strategies = result;
    });
  }

  initColumnDefns() {
    this.columnDefs = [
      { field: 'uid', headerName: 'ID' },
      { field: 'symbol', headerName: 'Symbol' },
      { field: 'status', headerName: 'Status' },
      { field: 'openDate', headerName: 'Open Date' },
      { field: 'totalAmount', headerName: 'Total Amount' },
      { field: 'tags', headerName: 'Tags', editable: true },
      { field: 'source', headerName: 'Source', editable: true, cellEditor: 'sourceEditor' },
      { field: 'reason', headerName: ' Reasons for the trade', editable: true },
      { field: 'targetPrice', headerName: 'Target price', editable: true },
      { field: 'targetCloseDate', headerName: 'Target Close Date', editable: true },
      { field: 'contrarian', headerName: 'Contrarian Trade', editable: true },
      { field: 'direction', headerName: 'Direction', editable: true },
      { field: 'technicalIndicator', headerName: 'Technical Indicator', editable: true },
      { field: 'event', headerName: 'Events', editable: true },
      { field: 'planned', headerName: 'Planned Trade', editable: true },
      { field: 'mindset', headerName: 'Mindset', editable: true },
      { field: 'closeSource', headerName: 'Trigger for Closure', editable: true },
      { field: 'closeReason', headerName: 'Reason for Closure', editable: true },
      { field: 'closeEvent', headerName: 'Gain or loss attributed to', editable: true },
      { field: 'lessons', headerName: 'Lessons learnt', editable: true }
    ];
  }

  closeModal() {
    this.dialogRef.close();
  }

  loadSourceTypes() {
    this.metadataService.getTradeSourceTypes().subscribe(result => {
      this.sourceTypes = [];
      this.sourceTypes.push(new SourceType());
      this.sourceTypes = this.sourceTypes.concat(result);
    });
  }

  sourceValueSetter(params) {
    if (!this.sourceTypes) {
      return;
    }
    let entry = this.sourceTypes.find(refData => refData.name == params.newValue);
    if (entry) {
      params.data.sourceId = entry.id;
    }
    return true;
  }

  sourceValueGetter(params) {
    debugger;
    if (!this.sourceTypes) {
      return "";
    }
    let entry = this.sourceTypes.find(refData => refData.id == params.data.id);
    if (entry) {
      return entry.name;
    }
    return "";
  }

}
