import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserStockSummary } from '../models/trade-management/user-stock-summary.model';
import { HttpService } from './http.service';
import { StockSummaryResult } from '../../trade-management/models/stock-summary-result.model';
import { StrategySummaryResult } from '../../trade-management/models/strategy-summary-result.model';

@Injectable({
  providedIn: 'root'
})
export class UserStockStatsService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpService) { }

  public getUserStockBriefSummary(stockId: Number, userId: Number): Observable<UserStockSummary> {
    return this.http.get<UserStockSummary>(this.apiUrl + '/stats/user-stock/brief-summary?stock_id=' + stockId + '&user_id=' + userId);
  }

  public getUserStockDetailSummary(stockId: Number, userId: Number): Observable<UserStockSummary> {
    return this.http.get<UserStockSummary>(this.apiUrl + '/stats/user-stock/detail-summary?stock_id=' + stockId + '&user_id=' + userId);
  }

  public getStockMetricsSummaryResult(stockId: Number): Observable<StockSummaryResult> {
    return this.http.get<StockSummaryResult>(this.apiUrl + '/stats/user-stock/stock-summary?stock_id=' + stockId);
  }

  public getStrategyTypeSummaryResult(strategyId: Number): Observable<StrategySummaryResult> {
    return this.http.get<StrategySummaryResult>(this.apiUrl + '/stats/user-stock/strategy-summary?strategy_id=' + strategyId);
  }

}
