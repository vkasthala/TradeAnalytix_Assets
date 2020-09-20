import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { UserStockSummary } from '../models/user-stock-summary.model';

@Injectable({
  providedIn: 'root'
})
export class UserStockStatsService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getUserStockBriefSummary(stockId: Number, userId: Number): Observable<UserStockSummary> {
    return this.http.get<UserStockSummary>(this.apiUrl + '/stats/user-stock/brief-summary?stock_id=' + stockId + '&user_id=' + userId);
  }

  public getUserStockDetailSummary(stockId: Number, userId: Number): Observable<UserStockSummary> {
    return this.http.get<UserStockSummary>(this.apiUrl + '/stats/user-stock/detail-summary?stock_id=' + stockId + '&user_id=' + userId);
  }

}
