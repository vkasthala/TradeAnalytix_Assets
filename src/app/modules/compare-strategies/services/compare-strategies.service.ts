import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpService } from '../../shared/services/http.service';
import { CompareStrategyResponse } from '../models/compare-strategy-response.model';
import { StrategyCompareRequest } from '../models/strategy-compare-request.model';
import { StrategyInput } from '../models/strategy-input.model';

@Injectable({
  providedIn: 'root'
})
export class CompareStrategiesService {

  private apiUrl = environment.apiUrl;

  constructor(private httpService: HttpService) { }

  getStrategiesList(stockId: number): Observable<StrategyInput[]> {
    return this.httpService.get<StrategyInput[]>(this.apiUrl + '/compare-strategy/strategies/' + stockId);
  }

  compareStrategies(request: StrategyCompareRequest): Observable<CompareStrategyResponse> {
    return this.httpService.post<StrategyCompareRequest, CompareStrategyResponse>(this.apiUrl + '/compare-strategy/strategies/compare', request);
  }

}
