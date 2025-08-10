import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { PositionsResponse } from '../models/portfolio.model';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  portfolio_base_url = "/portfolio/";

  private createHttpHeaders(): HttpHeaders {
    let httpHeaders: HttpHeaders = new HttpHeaders({
      Brokerage: 'US' == environment.country ? 'SNAPTRADE' : 'FYERS',
      Authorization: 'Bearer ' + sessionStorage.getItem('token')
    });
    console.log('http heades:', httpHeaders);
    return httpHeaders;
  }

  constructor(private http: HttpClient) { }

  getPositions() : Observable<PositionsResponse>{
     const url = environment.tradingServiceUri + this.portfolio_base_url + "positions";
     return this.http.get<PositionsResponse>(url, { headers: this.createHttpHeaders() });
  }
}
