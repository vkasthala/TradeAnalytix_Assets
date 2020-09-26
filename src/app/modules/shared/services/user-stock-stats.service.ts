import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserStockSummary } from '../models/trade-management/user-stock-summary.model';
import { HttpService } from './http.service';

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

}
