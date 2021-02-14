import { Component, OnInit, Input } from '@angular/core';
import { EditableListItem } from '../../../models/common/editable-list-item.model';

@Component({
  selector: 'app-editable-list',
  templateUrl: './editable-list.component.html',
  styleUrls: ['./editable-list.component.scss']
})
export class EditableListComponent implements OnInit {

  items: EditableListItem[] = [];

  selectedItems: EditableListItem[];

  newValue: string;

  edit: boolean;

  constructor() { }

  ngOnInit() {

  }

  onSelectedItemChange(value) {
    if (value) {
      this.edit = true;
    }
  }

  onItemAdd() {
    let item: EditableListItem = new EditableListItem();
    item.name = this.newValue;
    this.items.push(item);

  }

  onItemEdit() {
    if (this.selectedItems.length == 1) {
      this.selectedItems[0].name == this.newValue;
    }
  }

  onCancel() {
    this.newValue = "";
    this.edit = false;
  }

}
