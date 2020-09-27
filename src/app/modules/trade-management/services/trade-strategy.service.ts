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

}
