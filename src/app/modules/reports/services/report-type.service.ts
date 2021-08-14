import { Injectable } from '@angular/core';
import { ReportDetails } from '../model/report-details.model';
import { ReportSubType } from '../model/report-sub-type.model';
import { ReportCategory } from '../model/report-category.enum';

@Injectable({
  providedIn: 'root'
})
export class ReportTypeService {

  constructor() { }

  getSubTypesByCategory(category: string): ReportSubType[] {
    let subTypes: ReportSubType[] = [];
    if (category === 'portfolio') {
      subTypes = this.getPortfolioSubTypes();
    } else if(category === 'performance') {
      subTypes = this.getPerformanceSubTypes();
    } else if (category === 'discipline') {
      subTypes = this.getDisciplineReportSubTypes();
    } else if(category === 'risk') {
      subTypes = this.getRiskReportSubTypes();
    } else if(category === 'goals') {
      subTypes = this.getGoalsReportSubTypes();
    }
    return subTypes;
  }
  private getPortfolioSubTypes(): ReportSubType[] {
    let reportSubTypes: ReportSubType[] = [];

    let reportSubType: ReportSubType = new ReportSubType();
    reportSubType.name = 'Allocation By Stock';
    reportSubType.id = "allocation-stock";
    reportSubType.reportDetailList = [new ReportDetails('allocation-stock', 'Allocation By Stock', ReportCategory.Allocation)];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Allocation By Sector';
    reportSubType.id = "allocation-sector";
    reportSubType.reportDetailList = [new ReportDetails('allocation-sector', 'Allocation By Sector', ReportCategory.Allocation)];
    reportSubTypes.push(reportSubType);
    
    return reportSubTypes;
  }
  
  private getPerformanceSubTypes(): ReportSubType[] {
    let reportSubTypes: ReportSubType[] = [];

    let reportSubType: ReportSubType = new ReportSubType();
    reportSubType.name = 'Overview';
    reportSubType.id = "overview";
    reportSubType.reportDetailList = [new ReportDetails('total_net_return_win_rate', 'Realized Return', ReportCategory.Dashboard), new ReportDetails('calendar_report', 'Calendar Report', ReportCategory.Calendar_Report)];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Strategy Type';
    reportSubType.id = "type";
    reportSubType.reportDetailList = [new ReportDetails('net_return_strategy_type', 'Net Return by Strategy Type', ReportCategory.Net_Return), new ReportDetails('win_loss_strategy_type', 'Win/Loss by Strategy Type', ReportCategory.Win_Loss)];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Direction';
    reportSubType.id = "direction";
    reportSubType.reportDetailList = [new ReportDetails('net_return_direction', 'Net Return by Direction', ReportCategory.Net_Return), new ReportDetails('win_loss_direction', 'Win/Loss by Direction', ReportCategory.Win_Loss)];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Tag';
    reportSubType.id = "trade_tags";
    reportSubType.reportDetailList = [new ReportDetails('net_return_trade_tags', 'Net Return by Tag', ReportCategory.Net_Return_Tag), new ReportDetails('win_loss_trade_tags', 'Win/Loss by Tag', ReportCategory.Win_Loss_Tag)];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Holding Period';
    reportSubType.id = "holding_period";
    reportSubType.reportDetailList = [new ReportDetails('net_return_holdingperiod', 'Net Return by Holding Period', ReportCategory.Net_Return), new ReportDetails('win_loss_holdingperiod', 'Win/Loss by Holding Period', ReportCategory.Win_Loss)];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Entry Price';
    reportSubType.reportDetailList = [new ReportDetails('net_return_entryprice', 'Net Return by Entry Price', ReportCategory.Net_Return), new ReportDetails('win_loss_entryprice', 'Win/Loss by Entry Price', ReportCategory.Win_Loss)];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Trade Day';
    reportSubType.id = "initiated_day";
    reportSubType.reportDetailList = [new ReportDetails('net_return_tradeday', 'Net Return by Trade Day', ReportCategory.Net_Return), new ReportDetails('win_loss_tradeday', 'Win/Loss by Trade Day', ReportCategory.Win_Loss)];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Technical Indicator';
    reportSubType.id = "technical_indicator";
    reportSubType.reportDetailList = [new ReportDetails('net_return_technicalindicator', 'Net Return by Technical Indicator', ReportCategory.Net_Return), new ReportDetails('win_loss_technicalindicator', 'Win/Loss by Technical Indicator', ReportCategory.Win_Loss)];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Events';
    reportSubType.id = "event";
    reportSubType.reportDetailList = [new ReportDetails('net_return_events', 'Net Return by Events', ReportCategory.Net_Return), new ReportDetails('win_loss_events', 'Win/Loss by Events', ReportCategory.Win_Loss)];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Source';
    reportSubType.id = "source";
    reportSubType.reportDetailList = [new ReportDetails('net_return_source', 'Net Return by Source', ReportCategory.Net_Return), new ReportDetails('win_loss_source', 'Win/Loss by Source', ReportCategory.Win_Loss)];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Contrarian';
    reportSubType.id = "contrarian";
    reportSubType.reportDetailList = [new ReportDetails('contrarian', 'Contrarian Chart Title', ReportCategory.Net_Return)];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Mindset';
    reportSubType.id = "mindset";
    reportSubType.reportDetailList = [new ReportDetails('net_return_mindset', 'Net Return by Mindset', ReportCategory.Net_Return), new ReportDetails('win_loss_mindset', 'Win/Loss by Mindset', ReportCategory.Win_Loss)];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Strike Price';
    reportSubType.id = "strike_price";
    reportSubType.reportDetailList = [new ReportDetails('strike_price', 'Strike Price Chart title', ReportCategory.Net_Return)];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Entry Date';
    reportSubType.id = "entry_date";
    reportSubType.reportDetailList = [new ReportDetails('entry_date', 'Entry Date Chart title', ReportCategory.Net_Return)];
    reportSubTypes.push(reportSubType);

    return reportSubTypes;
  }

  private getDisciplineReportSubTypes(): ReportSubType[] {
    let reportSubTypes: ReportSubType[] = [];

    let reportSubType: ReportSubType = new ReportSubType();
    reportSubType.name = 'Planned Trades';
    reportSubType.id = "discipline_performance";
    reportSubType.reportDetailList = [new ReportDetails('discipline_trade_type', 'Return and Win Rate by planned trades', ReportCategory.Discipline)];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Trade Plan Compliance';
    reportSubType.id = "discipline_compliance";
    reportSubType.reportDetailList = [new ReportDetails('discipline_netreturn', 'Net Return by Trade Plan Compliance', ReportCategory.Discipline), new ReportDetails('discipline_winrate', 'Win Rate by Trade Plan Compliance', ReportCategory.Discipline)];
    reportSubTypes.push(reportSubType);
    
    return reportSubTypes;
  }

  private getRiskReportSubTypes(): ReportSubType[] {
    let reportSubTypes: ReportSubType[] = [];

    let reportSubType: ReportSubType = new ReportSubType();
    reportSubType.name = 'Max Risk and Profit';
    reportSubType.id = "risk_max_risk_profit";
    reportSubType.reportDetailList = [new ReportDetails('max_risk_profit', 'Maximum Risk and Proﬁt Potential', ReportCategory.Risk)];
    reportSubTypes.push(reportSubType);
    
    reportSubType = new ReportSubType();
    reportSubType.name = 'Max Risk by Asset';
    reportSubType.id = "max_risk_asset";
    reportSubType.reportDetailList = [new ReportDetails('max_risk_asset', 'Max Risk by Asset Chart', ReportCategory.Dashboard)];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Net R';
    reportSubType.id = "net_r";
    reportSubType.reportDetailList = [new ReportDetails('net_r', 'Net R', ReportCategory.Risk)];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Portfolio Systematic Risk';
    reportSubType.id = "portfolio_systematic_risk";
    reportSubType.reportDetailList = [new ReportDetails('portfolio_systematic_risk', 'Portfolio Systematic Risk Chart title', ReportCategory.Risk)];
    reportSubTypes.push(reportSubType);

    return reportSubTypes;
  }
  private getGoalsReportSubTypes(): ReportSubType[] {
    let reportSubTypes: ReportSubType[] = [];

    let reportSubType: ReportSubType = new ReportSubType();
    reportSubType.name = 'Goal Status';
    reportSubType.id = "goal_status";
    reportSubType.reportDetailList = [new ReportDetails('goal_status', 'Goal Status', ReportCategory.Goal_Status)];
    reportSubTypes.push(reportSubType);

    return reportSubTypes;
  }

}
