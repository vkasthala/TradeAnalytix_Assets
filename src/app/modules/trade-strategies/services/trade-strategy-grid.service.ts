import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from '../../shared/services/http.service';
import { TradeStrategyGridRequest } from '../models/trade-strategy-grid-request.model';
import { Observable } from 'rxjs';
import { TradeStrategyGridRow } from '../models/trade-strategy-grid-row.model';
import { TradeStrategyGridResult } from '../models/trade-strategy-grid-result.model';
import { BulkStrategyUpdateModel } from '../models/bulk-strategy-update-model.model';

@Injectable({
  providedIn: 'root'
})
export class TradeStrategyGridService {

  private apiUrl = environment.apiUrl;

  constructor(private httpService: HttpService) { }

  public loadTradeStrategies(tradeStrategyGridRequest: TradeStrategyGridRequest): Observable<TradeStrategyGridResult> {
    let url = this.apiUrl + '/trade-strategy/page';
    return this.httpService.post<TradeStrategyGridRequest, TradeStrategyGridResult>(url, tradeStrategyGridRequest);
  }

  public loadTradeStrategiesForBulkUpdate(): Observable<BulkStrategyUpdateModel[]> {
    let url = this.apiUrl + '/trade-strategy/strategies-for-bulk-update';
    return this.httpService.get<BulkStrategyUpdateModel[]>(url);
  }

}
