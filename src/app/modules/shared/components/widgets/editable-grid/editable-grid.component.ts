import { Component, OnInit } from '@angular/core';
import { EditableGridColumn } from '../../../models/common/editable-grid-column.model';

@Component({
  selector: 'app-editable-grid',
  templateUrl: './editable-grid.component.html',
  styleUrls: ['./editable-grid.component.scss']
})
export class EditableGridComponent<T> implements OnInit {

  columnConfigs: EditableGridColumn[] = [];

  columns: string[] = [];

  dataSource: T[] = [];

  constructor() { }

  ngOnInit() {
  }

}
