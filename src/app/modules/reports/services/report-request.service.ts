import { Injectable } from '@angular/core';
import { ChartRequest } from '../model/chart-request.model';
import { NetReturnChartRequest } from '../model/net-return-chart-request.model';
import { ReportDetails } from '../model/report-details.model';
import { WinLossChartRequest } from '../model/win-loss-chart-request.model';

@Injectable({
  providedIn: 'root'
})
export class ReportRequestService {

  constructor() { }

  public getNetReturnChartRequest(reportDetails: ReportDetails, subtype: string, fromDate: string, toDate: string): ChartRequest {
    let request: NetReturnChartRequest = new NetReturnChartRequest();
    request.id = reportDetails.id;
    request.fromDate = fromDate;
    request.toDate = toDate;
    request.type = subtype;
    return request;
  }

  public getWinLossChartRequest(reportDetails: ReportDetails, subtype: string, fromDate: string, toDate: string): ChartRequest {
    let request: WinLossChartRequest = new WinLossChartRequest();
    request.id = reportDetails.id;
    request.fromDate = fromDate;
    request.toDate = toDate;
    request.type = subtype;
    return request;
  }

}
