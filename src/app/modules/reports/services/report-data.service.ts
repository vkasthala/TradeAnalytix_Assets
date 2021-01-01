import { Injectable } from '@angular/core';
import { ChartRequest } from '../model/chart-request.model';
import { Observable } from 'rxjs';
import { HttpService } from '../../shared/services/http.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportDataService {

  constructor(private httpService: HttpService) { }

  public getReportChart(url: string, chartRequest: ChartRequest): Observable<any> {
    return this.httpService.post<ChartRequest, any>(environment.apiUrl  + url, chartRequest);
  }

}
