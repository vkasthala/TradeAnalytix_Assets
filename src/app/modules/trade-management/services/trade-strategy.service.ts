import { Injectable } from '@angular/core';
import { HttpService } from '../../shared/services/http.service';
import { TradeStrategy } from '../models/trade-strategy.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { TradeHistory } from '../models/trade-history.model';
import { RuleEvalResult } from '../models/rule-eval-result.model';
import { TradeChubFile } from '../models/trade-chub-file.model';

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

  public updateClosedTrade(tradeStrategy: TradeStrategy): Observable<void> {
    let url = this.apiUrl + '/trade-strategy/close-update';
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
    return this.httpService.post(this.apiUrl + '/trade-strategy/delete/' + id, null);
  }

  public getTradeClosedHistory(id: number): Observable<TradeHistory> {
    return this.httpService.get<TradeHistory>(this.apiUrl + '/trade-strategy/closed-history/' + id);
  }

  public evaluateStrategyRules(tradeStrategy: TradeStrategy): Observable<RuleEvalResult[]> {
    return this.httpService.post<TradeStrategy, RuleEvalResult[]>(this.apiUrl + '/trade-strategy/eval-rules', tradeStrategy);
  }

  public getTradeChubFiles(tradeStrategyId: number): Observable<TradeChubFile[]> {
    return this.httpService.get<TradeChubFile[]>(this.apiUrl + '/trade-strategy/trade-chub-files/' + tradeStrategyId);
  }

}
