import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { StockSymbol } from '../models/trade-management/stock-symbol.model';
import { HttpService } from './http.service';


@Injectable({
  providedIn: 'root'
})
export class StockSymbolService {

  private apiUrl = environment.apiUrl;

  private symobols: StockSymbol[] = [];

  constructor(private httpService: HttpService) { }

  public getStockSymbols(): Observable<StockSymbol[]> {
    if (this.symobols.length) {
      return new Observable(subscriber => subscriber.next(this.symobols));
    } else {
      let observable: Observable<StockSymbol[]> = this.httpService.get<StockSymbol[]>(this.apiUrl + '/stock-symbols');
      observable.subscribe(result => {
        this.symobols = result;
      });
      return observable;
    }
  }

  public getStockSymbolById(id: number): Observable<StockSymbol> {
    return this.httpService.get<StockSymbol>(this.apiUrl + '/stock-symbol/' + id);
  }

}
