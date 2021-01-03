import { Injectable } from '@angular/core';
import { ChartRequest } from '../model/chart-request.model';
import { NetReturnChartRequest } from '../model/net-return-chart-request.model';
import { ReportDetails } from '../model/report-details.model';
import { WinLossChartRequest } from '../model/win-loss-chart-request.model';
import { ReportFilter } from '../model/report-filter.model';

@Injectable({
  providedIn: 'root'
})
export class ReportRequestService {

  constructor() { }

  public getNetReturnChartRequest(reportDetails: ReportDetails, subtype: string, reportFilter: ReportFilter): ChartRequest {
    let request: NetReturnChartRequest = new NetReturnChartRequest();
    request.id = reportDetails.id;
    request.fromDate = reportFilter.fromDate;
    request.toDate = reportFilter.toDate;
    request.type = subtype;
    return request;
  }

  public getWinLossChartRequest(reportDetails: ReportDetails, subtype: string, reportFilter: ReportFilter): ChartRequest {
    let request: WinLossChartRequest = new WinLossChartRequest();
    request.id = reportDetails.id;
    request.fromDate = reportFilter.fromDate;
    request.toDate = reportFilter.toDate;
    request.type = subtype;
    return request;
  }

}
