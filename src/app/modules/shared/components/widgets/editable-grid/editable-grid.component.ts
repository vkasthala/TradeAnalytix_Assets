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

  selectedModel: T;

  edit: boolean = false;

  constructor() { }

  ngOnInit() {

  }

  setColumns(cols: string[]) {
    this.columns = [];
    this.columns = this.columns.concat(cols);
    this.columns.push('action');
  }

  setColumnConfigs(configs: EditableGridColumn[]) {
    this.columnConfigs = configs;
  }

  onRowEdit(element: T) {
    console.log(element);
    this.selectedModel = element;
    this.edit = true;
    this.fillSelectedValues(this.selectedModel);
  }

  fillSelectedValues(model: T) {
    for (let ind = 0; ind < this.columnConfigs.length; ind++) {
      document.getElementById(this.columnConfigs[ind].id)['value'] = (model != null ? model[this.columnConfigs[ind].id] : "");
    }
  }

  onRowDelete(element: T) {
    console.log(element);
  }

  onCancel() {
    this.fillSelectedValues(null);
    this.edit = false;
  }

  onItemEdit() {
    for (let ind = 0; ind < this.columnConfigs.length; ind++) {
      this.selectedModel[this.columnConfigs[ind].id] = document.getElementById(this.columnConfigs[ind].id)['value'];
    }
    this.fillSelectedValues(null);
    this.edit = false;
  }

  onItemAdd() {
    let obj = {};
    for (let ind = 0; ind < this.columnConfigs.length; ind++) {
      obj[this.columnConfigs[ind].id] = document.getElementById(this.columnConfigs[ind].id)['value'];
    }
    let typeObj: T = obj as T;
    console.log('type obj:', typeObj);
    this.dataSource.push(typeObj);
    this.fillSelectedValues(null);
  }

}
