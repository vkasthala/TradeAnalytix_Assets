import { Component, OnInit, Input } from '@angular/core';
import { ReportsItem } from '../../model/reports-item.model';

@Component({
  selector: 'app-riskmanagement',
  templateUrl: './riskmanagement.component.html',
  styleUrls: ['./riskmanagement.component.scss']
})
export class RiskmanagementComponent implements OnInit {
  reportsitems: ReportsItem[] = [];

  reportsItemsData = {
    riskandproﬁt: [
      { name: 'Current Maximum Risk', value: "$23932" },
      { name: 'Current Maximum Profit Potential', value: "$12456" },
    ]
    ,
    netr: [
      { name: 'Current Net R', value: "1.2R" }
    ],
    
  };

  constructor() { }

  ngOnInit() {
    this.getRiskItems();

  }

  getRiskItems(): ReportsItem[] {
    this.reportsitems = this.reportsItemsData.riskandproﬁt;
    return this.reportsitems;
  }

  getNetRItems(): ReportsItem[] {
    this.reportsitems = this.reportsItemsData.netr;
    return this.reportsitems;
  }


}
