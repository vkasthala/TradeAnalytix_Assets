import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';

import { TradeStrategy } from './modules/TradeStrategy';

@Injectable({
  providedIn: 'root'
})
export class TradeStrategyService {

  constructor(private http:HttpClient) { }

  public getAllTradeStrategies(userId: String) {
    return this.http.get("http://localhost:8080/getAllTradeStrategies/"+userId);
  }

  public addStrategy(tradeStrategy:TradeStrategy) {
    console.log("Insided add stra"+tradeStrategy.stockCode);
    console.log("Insided add stra"+tradeStrategy.stockLeg.quantity);

    return this.http.post("http://localhost:8080/addStrategy",tradeStrategy);
  }
}
