import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { EditableListComponent } from 'src/app/modules/shared/components/widgets/editable-list/editable-list.component';
import { DataSetupService } from '../../services/data-setup.service';
import { EditableGridComponent } from 'src/app/modules/shared/components/widgets/editable-grid/editable-grid.component';
import { BockerageCommission } from '../../models/brockerage-commission.model';
import { EditableGridColumn } from 'src/app/modules/shared/models/common/editable-grid-column.model';
import { EditableListItem } from 'src/app/modules/shared/models/common/editable-list-item.model';
import { Subject } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/modules/shared/components/modals/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-datasetup',
  templateUrl: './datasetup.component.html',
  styleUrls: ['./datasetup.component.scss']
})
export class DatasetupComponent implements OnInit {

  @ViewChild('mindSetType', { static: false }) protected mindSetType: EditableListComponent;
  @ViewChild('technicalIndicator', { static: false }) protected technicalIndicator: EditableListComponent;
  @ViewChild('event', { static: false }) protected event: EditableListComponent;
  @ViewChild('tradeIdea', { static: false }) protected tradeIdea: EditableListComponent;

  @ViewChild('brokerageCommissions', { static: false }) protected brokerageCommissions: EditableGridComponent<BockerageCommission>;

  constructor(private dataSetupService: DataSetupService, private cdr: ChangeDetectorRef, private _dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.initBrockerageCommisionsGrid();
    this.initSourceTypes();
    this.initTechIndicators();
    this.initMindsetTypes();
    this.initSurrEventTypes();
    this.cdr.detectChanges();
  }

  initSourceTypes() {
    let addItemSubject: Subject<EditableListItem> = new Subject<EditableListItem>();
    let editItemSubject: Subject<EditableListItem> = new Subject<EditableListItem>();
    let deleteItemSubject: Subject<EditableListItem> = new Subject<EditableListItem>();
    addItemSubject.asObservable().subscribe(data => {
      this.dataSetupService.createSourceType(data).subscribe(data => {
        this.loadSourceItems();
      }, err => {
        console.log('error in creating source type: ', data)
      });
    });
    editItemSubject.asObservable().subscribe(data => {
      this.dataSetupService.updateSourceType(data).subscribe(data => {
        this.loadSourceItems();
      }, err => {
        console.log('error in editing source type: ', data)
      });
    });
    deleteItemSubject.asObservable().subscribe(data => {
      this.getDeleteDialog().afterClosed().subscribe(dialogResult => {
        if (dialogResult == true) {
          this.dataSetupService.deleteSourceType(data.id).subscribe(data => {
            this.loadSourceItems();
          }, err => {
            console.log('error in deleteing source type: ', data)
            this.showDeleteErrorMessage();
          });
        }
      });
    });
    this.tradeIdea.addItemSubject = addItemSubject;
    this.tradeIdea.editItemSubject = editItemSubject;
    this.tradeIdea.deleteItemSubject = deleteItemSubject;
    this.loadSourceItems();
  }

  loadSourceItems() {
    this.dataSetupService.getTradeSourceTypes().subscribe(result => {
      this.tradeIdea.items = result;
    });
  }

  initTechIndicators() {
    let addItemSubject: Subject<EditableListItem> = new Subject<EditableListItem>();
    let editItemSubject: Subject<EditableListItem> = new Subject<EditableListItem>();
    let deleteItemSubject: Subject<EditableListItem> = new Subject<EditableListItem>();
    addItemSubject.asObservable().subscribe(data => {
      this.dataSetupService.createTechnicalIndicatorType(data).subscribe(data => {
        this.loadTechnicalIndicators();
      }, err => {
        console.log('error in creating tech ind type: ', data)
      });
    });
    editItemSubject.asObservable().subscribe(data => {
      this.dataSetupService.updateTechnicalIndicatorType(data).subscribe(data => {
        this.loadTechnicalIndicators();
      }, err => {
        console.log('error in editing tech ind type: ', data)
      });
    });
    deleteItemSubject.asObservable().subscribe(data => {
      this.getDeleteDialog().afterClosed().subscribe(dialogResult => {
        if (dialogResult == true) {
          this.dataSetupService.deleteTechnicalIndicatorType(data.id).subscribe(data => {
            this.loadTechnicalIndicators();
          }, err => {
            console.log('error in deleting tech indicator type: ', data)
            this.showDeleteErrorMessage();
          });
        }
      });
    });
    this.technicalIndicator.addItemSubject = addItemSubject;
    this.technicalIndicator.editItemSubject = editItemSubject;
    this.technicalIndicator.deleteItemSubject = deleteItemSubject;
    this.loadTechnicalIndicators();
  }

  loadTechnicalIndicators() {
    this.dataSetupService.getTechIndicators().subscribe(result => {
      this.technicalIndicator.items = result;
    });
  }

  initMindsetTypes() {
    let addItemSubject: Subject<EditableListItem> = new Subject<EditableListItem>();
    let editItemSubject: Subject<EditableListItem> = new Subject<EditableListItem>();
    let deleteItemSubject: Subject<EditableListItem> = new Subject<EditableListItem>();
    addItemSubject.asObservable().subscribe(data => {
      this.dataSetupService.createMindsetType(data).subscribe(data => {
        this.loadMindsetTypes();
      }, err => {
        console.log('error in creating mindset type: ', data)
      });
    });
    editItemSubject.asObservable().subscribe(data => {
      this.dataSetupService.updateMindsetType(data).subscribe(data => {
        this.loadMindsetTypes();
      }, err => {
        console.log('error in editing mindset type: ', data)
      });
    });
    deleteItemSubject.asObservable().subscribe(data => {
      this.getDeleteDialog().afterClosed().subscribe(dialogResult => {
        if (dialogResult == true) {
          this.dataSetupService.deleteMindsetType(data.id).subscribe(data => {
            this.loadMindsetTypes();
          }, err => {
            console.log('error in deleting mindset type: ', data)
            this.showDeleteErrorMessage();
          });
        }
      });
    });
    this.mindSetType.addItemSubject = addItemSubject;
    this.mindSetType.editItemSubject = editItemSubject;
    this.mindSetType.deleteItemSubject = deleteItemSubject;
    this.loadMindsetTypes();
  }

  loadMindsetTypes() {
    this.dataSetupService.getMindsetTypes().subscribe(result => {
      this.mindSetType.items = result;
    });
  }

  initSurrEventTypes() {
    let addItemSubject: Subject<EditableListItem> = new Subject<EditableListItem>();
    let editItemSubject: Subject<EditableListItem> = new Subject<EditableListItem>();
    let deleteItemSubject: Subject<EditableListItem> = new Subject<EditableListItem>();
    addItemSubject.asObservable().subscribe(data => {
      this.dataSetupService.createSurrEventType(data).subscribe(data => {
        this.loadSurrEventTypes();
      }, err => {
        console.log('error in creating surr event type: ', data)
      });
    });
    editItemSubject.asObservable().subscribe(data => {
      this.dataSetupService.updateSurrEventType(data).subscribe(data => {
        this.loadSurrEventTypes();
      }, err => {
        console.log('error in editing surr event type: ', data)
      });
    });
    deleteItemSubject.asObservable().subscribe(data => {
      this.getDeleteDialog().afterClosed().subscribe(dialogResult => {
        if (dialogResult == true) {
          this.dataSetupService.deleteSurrEventType(data.id).subscribe(data => {
            this.loadSurrEventTypes();
          }, err => {
            console.log('error in deleting surr event type: ', data)
            this.showDeleteErrorMessage();
          });
        }
      });
    });
    this.event.addItemSubject = addItemSubject;
    this.event.editItemSubject = editItemSubject;
    this.event.deleteItemSubject = deleteItemSubject;
    this.loadSurrEventTypes();
  }

  loadSurrEventTypes() {
    this.dataSetupService.getSurroundingTypes().subscribe(result => {
      this.event.items = result;
    });
  }

  initBrockerageCommisionsGrid() {
    this.loadBrockerageCommisionsData();

    let cols: EditableGridColumn[] = [];
    let colIds: string[] = [];
    let col: EditableGridColumn = new EditableGridColumn();
    col.id = "name";
    col.name = "Name";
    col.type = 'select';
    col.values = ['Forex Options', 'Stock Options', 'Stock Future'];
    colIds.push('name');
    cols.push(col);

    col = new EditableGridColumn();
    col.id = "type";
    col.name = "Type";
    col.type = 'select';
    col.values = ['Percentage', 'Fixed'];
    colIds.push('type');
    cols.push(col);

    col = new EditableGridColumn();
    col.id = "value";
    col.name = "Value";
    col.type = 'text';
    colIds.push('value');
    cols.push(col);

    this.brokerageCommissions.setColumnConfigs(cols);
    this.brokerageCommissions.setColumns(colIds);

    let addItemSubject: Subject<BockerageCommission> = new Subject<BockerageCommission>();
    let editItemSubject: Subject<BockerageCommission> = new Subject<BockerageCommission>();
    let deleteItemSubject: Subject<BockerageCommission> = new Subject<BockerageCommission>();
    addItemSubject.asObservable().subscribe(data => {
      this.dataSetupService.createBrokerageCommission(data).subscribe(data => {
        this.loadBrockerageCommisionsData();
      }, err => {
        console.log('error in creating brokerage commission: ', data)
      });
    });
    editItemSubject.asObservable().subscribe(data => {
      this.dataSetupService.updateBrokerageCommission(data).subscribe(data => {
        this.loadBrockerageCommisionsData();
      }, err => {
        console.log('error in editing brokerage commission: ', data)
      });
    });
    deleteItemSubject.asObservable().subscribe(data => {
      this.getDeleteDialog().afterClosed().subscribe(dialogResult => {
        if (dialogResult == true) {
          this.dataSetupService.deleteBrokerageCommission(data.id).subscribe(data => {
            this.loadBrockerageCommisionsData();
          }, err => {
            console.log('error in deleteing brokerage commission: ', data)
            this.showDeleteErrorMessage();
          });
        }
      });
    });
    this.brokerageCommissions.addItemSubject = addItemSubject;
    this.brokerageCommissions.editItemSubject = editItemSubject;
    this.brokerageCommissions.deleteItemSubject = deleteItemSubject;
  }

  loadBrockerageCommisionsData() {
    this.dataSetupService.getBrokerageCommissions().subscribe(result => {
      this.brokerageCommissions.dataSource = result;
    });
  }

  getDeleteDialog() {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      width: 'auto',
      height: 'auto',
      data: { 'message': 'Are you sure you want to delete this entry?' }
    });
    return dialogRef;
  }

  showDeleteErrorMessage() {
    this.toastr.error('Failed to delete entry. Please check if this has assigned to any trade strategy.', '');
  }

}
