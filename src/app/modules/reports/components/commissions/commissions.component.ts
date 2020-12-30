import { Component, OnInit, Input } from '@angular/core';
import { ReportsItem } from '../../model/reports-item.model';

@Component({
  selector: 'app-commissions',
  templateUrl: './commissions.component.html',
  styleUrls: ['./commissions.component.scss']
})
export class CommissionsComponent implements OnInit {

  reportsitems: ReportsItem[] = [];

  reportsItemsData = {
    commissions: [
      { name: 'Total Commission Paid', value: "$2874" },
      { name: 'Average Daily Commission', value: "$45.20" },
      { name: 'Commission as a % of Return', value: "12%" },
      { name: 'Most Commissions Paid for', value: "Short Puts" },
    ]
    ,
    netr: [
      { name: 'Current Net R', value: "1.2R" }
    ],
    
  };

  constructor() { }

  ngOnInit() {
    this.geCommissionsItems();

  }

  geCommissionsItems(): ReportsItem[] {
    this.reportsitems = this.reportsItemsData.commissions;
    return this.reportsitems;
  }

}
