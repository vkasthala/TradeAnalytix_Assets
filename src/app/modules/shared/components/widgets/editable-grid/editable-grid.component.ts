import { Component, OnInit } from '@angular/core';
import { EditableGridColumn } from '../../../models/common/editable-grid-column.model';
import { Subject } from 'rxjs';

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

  addItemSubject: Subject<T>;
  editItemSubject: Subject<T>;
  deleteItemSubject: Subject<T>;
  comboChangeSubject: Subject<string>;

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
      let ele = document.getElementById(this.columnConfigs[ind].id);
      if (ele) {
        ele['value'] = (model != null ? model[this.columnConfigs[ind].id] : "");
        if (this.columnConfigs[ind].type === 'select') {
          this.onComboValueChange(this.columnConfigs[ind].id);
        }
      }
    }
  }

  onRowDelete(element: T) {
    console.log(element);
    this.deleteItemSubject.next(element);
  }

  onCancel() {
    this.fillSelectedValues(null);
    this.edit = false;
  }

  onItemEdit() {
    for (let ind = 0; ind < this.columnConfigs.length; ind++) {
      let ele = document.getElementById(this.columnConfigs[ind].id);
      if (ele) {
        this.selectedModel[this.columnConfigs[ind].id] = ele['value'];
      }
    }
    this.fillSelectedValues(null);
    this.edit = false;
    this.editItemSubject.next(this.selectedModel);
  }

  onItemAdd() {
    let obj = {};
    for (let ind = 0; ind < this.columnConfigs.length; ind++) {
      let ele = document.getElementById(this.columnConfigs[ind].id);
      if (ele) {
        obj[this.columnConfigs[ind].id] = ele['value'];
      }
      console.log(this.columnConfigs[ind].id + '=' + obj[this.columnConfigs[ind].id]);
    }
    let typeObj: T = obj as T;
    console.log('type obj:', typeObj);
    this.fillSelectedValues(null);
    this.addItemSubject.next(typeObj);
  }

  getSelectOptions(map: Map<string, string>) {
    if (!map) {
      return [];
    }
    let arr = Array.from(map.entries());
    console.log('array: {}', arr);
    return arr;
  }

  onComboValueChange(id: string) {
    if (this.comboChangeSubject) {
      this.comboChangeSubject.next(id);
    }
  }

}
