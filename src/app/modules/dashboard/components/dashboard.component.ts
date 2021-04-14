import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TradePlanGridRow } from '../../trade-plan/models/trade-plan-grid-row.model';
import { TradePlan } from '../../trade-plan/models/trade-plan.model';
import { TradePlansService } from '../../trade-plan/services/trade-plans.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  latestTradePlan: TradePlanGridRow;

  constructor(private router: Router, private tradePlanService: TradePlansService) { }

  ngOnInit() {
    this.loadLatestTradePlan();
  }

  loadLatestTradePlan() {
    this.tradePlanService.getLatestTradePlan().subscribe(result => {
      console.log("latest trade plan:", result);
      if (result) {
        this.latestTradePlan = result;
      }
    });
  }

  addNewTradePlan() {
    this.router.navigate(['/dashboard/add-new-trade-plan']);
  }

  viewAllTradePlans() {
    this.router.navigate(['/dashboard/trade-plans']);
  }

}
