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
  @ViewChild('brokerageCommissions', { static: false }) protected brokerageCommissions: EditableGridComponent<BockerageCommission>;

  constructor(private dataSetupService: DataSetupService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.dataSetupService.getMindsetTypes().subscribe(result => {
      this.mindSetType.items = result;
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
    colIds.push('name');
    cols.push(col);

    col = new EditableGridColumn();
    col.id = "type";
    col.name = "Type";
    colIds.push('type');
    cols.push(col);

    col = new EditableGridColumn();
    col.id = "value";
    col.name = "Value";
    colIds.push('value');
    cols.push(col);

    this.brokerageCommissions.columnConfigs = cols;
  }

  loadBrockerageCommisionsData() {
    let data: BockerageCommission[] = [];

    let commission: BockerageCommission = new BockerageCommission();
    commission.name = "Stocks";
    commission.type = "Fixed";
    commission.value = 12.5;
    data.push(commission);

    commission = new BockerageCommission();
    commission.name = "Forex Option";
    commission.type = "Percentage";
    commission.value = 1.8;
    data.push(commission);

    this.brokerageCommissions.dataSource = data;
  }

}
