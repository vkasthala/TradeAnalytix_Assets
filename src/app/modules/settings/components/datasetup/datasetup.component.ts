import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { EditableListComponent } from 'src/app/modules/shared/components/widgets/editable-list/editable-list.component';
import { DataSetupService } from '../../services/data-setup.service';
import { EditableGridComponent } from 'src/app/modules/shared/components/widgets/editable-grid/editable-grid.component';
import { BockerageCommission } from '../../models/brockerage-commission.model';
import { EditableGridColumn } from 'src/app/modules/shared/models/common/editable-grid-column.model';
import { EditableListItem } from 'src/app/modules/shared/models/common/editable-list-item.model';
import { Subject } from 'rxjs';

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

  constructor(private dataSetupService: DataSetupService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.dataSetupService.getMindsetTypes().subscribe(result => {
      this.mindSetType.items = result;
    });
    this.dataSetupService.getTechIndicators().subscribe(result => {
      this.technicalIndicator.items = result;
    });
    this.dataSetupService.getSurroundingTypes().subscribe(result => {
      this.event.items = result;
    });
  }

  ngAfterViewInit() {
    this.initBrockerageCommisionsGrid();
    this.initSourceTypes();
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
      this.dataSetupService.deleteSourceType(data.id).subscribe(data => {
        this.loadSourceItems();
      }, err => {
        console.log('error in deleteing source type: ', data)
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
      this.dataSetupService.deleteBrokerageCommission(data.id).subscribe(data => {
        this.loadBrockerageCommisionsData();
      }, err => {
        console.log('error in deleteing brokerage commission: ', data)
      });
    });
    this.brokerageCommissions.addItemSubject = addItemSubject;
    this.brokerageCommissions.editItemSubject = editItemSubject;
    this.brokerageCommissions.deleteItemSubject = deleteItemSubject;
  }

  loadBrockerageCommisionsData() {
    /*let data: BockerageCommission[] = [];

    let commission: BockerageCommission = new BockerageCommission();
    commission.name = "Stock Options";
    commission.type = "Fixed";
    commission.value = 12.5;
    data.push(commission);

    commission = new BockerageCommission();
    commission.name = "Forex Options";
    commission.type = "Percentage";
    commission.value = 1.8;
    data.push(commission);

    this.brokerageCommissions.dataSource = data;*/

    this.dataSetupService.getBrokerageCommissions().subscribe(result => {
      this.brokerageCommissions.dataSource = result;
    });
  }

}
