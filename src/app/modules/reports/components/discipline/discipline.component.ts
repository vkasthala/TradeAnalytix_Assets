import { Component, OnInit, Input } from '@angular/core';
import { ReportsItem } from '../../model/reports-item.model';

@Component({
  selector: 'app-discipline',
  templateUrl: './discipline.component.html',
  styleUrls: ['./discipline.component.scss']
})
export class DisciplineComponent implements OnInit {
  reportsitems: ReportsItem[] = [];

  reportsItemsData = {
    compliance: [
      { name: 'Net Return from Aligned Trades', value: "$23932" },
      { name: 'Win-Loss by Aligned Trades', value: "$12456" },
    ],
    
    plannedtrades: [
      { name: 'Trade Plan Alignment (%)', value: "33%" },
      { name: 'Planed Trades (%)', value: "43%" }
    ],
    rulescompliance: [
      { name: 'Entry Rules Compliance (%)', value: "72%" },
      { name: 'Exit Rules Compliance (%)', value: "32%" }
    ],
    
  };

  constructor() { }

  ngOnInit() {
    this.getComplianceItems();

  }

  getComplianceItems(): ReportsItem[] {
    this.reportsitems = this.reportsItemsData.compliance;
    return this.reportsitems;
  }

  getPlannedTradesItems(): ReportsItem[] {
    this.reportsitems = this.reportsItemsData.plannedtrades;
    return this.reportsitems;
  }
  getRulesComplianceItems(): ReportsItem[] {
    this.reportsitems = this.reportsItemsData.rulescompliance;
    return this.reportsitems;
  }

}
