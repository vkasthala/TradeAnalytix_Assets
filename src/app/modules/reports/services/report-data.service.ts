import { Injectable } from '@angular/core';
import { ChartRequest } from '../model/chart-request.model';
import { Observable } from 'rxjs';
import { HttpService } from '../../shared/services/http.service';
import { environment } from 'src/environments/environment';
import { SummaryItem } from '../../shared/models/reports/summary-item.model';
import { SummaryRequest } from '../../shared/models/reports/summary-request.model';
import { CalReportDayData } from '../model/cal-report-day-data.model';

@Injectable({
  providedIn: 'root'
})
export class ReportDataService {

  constructor(private httpService: HttpService) { }

  public getReportChart(url: string, chartRequest: ChartRequest): Observable<any> {
    return this.httpService.post<ChartRequest, any>(environment.apiUrl + url, chartRequest);
  }

  public getReportSummary(summaryRequest: SummaryRequest): Observable<SummaryItem[]> {
    return this.httpService.post<SummaryRequest, SummaryItem[]>(environment.apiUrl + "/reports/summary", summaryRequest);
  }

  public getCalendarReportData(month: number, year: number): Observable<CalReportDayData[]> {
    return this.httpService.get<CalReportDayData[]>(environment.apiUrl + '/reports/calendar-report/' + year + '/' + month);
  }

}
