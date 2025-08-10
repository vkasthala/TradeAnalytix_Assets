import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-reportsitems',
  templateUrl: './reportsitems.component.html',
  styleUrls: ['./reportsitems.component.scss']
})
export class ReportsitemsComponent implements OnInit {

  constructor() { }
  @Input() reportsitems: [];

  ngOnInit() {
  }

}
