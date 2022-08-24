import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-datefield',
  templateUrl: './datefield.component.html',
  styleUrls: ['./datefield.component.scss']
})
export class DatefieldComponent implements OnInit {

  //@Input('uid') uid: string;
  
  dateValue: string = '';

  constructor() { }

  ngOnInit() {

  }

}
