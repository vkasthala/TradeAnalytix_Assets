import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { StockSymbol } from '../models/trademgmt/stock-symbol.model';

@Injectable({
  providedIn: 'root'
})
export class StockSymbolService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getStockSymbols(): Observable<StockSymbol[]> {
    return this.http.get<StockSymbol[]>(this.apiUrl + '/stock-symbols');
  }

}
