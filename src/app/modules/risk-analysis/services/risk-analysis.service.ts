import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ImpliedVolatility } from '../models/implied-volatility.model';
import { RiskAnalysisRequest } from '../models/risk-analysis-request.model';
import { RiskAnalysisResult } from '../models/risk-analysis-result.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RiskAnalysisService {

  private apiUrl = environment.apiUrl + "/risk-analysis";

  constructor(private http: HttpClient) { }

  public getImpliedVolatilityResult(request: RiskAnalysisRequest): Observable<ImpliedVolatility[]> {
    return this.http.post<ImpliedVolatility[]>(this.apiUrl + "/implied-volatility", request);
  }

  public getRiskAnalysisResult(request: RiskAnalysisRequest): Observable<RiskAnalysisResult> {
    return this.http.post<RiskAnalysisResult>(this.apiUrl + "/result", request);
  }

}
