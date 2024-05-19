import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HoldingResponse } from '../models/portfolio.model';

@Injectable({
  providedIn: 'root'
})
export class HoldingService {

  portfolio_base_url = "/v0/portfolio/";
  admin_base_url = "/v0/admin/";

  constructor(private http: HttpClient) { }

  getHoldings() : Observable<HoldingResponse>{
     const url = environment.apiUrl + this.portfolio_base_url + "holdings";
     return this.http.get<HoldingResponse>(url);
  }

  adminCreateHoldings() : Observable<String>{
    const url = environment.apiUrl + this.admin_base_url + "holdings";
    return this.http.post<String>(url, null);
 }
}
