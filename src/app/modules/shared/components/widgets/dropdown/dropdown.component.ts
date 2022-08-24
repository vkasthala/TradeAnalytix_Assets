import { Component, Input, OnInit } from '@angular/core';
import { DropdownOption } from '../../../models/dropdown-option.model';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  //@Input('uid') uid: string;
                      
  options: DropdownOption[];
  selectedId: number;

  constructor() { }

  ngOnInit() {

  }

}
