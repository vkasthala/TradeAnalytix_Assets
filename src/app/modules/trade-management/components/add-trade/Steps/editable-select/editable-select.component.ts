import { Component, OnInit, Input, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-editable-select',
  templateUrl: './editable-select.component.html',
  styleUrls: ['./editable-select.component.scss']
})
export class EditableSelectComponent implements OnInit {

  title: string;
  value: string;

  list = ['Stock', 'Long Call', 'Short Call', 'Long Put', 'Short Put', 'Call Spread', 'Put Spread'];
   
  listHidden = true;
  selectedIndex = -1;

  // the list to be shown after filtering
  filteredList: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<EditableSelectComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.title = data.title;
    if (data.value) {
      this.value = data.value;
    }
  }

  closeModal() {
    this.dialogRef.close(this.value);
  }

  ngOnInit() {
    this.filteredList = this.list;
  }

  // modifies the filtered list as per input
  getFilteredList() {
    this.listHidden = false;
    // this.selectedIndex = 0;
    if (!this.listHidden && this.value !== undefined) {
      this.filteredList = this.list.filter((item) => item.toLowerCase().startsWith(this.value.toLowerCase()));
    }
  }

  // select highlighted item when enter is pressed or any item that is clicked
  selectItem(ind) {
    this.value = this.filteredList[ind];
    this.listHidden = true;
    this.selectedIndex = ind;
  }

  // navigate through the list of items
  onKeyPress(event) {
    if (!this.listHidden) {
      if (event.key === 'Escape') {
        this.selectedIndex = -1;
        this.toggleListDisplay(0);
      }
      if (event.key === 'Enter') {
        this.toggleListDisplay(0);
      }
      if (event.key === 'ArrowDown') {
        this.listHidden = false;
        this.selectedIndex = (this.selectedIndex + 1) % this.filteredList.length;
        if (this.filteredList.length > 0 && !this.listHidden) {
          document.getElementsByTagName('li')[this.selectedIndex].scrollIntoView();
        }
      } else if (event.key === 'ArrowUp') {
        this.listHidden = false;
        if (this.selectedIndex <= 0) {
          this.selectedIndex = this.filteredList.length;
        }
        this.selectedIndex = (this.selectedIndex - 1) % this.filteredList.length;
        if (this.filteredList.length > 0 && !this.listHidden) {
          document.getElementsByTagName('li')[this.selectedIndex].scrollIntoView();
        }
      }
    } 
  }

  // show or hide the dropdown list when input is focused or moves out of focus
  toggleListDisplay(sender: number) {
    if (sender === 1) {
      // this.selectedIndex = -1;
      this.listHidden = false;
      this.getFilteredList();
    } else {
      // helps to select item by clicking
      setTimeout(() => {
        //this.selectItem(this.selectedIndex);
        this.listHidden = true;
        if (!this.list.includes(this.value)) {
          this.filteredList = this.list;
        }
      }, 500);
    }
  }




}
