import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpService } from '../../shared/services/http.service';
import { ImpliedVolatility } from '../models/implied-volatility.model';
import { RiskAnalysisRequest } from '../models/risk-analysis-request.model';
import { RiskAnalysisResult } from '../models/risk-analysis-result.model';

@Injectable({
  providedIn: 'root'
})
export class RiskAnalysisService {

  private apiUrl = environment.apiUrl + "/risk-analysis";

  constructor(private httpService: HttpService) { }

  public getImpliedVolatilityResult(request: RiskAnalysisRequest): Observable<ImpliedVolatility[]> {
    return this.httpService.post<RiskAnalysisRequest, ImpliedVolatility[]>(this.apiUrl + "/implied-volatility", request);
  }

  public getRiskAnalysisResult(request: RiskAnalysisRequest): Observable<RiskAnalysisResult> {
    return this.httpService.post<RiskAnalysisRequest, RiskAnalysisResult>(this.apiUrl + "/result", request);
  }

}
