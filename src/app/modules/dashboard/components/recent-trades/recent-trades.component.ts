import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recent-trades',
  templateUrl: './recent-trades.component.html',
  styleUrls: ['./recent-trades.component.scss']
})
export class RecentTradesComponent implements OnInit {

  showMoreTrades:boolean = false;

  constructor(
    private router: Router
  ) {

  }

  ngOnInit() {

  }

  MoreRecentTrades() {
    this.showMoreTrades = !this.showMoreTrades;
  }


}
