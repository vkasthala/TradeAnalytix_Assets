import { Component, OnInit, Input } from '@angular/core';
import { EditableListItem } from '../../../models/common/editable-list-item.model';
import { Subject } from 'rxjs';

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

  addItemSubject: Subject<EditableListItem>;
  editItemSubject: Subject<EditableListItem>;
  deleteItemSubject: Subject<EditableListItem>;
  public showDepositForm: boolean = false;
  constructor() { }
  step = 0;
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
    //this.items.push(item);
    this.addItemSubject.next(item);
    this.showDepositForm = false;
    this.onCancel();

  }

  onItemEdit() {
    this.selected.name = this.newValue;
    this.editItemSubject.next(this.selected);
    this.onCancel();
  }

  onDelete(index) {
    this.deleteItemSubject.next(this.items[index]);
    //this.items.splice(index, 1);
    this.onCancel();
  }

  onCancel() {
    this.newValue = "";
    this.edit = false;
  }

}
