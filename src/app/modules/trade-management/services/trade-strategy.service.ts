import { Injectable } from '@angular/core';
import { HttpService } from '../../shared/services/http.service';
import { TradeStrategy } from '../models/trade-strategy.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TradeStrategyService {

  private apiUrl = environment.apiUrl;

  constructor(private httpService: HttpService) { }

  public addTrade(tradeStrategy: TradeStrategy): Observable<void> {
    let url = this.apiUrl + '/trade-strategy/create';
    return this.httpService.post<TradeStrategy, void>(url, tradeStrategy);
  }

  public editTrade(tradeStrategy: TradeStrategy): Observable<void> {
    let url = this.apiUrl + '/trade-strategy/update';
    return this.httpService.post<TradeStrategy, void>(url, tradeStrategy);
  }

  public closeTrade(tradeStrategy: TradeStrategy): Observable<void> {
    let url = this.apiUrl + '/trade-strategy/close';
    return this.httpService.post<TradeStrategy, void>(url, tradeStrategy);
  }

  public getTradeStrategyDetails(id: number): Observable<TradeStrategy> {
    return this.httpService.get<TradeStrategy>(this.apiUrl + '/trade-strategy/' + id);
  }

  public deleteTradeStrategy(id: number): Observable<void> {
    return this.httpService.delete(this.apiUrl + '/trade-strategy/' + id);
  }

}
