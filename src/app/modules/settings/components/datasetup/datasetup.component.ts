import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { EditableListComponent } from 'src/app/modules/shared/components/widgets/editable-list/editable-list.component';
import { DataSetupService } from '../../services/data-setup.service';
import { EditableGridComponent } from 'src/app/modules/shared/components/widgets/editable-grid/editable-grid.component';
import { BockerageCommission } from '../../models/brockerage-commission.model';
import { EditableGridColumn } from 'src/app/modules/shared/models/common/editable-grid-column.model';

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
    this.dataSetupService.getTradeSourceTypes().subscribe(result => {
      this.tradeIdea.items = result;
    });
  }

  ngAfterViewInit() {
    this.initBrockerageCommisionsGrid();
    this.cdr.detectChanges();
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
  }

  loadBrockerageCommisionsData() {
    let data: BockerageCommission[] = [];

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

    this.brokerageCommissions.dataSource = data;
  }

}
