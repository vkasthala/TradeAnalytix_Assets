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

  constructor(private httpService: HttpService) { }

  public getStockSymbols(): Observable<StockSymbol[]> {
    return this.httpService.get<StockSymbol[]>(this.apiUrl + '/stock-symbols');
  }

  public getStockSymbolById(id: number): Observable<StockSymbol> {
    return this.httpService.get<StockSymbol>(this.apiUrl + '/stock-symbol/' + id);
  }

}
