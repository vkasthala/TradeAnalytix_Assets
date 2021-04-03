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

  public getDisciplineChartRequest(reportDetails: ReportDetails, subtype: string, reportFilter: ReportFilter): ChartRequest {
    let request: ChartRequest = new ChartRequest();
    request.id = reportDetails.id;
    request.fromDate = reportFilter.fromDate;
    request.toDate = reportFilter.toDate;
    return request;
  }

  public getCommonChartRequest(reportDetails: ReportDetails, subtype: string, reportFilter: ReportFilter): ChartRequest {
    let request: ChartRequest = new ChartRequest();
    request.id = reportDetails.id;
    request.fromDate = reportFilter.fromDate;
    request.toDate = reportFilter.toDate;
    return request;
  }

  public getDisciplineReportApiUrl(reportId: string): string {
    let url: string;
    if ('discipline_trade_type' === reportId) {
      url = '/reports/discipline/netreturn-winloss';
    } else if ('discipline_netreturn' === reportId) {
      url = '/reports/discipline/compliance-netreturn';
    } else if ('discipline_winrate' === reportId) {
      url = '/reports/discipline/compliance-winrate';
    }
    return url;
  }

  public getRiskReportApiUrl(reportId: string): string {
    let url: string;
    if ('max_risk_profit' === reportId) {
      url = '/reports/risk/max-risk-profit';
    } else if ('net_r' === reportId) {
      url = '/reports/risk/netr';
    }
    return url;
  }

}
