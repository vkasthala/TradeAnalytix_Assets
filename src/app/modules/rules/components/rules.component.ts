import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {
  stockAdded: boolean;
  selectedTabReport: string = 'codedRules';
  constructor() { }

  ngOnInit() {
  }
  addStock() {
    this.stockAdded = true;
  }

  onTabSelect(selectedTab: string) {
    this.selectedTabReport = selectedTab;
  }

}
