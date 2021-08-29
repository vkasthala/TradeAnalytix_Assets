import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {
  stockAdded: boolean;
  constructor() { }

  ngOnInit() {
  }
  addStock() {
    this.stockAdded = true;
  }

}
