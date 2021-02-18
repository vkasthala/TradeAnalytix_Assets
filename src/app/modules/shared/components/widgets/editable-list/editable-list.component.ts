import { Component, OnInit, Input } from '@angular/core';
import { EditableListItem } from '../../../models/common/editable-list-item.model';

@Component({
  selector: 'app-editable-list',
  templateUrl: './editable-list.component.html',
  styleUrls: ['./editable-list.component.scss']
})
export class EditableListComponent implements OnInit {

  items: EditableListItem[] = [];

  selected: EditableListItem;

  newValue: string;

  edit: boolean;

  constructor() { }

  ngOnInit() {

  }

  onSelectedItemChange(value) {
    console.log("selected:", value);
    if (value) {
      this.edit = true;
      this.selected = value;
      this.newValue = value.name;
    }
  }

  onItemAdd() {
    let item: EditableListItem = new EditableListItem();
    item.name = this.newValue;
    this.items.push(item);
    this.onCancel();

  }

  onItemEdit() {
    this.selected.name = this.newValue;
    this.onCancel();
  }

  onDelete(index) {
    this.items.splice(index, 1);
    this.onCancel();
  }

  onCancel() {
    this.newValue = "";
    this.edit = false;
  }

}
