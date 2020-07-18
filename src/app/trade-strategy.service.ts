import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { TradeStrategy } from './modules/TradeStrategy';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TradeStrategyService {

  constructor(private http:HttpClient) { }
  
  httpOptions = {
	  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};

  public getAllTradeStrategies(userId: String) {
    return this.http.get("http://localhost:8080/getAllTradeStrategies/"+userId);
  }

   addStrategy(tradeStrategy:TradeStrategy): Observable<TradeStrategy> {
    console.log("Insided add stra"+tradeStrategy.stockCode);
    console.log("Insided add stra"+tradeStrategy.stockLeg.quantity);

    return this.http.post<TradeStrategy>("http://localhost:8080/addStrategy/", JSON.stringify(tradeStrategy), this.httpOptions)
    .pipe(catchError(this.handleError<TradeStrategy>('addStrategy')))    ;
  }
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}
