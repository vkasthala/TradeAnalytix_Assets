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
    request.stockId = reportFilter.stockId;
    request.symbol = reportFilter.symbol;
    return request;
  }

  public getWinLossChartRequest(reportDetails: ReportDetails, subtype: string, reportFilter: ReportFilter): ChartRequest {
    let request: WinLossChartRequest = new WinLossChartRequest();
    request.id = reportDetails.id;
    request.fromDate = reportFilter.fromDate;
    request.toDate = reportFilter.toDate;
    request.type = subtype;
    request.stockId = reportFilter.stockId;
    request.symbol = reportFilter.symbol;
    return request;
  }

  public getDisciplineChartRequest(reportDetails: ReportDetails, subtype: string, reportFilter: ReportFilter): ChartRequest {
    let request: ChartRequest = new ChartRequest();
    request.id = reportDetails.id;
    request.fromDate = reportFilter.fromDate;
    request.toDate = reportFilter.toDate;
    request.stockId = reportFilter.stockId;
    request.symbol = reportFilter.symbol;
    return request;
  }

  public getCommonChartRequest(reportDetails: ReportDetails, subtype: string, reportFilter: ReportFilter): ChartRequest {
    let request: ChartRequest = new ChartRequest();
    request.id = reportDetails.id;
    request.fromDate = reportFilter.fromDate;
    request.toDate = reportFilter.toDate;
    request.stockId = reportFilter.stockId;
    request.symbol = reportFilter.symbol;
    return request;
  }

  public getDashboardChartRequest(reportId: string): ChartRequest {
    let request: ChartRequest = new ChartRequest();
    request.id = reportId;
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

  public getDashbpardReportUrl(reportId: string) {
    let url: string;
    if ('realizedReturnByDay' === reportId) {
      url = '/reports/dashboard/day-realized-return';
    } else if ('riskAmountByAsset' === reportId) {
      url = '/reports/dashboard/risk-amount-by-asset';
    } else if ('userGoalByDate' === reportId) {
      url = '/reports/dashboard/goalstatus';
    } else if ('returnsCalendar' === reportId) {
      let today = new Date();
      url = '/reports/dashboard/calendarChart/' + today.getFullYear() + '/' + today.getMonth();
    }
    return url;
  }

  public getAllocationReportUrl(reportId: string) {
    let url: string;
    if ('allocation-long-stock' === reportId) {
      url = '/reports/portfolio/allocation-long-stock';
    } else if ('allocation-long-sector' === reportId) {
      url = '/reports/portfolio/allocation-long-sector';
    } else if ('allocation-short-stock' === reportId) {
      url = '/reports/portfolio/allocation-short-stock';
    } else if ('allocation-short-sector' === reportId) {
      url = '/reports/portfolio/allocation-short-sector';
    } else if ('trade_count' === reportId) {
      url = '/reports/portfolio/trade-count';
    }
    return url;
  }

  public getDashboardReportApiUrl(reportId: string) {
    let url: string;
    if ('total_net_return_win_rate' === reportId) {
      url = '/reports/performance/day-realized-return';
    } else if ('max_risk_asset' === reportId) {
      url = '/reports/risk/risk-amount-by-asset';
    }
    return url;
  }

  public getSymbolsByWinLossApiUrl(reportId: string): string {
    let url: string;
    if ('win_loss_top_symbols' === reportId) {
      url = '/reports/performance/win_loss_top_symbols';
    } else if ('win_loss_bottom_symbols' === reportId) {
      url = '/reports/performance/win_loss_bottom_symbols';
    } else if('win-loss-price-range' === reportId) {
      url = '/reports/performance/win-loss-price-range';
    }
    return url;
  }

  public getSymbolsByReturnApiUrl(reportId: string): string {
    let url: string;
    if ('net_return_top_symbols' === reportId) {
      url = '/reports/performance/net-return-top-symbols';
    } else if ('net_return_bottom_symbols' === reportId) {
      url = '/reports/performance/net-return-bottom-symbols';
    } else if('net-return-price-range' === reportId) {
      url = '/reports/performance/net-return-price-range';
    }
    return url;
  }

  public getAssetTypeApiUrl(reportId: string) : string {
    let url: string;
    if ('return_by_asset_type' === reportId) {
      url = '/reports/performance/return_by_asset_type';
    }
    return url;
  }

}
