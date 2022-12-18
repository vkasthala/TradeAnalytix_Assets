import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ColDef, ColGroupDef, ICellEditorParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { UserTagService } from 'src/app/modules/settings/services/user-tag.service';
import { SourceType } from 'src/app/modules/trade-management/models/source-type.model';
import { BulkStrategyUpdateModel } from './models/bulk-strategy-update-model.model';
import { TradeStrategyGridService } from './services/trade-strategy-grid.service';
import { CloseEventEditorComponent } from './close-event-editor/close-event-editor.component';
import { CloseSourceEditorComponent } from './close-source-editor/close-source-editor.component';
import { ContrarianEditorComponent } from './contrarian-editor/contrarian-editor.component';
import { DirectionEditorComponent } from './direction-editor/direction-editor.component';
import { EventEditorComponent } from './event-editor/event-editor.component';
import { MindsetEditorComponent } from './mindset-editor/mindset-editor.component';
import { PlannedEditorComponent } from './planned-editor/planned-editor.component';
import { SourceEditorComponent } from './source-editor/source-editor.component';
import { TechnicalIndicatorEditorComponent } from './technical-indicator-editor/technical-indicator-editor.component';
import { DemoModeDetailsService } from '../shared/services/demo-mode-details.service';

@Component({
  selector: 'app-bulk-update',
  templateUrl: './bulk-update.component.html',
  styleUrls: ['./bulk-update.component.scss']
})
export class BulkUpdateComponent implements OnInit {

  test: ICellEditorParams;
  strategies: BulkStrategyUpdateModel[] = [];
  Loader: boolean = false;

  sourceTypes: SourceType[] = [];

  // columnDefs: ColDef[] = [];
  columnDefs: (ColDef | ColGroupDef)[];
  private gridApi;
  private frameworkComponents;
  isDemoMode: boolean = false;
  constructor(
    private tradeStrategyGridService: TradeStrategyGridService,
    private userTagService: UserTagService,
    private toastr: ToastrService,
    private demoService: DemoModeDetailsService,
  ) { }

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
      { field: 'symbol', headerName: 'Symbol', resizable: true, width: 100, cellClass: 'read-only-cell', filter: 'agTextColumnFilter' },
      { field: 'uid', headerName: 'Strategy ID', resizable: true, width: 110, cellClass: 'read-only-cell', filter: 'agTextColumnFilter' },
      

      { 
        headerName: "Details",
        width: 140,
        resizable: true,
        children: [
          { field: 'status', headerName: 'Status', resizable: true, width: 90, cellClass: 'read-only-cell', filter: 'agTextColumnFilter' },
          { 
            headerName: "Strategy Type",
            field: 'strategyType',
            columnGroupShow: 'open',
            width: 100, 
          },
          { 
            headerName: 'Direction',
            field: 'direction', editable: true, cellEditor: 'directionEditor', resizable: true, width: 100, filter: 'agTextColumnFilter',
            columnGroupShow: 'open',
          },
          { 
            headerName: 'Contrarian',
            field: 'contrarian',  editable: true, cellEditor: 'contrarianEditor', resizable: true, width: 100, filter: 'agTextColumnFilter',
            columnGroupShow: 'open',
          },
          {
            headerName: 'Planned Trade',
            field: 'planned', editable: true, resizable: true, width: 140, cellEditor: 'plannedEditor', filter: 'agTextColumnFilter', cellRenderer: prms => {
              if (!prms.data.tradeType) {
                return "";
              }
              return prms.data.tradeType === 'planned' ? 'Yes' : 'No';
            },
            columnGroupShow: 'open',
          },
          { 
            headerName: "Amount",
            field: 'totalAmount',
            columnGroupShow: 'open',
            width: 100, 
          },
          { 
            headerName: 'Realized Return',
            field: 'realizedReturn', 
            columnGroupShow: 'open',
            width: 140, 
          }
        ]
      },

      { field: 'tags', headerName: 'Tags', editable: true, resizable: true, width: 180, filter: 'agTextColumnFilter',
      autoHeight: true,
      cellClass: 'autoHeight-cell',
    },

      { field: 'tradeThesis', headerName: 'Trade Thesis', resizable: true, width: 220, filter: 'agTextColumnFilter',
      cellClass: 'autoHeight-cell',
        autoHeight: true,
      },

      { field: 'source', headerName: 'Source', editable: true, cellEditor: 'sourceEditor', resizable: true, width: 90, filter: 'agTextColumnFilter' },

      { field: 'targetPrice', headerName: 'Target Price', editable: true, resizable: true, width: 120, filter: 'agTextColumnFilter' },
      { field: 'targetCloseDate', headerName: 'Target Close Date', editable: true, resizable: true, width: 160, filter: 'agTextColumnFilter' },
      { field: 'technicalIndicator', headerName: 'Technical Indicator', resizable: true, editable: true, cellEditor: 'technicalIndicatorEditor', width: 160, filter: 'agTextColumnFilter' },
      { field: 'event', headerName: 'Events', editable: true, cellEditor: 'eventEditor', resizable: true, width: 100, filter: 'agTextColumnFilter' },
      { field: 'mindset', headerName: 'Mindset', editable: true, cellEditor: 'mindsetEditor', resizable: true, width: 110, filter: 'agTextColumnFilter' },

      // { field: 'openDate', headerName: 'Open Date', resizable: true, width: 110, cellClass: 'read-only-cell', filter: 'agTextColumnFilter' },
      // { field: 'totalAmount', headerName: 'Amount', resizable: true, width: 100, cellClass: 'read-only-cell', filter: 'agTextColumnFilter' },
      // { field: 'reason', headerName: ' Reasons for the trade', editable: true, resizable: true, width: 180, filter: 'agTextColumnFilter' },
      // { field: 'closeSource', headerName: 'Trigger for Closure', editable: true, cellEditor: 'closeSourceEditor', resizable: true, width: 150, filter: 'agTextColumnFilter' },
      // { field: 'closeReason', headerName: 'Reason for Closure', editable: true, width: 150, resizable: true, filter: 'agTextColumnFilter' },
      // { field: 'closeEvent', headerName: 'Gain or Loss Attributed To', editable: true, cellEditor: 'closeEventEditor', width: 200, resizable: true, filter: 'agTextColumnFilter' },
      // { field: 'closeLesson', headerName: 'Lessons Learnt', editable: true, width: 300, resizable: true, filter: 'agTextColumnFilter' }
    ];
    this.isDemoMode = this.demoService.demoMode;
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
    }, err => {
      this.Loader = false;
      this.toastr.error('Failed to update strategies', 'Error');
    });
  }


  onGridReady(params) {
    this.gridApi = params.api;
    params.api.sizeColumnsToFit()
  }

  onCallValueDataChangeStart($event) {
    $event.data.dirty = true;
  }

}
