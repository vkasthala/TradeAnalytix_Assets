import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HoldingResponse } from '../models/portfolio.model';
import { env } from 'process';

@Injectable({
  providedIn: 'root'
})
export class HoldingService {

  portfolio_base_url = "/portfolio/";
  admin_base_url = "/v0/admin/";

  constructor(private http: HttpClient) { }
  
  private createHttpHeaders(): HttpHeaders {
    let httpHeaders: HttpHeaders = new HttpHeaders({
      Brokerage: 'US' == environment.country ? 'SNAPTRADE' : 'FYERS',
      Authorization: 'Bearer ' + sessionStorage.getItem('token')
    });
    return httpHeaders;
  }

  getHoldings() : Observable<HoldingResponse>{
    const url = environment.tradingServiceUri + this.portfolio_base_url + "holdings";
     return this.http.get<HoldingResponse>(url, { headers: this.createHttpHeaders() });
  }

  adminCreateHoldings() : Observable<String>{
    const url = environment.apiUrl + this.admin_base_url + "holdings";
    return this.http.post<String>(url, null);
 }
}
