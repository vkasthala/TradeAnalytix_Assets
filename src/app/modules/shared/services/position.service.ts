import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { PositionsResponse } from '../models/portfolio.model';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  portfolio_base_url = "/v0/portfolio/";

  constructor(private http: HttpClient) { }

  getPositions() : Observable<PositionsResponse>{
     const url = environment.apiUrl + this.portfolio_base_url + "positions";
     return this.http.get<PositionsResponse>(url);
  }
}
