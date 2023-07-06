import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ColDef, GridApi,ColGroupDef, ICellEditorParams, GridReadyEvent,
  RowNode,
  RefreshCellsParams,
  CellEditingStoppedEvent,
  ICellEditorComp,
  RowValueChangedEvent,
  CellValueChangedEvent
 } from 'ag-grid-community';
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
import { TargetDateComponent } from './target-date/target-date.component';
import { TagEditorComponent } from './tag-editor/tag-editor.component';
import { StrategyEditorComponent } from './strategy-editor/strategy-editor.component';
import { ThesisEditorComponent } from './thesis-editor/thesis-editor.component';
import { UserMetadataStoreService } from '../shared/services/user-metadata-store.service';

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
  thesisValue: any;
  cellNewValue: any;


  constructor(
    private tradeStrategyGridService: TradeStrategyGridService,
    private userTagService: UserTagService,
    private toastr: ToastrService,
    private demoService: DemoModeDetailsService,
    private metadataStoreService: UserMetadataStoreService
  ) { }

  ngOnInit() {
    this.metadataStoreService.loadMetadata(false);
    this.frameworkComponents = {
      sourceEditor: SourceEditorComponent,
      technicalIndicatorEditor: TechnicalIndicatorEditorComponent,
      mindsetEditor: MindsetEditorComponent,
      eventEditor: EventEditorComponent,
      closeSourceEditor: CloseSourceEditorComponent,
      closeEventEditor: CloseEventEditorComponent,
      directionEditor: DirectionEditorComponent,
      contrarianEditor: ContrarianEditorComponent,
      plannedEditor: PlannedEditorComponent,
      targetCloseDate: TargetDateComponent,
      tagEditor: TagEditorComponent,
      strategyEditor: StrategyEditorComponent,
      thesisEditor: ThesisEditorComponent
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
      {
        headerName: "Trade Details ",
        resizable: true,
        children: [
          {
            field: 'symbol',
            headerName: 'Symbol', resizable: true,
            filter: 'agTextColumnFilter',
            width: 120,
            // cellClass: 'read-only-cell',
          },
          {
            field: 'status',
            headerName: 'Status',
            resizable: true,
            width: 120,
            filter: 'agTextColumnFilter',
            // cellClass: 'read-only-cell',
          },
          {
            headerName: "Identifier",
            field: 'uid',
            width: 120,
            filter: true,
            resizable: true,
            columnGroupShow: 'closed',
          },
          {
            headerName: "Strategy",
            field: 'strategyType',
            columnGroupShow: 'closed',
            width: 150,
            editable: true,
            filter: true,
            resizable: true,
            cellEditor: 'strategyEditor',
            headerComponentParams: { template: '<div class="d-flex"><span>Strategy</span><mat-icon class="mat-icon-xs mat-icon material-icons ml-1">edit</mat-icon></div>'}
          },
          {
            headerName: 'Direction',
            field: 'direction', editable: true, cellEditor: 'directionEditor', resizable: true,
            width: 120,
            filter: 'agTextColumnFilter',
            columnGroupShow: 'closed',
            headerComponentParams: { template: '<div class="d-flex"><span>Direction</span><mat-icon class="mat-icon-xs mat-icon material-icons ml-1">edit</mat-icon></div>'}
          },
          {
            headerName: 'Contrarian',
            field: 'contrarian', editable: true, cellEditor: 'contrarianEditor',
            resizable: true,
            width: 120,
            filter: 'agTextColumnFilter',
            columnGroupShow: 'closed',
            headerComponentParams: { template: '<div class="d-flex"><span>Contrarian</span><mat-icon class="mat-icon-xs mat-icon material-icons ml-1">edit</mat-icon></div>'}
          },
          {
            headerName: 'Planned',
            field: 'planned', editable: true, resizable: true, width: 120, cellEditor: 'plannedEditor', filter: 'agTextColumnFilter', cellRenderer: prms => {
              if (!prms.data.tradeType) {
                return "";
              }
              return prms.data.tradeType === 'planned' ? 'Yes' : 'No';
            },
            columnGroupShow: 'closed',
            headerComponentParams: { template: '<div class="d-flex"><span>Planned</span><mat-icon class="mat-icon-xs mat-icon material-icons ml-1">edit</mat-icon></div>'}
          },
        ]
      },
      {
        headerName: "Profit and Loss ",
        width: 200,
        resizable: true,
        children: [
          {
            headerName: "Cost of Trade",
            field: 'totalAmount',
            width: 145,
            resizable: true,
            filter: true,
            cellClass: 'justify-content-end'
          },
          {
            headerName: "Max Risk",
            field: 'maxRisk',
            width: 120,
            columnGroupShow: 'closed',
            resizable: true,
            filter: true,
            cellClass: 'justify-content-end'
          },
          {
            headerName: "Net R",
            field: 'netr',
            columnGroupShow: 'closed',
            width: 120,
            resizable: true,
            filter: true,
            cellClass: 'justify-content-end'
          },
          {
            headerName: 'Realized Return',
            field: 'realizedReturn',
            columnGroupShow: 'closed',
            width: 140,
            resizable: true,
            filter: true,
            cellClass: 'justify-content-end'
          }
        ]
      },
      {
        headerName: "Journal",
        width: 140,
        resizable: true,
        children: [
          {
            field: 'reason',
            headerName: 'Trade Thesis',
            resizable: true, width: 400,
            filter: 'agTextColumnFilter',
            cellClass: 'autoHeight-cell thesis-cell',
            cellEditor: 'thesisEditor',
            autoHeight: true,
            editable: true,
            headerComponentParams: { template: '<div class="d-flex"><span>Trade Thesis</span><mat-icon class="mat-icon-xs mat-icon material-icons ml-1">edit</mat-icon></div>'}
          },
          {
            field: 'tags', headerName: 'Tags', editable: true,
            width: 180,
            filter: 'agTextColumnFilter',
            cellClass: 'autoHeight-cell tags-cell',
            autoHeight: true,
            resizable: true,
            cellEditor: 'tagEditor',
            columnGroupShow: 'closed',
            cellRenderer: prms => {
              if (!prms.data.tags) {
                return "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
              }
              if (prms.data.tags) {
                let names: string[] = [];
                prms.data.tags.split(',').forEach(tag => {
                  if (tag && tag.length > 0) {
                    names.push(this.userTagService.getTagNameById(parseInt(tag)));
                  }
                });
                return names.join(', ');
              }
              return "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
            },
            headerComponentParams: { template: '<div class="d-flex"><span>Tags</span><mat-icon class="mat-icon-xs mat-icon material-icons ml-1">edit</mat-icon></div>'}
          },
          {
            field: 'targetPrice', headerName: 'Target Price', editable: true,
            resizable: true,
            width: 130,
            filter: 'agTextColumnFilter',
            columnGroupShow: 'closed',
            cellClass: 'justify-content-end targe-price',
            headerComponentParams: { template: '<div class="d-flex"><span>Target Price</span><mat-icon class="mat-icon-xs mat-icon material-icons ml-1">edit</mat-icon></div>'}
          },
          /*{ 
            field: 'targetCloseDate', headerName: 'Target Close Date', editable: true, resizable: true, width: 250, 
            filter: 'agTextColumnFilter',
            cellEditor: 'targetCloseDate',
          }, */
          {
            field: 'source', headerName: 'Source', editable: true, cellEditor: 'sourceEditor', resizable: true,
            width: 150,
            filter: 'agTextColumnFilter',
            columnGroupShow: 'closed',
            headerComponentParams: { template: '<div class="d-flex"><span>Source</span><mat-icon class="mat-icon-xs mat-icon material-icons ml-1">edit</mat-icon></div>'}
          },
          {
            field: 'technicalIndicator', headerName: 'Technical Indicator',
            resizable: true, editable: true, cellEditor: 'technicalIndicatorEditor',
            width: 170,
            filter: 'agTextColumnFilter',
            columnGroupShow: 'closed',
            headerComponentParams: { template: '<div class="d-flex"><span>Technical Indicator</span><mat-icon class="mat-icon-xs mat-icon material-icons ml-1">edit</mat-icon></div>'}
          },
          {
            field: 'event', headerName: 'Events', editable: true, cellEditor: 'eventEditor', resizable: true,
            width: 150,
            filter: 'agTextColumnFilter',
            columnGroupShow: 'closed',
            headerComponentParams: { template: '<div class="d-flex"><span>Events</span><mat-icon class="mat-icon-xs mat-icon material-icons ml-1">edit</mat-icon></div>'}
          },
          {
            field: 'mindset', headerName: 'Mindset', editable: true, cellEditor: 'mindsetEditor', resizable: true,
            width: 150,
            filter: 'agTextColumnFilter',
            columnGroupShow: 'closed',
            headerComponentParams: { template: '<div class="d-flex"><span>Mindset</span><mat-icon class="mat-icon-xs mat-icon material-icons ml-1">edit</mat-icon></div>'}
          }
        ]
      },
    ];
    this.isDemoMode = this.demoService.demoMode;
  }
  public defaultColDef: ColDef = {
    flex: 0,
    floatingFilter: true,
  };
  onSave() {
    this.gridApi.stopEditing();
    this.Loader = true;
    const changedStrategies: BulkStrategyUpdateModel[] = this.strategies.filter(str => str.dirty === true);
    console.log('changed: ', changedStrategies);
    this.tradeStrategyGridService.saveBulkUpdateData(changedStrategies).subscribe(result => {
      this.Loader = false;
      this.toastr.success('Successfully updated ' + changedStrategies.length + ' strategies', 'Success');
      this.userTagService.loadTags();
      this.strategies = [];
      this.refreshGrid();
    }, err => {
      this.Loader = false;
      this.toastr.error('Failed to update strategies', 'Error');
    });
  }


  onGridReady(params) {
    this.gridApi = params.api;
    // params.api.sizeColumnsToFit();
    //this.gridApi.columnApi.autoSizeColumns();
  }

  onCallValueDataChangeStart($event) {
    if($event.column.colId === "reason") {
      this.thesisValue = $event.value;
    }
    $event.data.dirty = true;
    this.gridApi.refreshCells();
  }

  onCellValueChanged(event: CellValueChangedEvent) {
    this.cellNewValue = event.newValue;
    let colName = event.column.getColId();
    if(this.cellNewValue !== undefined && colName === 'tags') {
      this.updateCellData();
    }
  }

  refreshGrid() {
    this.tradeStrategyGridService.loadTradeStrategiesForBulkUpdate().subscribe(result => {
      this.strategies = result;
    }, err => {
      this.toastr.error('Failed to load strategies', 'Error');
    });
  }

  onCellEditingStopped(event: CellEditingStoppedEvent) {
    this.cellNewValue = event.value;
    let colName = event.column.getColId();
    if(colName === "reason" && this.cellNewValue !== this.thesisValue) {
      this.updateCellData();
    }
  }

  updateCellData() {
    const changedStrategies: BulkStrategyUpdateModel[] = this.strategies.filter(str => str.dirty === true);
    this.tradeStrategyGridService.saveBulkUpdateData(changedStrategies).subscribe(result => {
      this.userTagService.loadTags();
      this.strategies = [];
      this.refreshGrid();
    }, err => {
      this.toastr.error('Failed to update strategies', 'Error');
    });
  }

}