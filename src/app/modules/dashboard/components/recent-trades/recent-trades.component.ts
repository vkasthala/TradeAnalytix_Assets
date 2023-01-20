import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { TradeInputData } from 'src/app/modules/shared/models/trade-management/trade-input-data.model';
import { StockSymbolService } from 'src/app/modules/shared/services/stock-symbol.service';
import { UserStockStatsService } from 'src/app/modules/shared/services/user-stock-stats.service';
import { TradeStrategyService } from 'src/app/modules/trade-management/services/trade-strategy.service';
import { RecentTrade } from '../../models/recent-trade.model';
import { DashboardChartService } from '../../services/dashboard-chart.service';

@Component({
  selector: 'app-recent-trades',
  templateUrl: './recent-trades.component.html',
  styleUrls: ['./recent-trades.component.scss']
})
export class RecentTradesComponent implements OnInit {

  protected Loader = false;

  recentTrades: RecentTrade[] = [];

  showMoreTrades: boolean = false;

  constructor(
    private router: Router,
    private dashboardService: DashboardChartService,
    private tradeStrategyService: TradeStrategyService,
    private stockSymbolService: StockSymbolService,
    private userStockStatsService: UserStockStatsService
  ) {
  }

  ngOnInit() {
    this.dashboardService.getRecentTrades().subscribe(result => {
      this.recentTrades = result;
    });
  }

  MoreRecentTrades() {
    this.showMoreTrades = !this.showMoreTrades;
  }

  onTradeEdit(trade: RecentTrade) {
    if (!trade || !trade.strategyId) {
      return;
    }
    this.Loader = !this.Loader;
    let stockSymbolReq = this.stockSymbolService.getStockSymbolById(trade.stockId);
    let tradeStrategyReq = this.tradeStrategyService.getTradeStrategyDetails(trade.strategyId);
    let stockSummaryReq = this.userStockStatsService.getUserStockBriefSummary(trade.stockId, 1);
    forkJoin([stockSymbolReq, stockSummaryReq, tradeStrategyReq]).subscribe(results => {
      let extras: NavigationExtras = {};
      let input: TradeInputData = new TradeInputData();
      input.selectedStock = results[0];
      input.stockSummary = results[1];
      input.tradeStrategy = results[2];
      extras.state = input;
      this.router.navigate(["/edit-trade/" + trade.strategyId], extras);
      this.Loader = !this.Loader;
    });
  }

}
