import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ColDef, ICellEditorParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { UserTagService } from 'src/app/modules/settings/services/user-tag.service';
import { SourceType } from 'src/app/modules/trade-management/models/source-type.model';
import { BulkStrategyUpdateModel } from '../../models/bulk-strategy-update-model.model';
import { TradeStrategyGridService } from '../../services/trade-strategy-grid.service';
import { CloseEventEditorComponent } from './close-event-editor/close-event-editor.component';
import { CloseSourceEditorComponent } from './close-source-editor/close-source-editor.component';
import { ContrarianEditorComponent } from './contrarian-editor/contrarian-editor.component';
import { DirectionEditorComponent } from './direction-editor/direction-editor.component';
import { EventEditorComponent } from './event-editor/event-editor.component';
import { MindsetEditorComponent } from './mindset-editor/mindset-editor.component';
import { PlannedEditorComponent } from './planned-editor/planned-editor.component';
import { SourceEditorComponent } from './source-editor/source-editor.component';
import { TechnicalIndicatorEditorComponent } from './technical-indicator-editor/technical-indicator-editor.component';

@Component({
  selector: 'app-bulk-update-ui',
  templateUrl: './bulk-update-ui.component.html',
  styleUrls: ['./bulk-update-ui.component.scss']
})
export class BulkUpdateUiComponent implements OnInit {

  test: ICellEditorParams;
  strategies: BulkStrategyUpdateModel[] = [];
  Loader: boolean = false;

  sourceTypes: SourceType[] = [];

  columnDefs: ColDef[] = [];

  private gridApi;
  private frameworkComponents;

  constructor(public dialogRef: MatDialogRef<BulkUpdateUiComponent>,
    @Inject(MAT_DIALOG_DATA) data, private tradeStrategyGridService: TradeStrategyGridService, private userTagService: UserTagService, private toastr: ToastrService) { }

  ngOnInit() {
    this.frameworkComponents = {
      sourceEditor: SourceEditorComponent,
      technicalIndicatorEditor: TechnicalIndicatorEditorComponent,
      mindsetEditor: MindsetEditorComponent,
      eventEditor: EventEditorComponent,
      closeSourceEditor: CloseSourceEditorComponent,
      closeEventEditor: CloseEventEditorComponent,
      directionEditor: DirectionEditorComponent,
      contrarianEditor: ContrarianEditorComponent,
      plannedEditor: PlannedEditorComponent
    };
    this.initColumnDefns();
    this.Loader = true;
    this.tradeStrategyGridService.loadTradeStrategiesForBulkUpdate().subscribe(result => {
      this.Loader = false;
      this.strategies = result;
    }, err => {
      this.Loader = false;
      this.toastr.error('Failed to load strategies', 'Error');
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
      { field: 'contrarian', headerName: 'Contrarian Trade', editable: true, cellEditor: 'contrarianEditor' },
      { field: 'direction', headerName: 'Direction', editable: true, cellEditor: 'directionEditor' },
      { field: 'technicalIndicator', headerName: 'Technical Indicator', editable: true, cellEditor: 'technicalIndicatorEditor' },
      { field: 'event', headerName: 'Events', editable: true, cellEditor: 'eventEditor' },
      {
        field: 'planned', headerName: 'Planned Trade', editable: true, cellEditor: 'plannedEditor', cellRenderer: prms => {
          if (!prms.data.tradeType) {
            return "";
          }
          return prms.data.tradeType === 'planned' ? 'Yes' : 'No';
        }
      },
      { field: 'mindset', headerName: 'Mindset', editable: true, cellEditor: 'mindsetEditor' },
      { field: 'closeSource', headerName: 'Trigger for Closure', editable: true, cellEditor: 'closeSourceEditor' },
      { field: 'closeReason', headerName: 'Reason for Closure', editable: true },
      { field: 'closeEvent', headerName: 'Gain or loss attributed to', editable: true, cellEditor: 'closeEventEditor' },
      { field: 'closeLesson', headerName: 'Lessons learnt', editable: true }
    ];
  }

  onSave() {
    this.gridApi.stopEditing();
    this.Loader = true;
    const changedStrategies: BulkStrategyUpdateModel[] = this.strategies.filter(str => str.dirty === true);
    console.log('changed: ', changedStrategies);
    this.tradeStrategyGridService.saveBulkUpdateData(changedStrategies).subscribe(result => {
      this.Loader = false;
      this.toastr.success('Successfully updated ' + changedStrategies.length + ' strategies', 'Success');
      this.userTagService.loadTags();
      this.closeModal(true);
    }, err => {
      this.Loader = false;
      this.toastr.error('Failed to update strategies', 'Error');
    });
  }

  closeModal(data) {
    this.dialogRef.close(data);
  }

  onGridReady(params) {
    this.gridApi = params.api;
  }

  onCallValueDataChangeStart($event) {
    $event.data.dirty = true;
  }

}
