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
    } else if(category === 'rules') {
      subTypes = this.getReportsRulesSubTypes();
    } else if(category === 'goals') {
      subTypes = this.getGoalsReportSubTypes();
    }
    return subTypes;
  }
  private getPortfolioSubTypes(): ReportSubType[] {
    let reportSubTypes: ReportSubType[] = [];

    let reportSubType: ReportSubType = new ReportSubType();
    reportSubType.name = 'Allocation By Stock';
    reportSubType.description = "This report shows the diversification of the portfolio by symbol by depicting the proportion of the amount currently put in different trades by symbol. User's cash on-hand is ignored in this report.";
    reportSubType.id = "allocation-stock";
    reportSubType.reportDetailList = [new ReportDetails('allocation-stock', 'Allocation By Stock', ReportCategory.Allocation)];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Allocation By Sector';
    reportSubType.description = "This report shows the diversification of the portfolio by sector by depicting the proportion of the amount currently put in different trades by sector. User's cash on-hand is ignored in this report.";
    reportSubType.id = "allocation-sector";
    reportSubType.reportDetailList = [new ReportDetails('allocation-sector', 'Allocation By Sector', ReportCategory.Allocation)];
    reportSubTypes.push(reportSubType);
    
    return reportSubTypes;
  }
  
  private getPerformanceSubTypes(): ReportSubType[] {
    let reportSubTypes: ReportSubType[] = [];

    let reportSubType: ReportSubType = new ReportSubType();
    reportSubType.name = 'Overview';
    reportSubType.description = "This report shows the realized return of the user's portfolio for the selected date range.";
    reportSubType.id = "overview";
    reportSubType.reportDetailList = [new ReportDetails('total_net_return_win_rate', 'Realized Return', ReportCategory.Dashboard), new ReportDetails('calendar_report', 'Calendar Report', ReportCategory.Calendar_Report)];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Strategy Type';
    reportSubType.description = "This report shows the realized return of the user's portfolio by strategy type for the selected date range.";
    reportSubType.id = "type";
    reportSubType.reportDetailList = [new ReportDetails('net_return_strategy_type', 'Net Return by Strategy Type', ReportCategory.Net_Return), new ReportDetails('win_loss_strategy_type', 'Win/Loss by Strategy Type', ReportCategory.Win_Loss)];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Direction';
    reportSubType.description = "This report shows the realized return of the user's portfolio by direction for the selected date range.";
    reportSubType.id = "direction";
    reportSubType.reportDetailList = [new ReportDetails('net_return_direction', 'Net Return by Direction', ReportCategory.Net_Return), new ReportDetails('win_loss_direction', 'Win/Loss by Direction', ReportCategory.Win_Loss)];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Tag';
    reportSubType.description = "This report shows the realized return of the user's portfolio by tags assigned to the trades";
    reportSubType.id = "trade_tags";
    reportSubType.reportDetailList = [new ReportDetails('net_return_trade_tags', 'Net Return by Tag', ReportCategory.Net_Return_Tag), new ReportDetails('win_loss_trade_tags', 'Win/Loss by Tag', ReportCategory.Win_Loss_Tag)];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Holding Period';
    reportSubType.description = "This report shows the realized return of the user's portfolio by holding period of the trades for the selected date range.";
    reportSubType.id = "holding_period";
    reportSubType.reportDetailList = [new ReportDetails('net_return_holdingperiod', 'Net Return by Holding Period', ReportCategory.Net_Return), new ReportDetails('win_loss_holdingperiod', 'Win/Loss by Holding Period', ReportCategory.Win_Loss)];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Entry Price';
    reportSubType.description = "This report shows the realized return of the user's portfolio by entry price range of the trades";
    reportSubType.reportDetailList = [new ReportDetails('net_return_entryprice', 'Net Return by Entry Price', ReportCategory.Net_Return), new ReportDetails('win_loss_entryprice', 'Win/Loss by Entry Price', ReportCategory.Win_Loss)];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Trade Day';
    reportSubType.id = "initiated_day";
    reportSubType.description = "This report shows the realized return of the user's portfolio by the day on which they are opened";
    reportSubType.reportDetailList = [new ReportDetails('net_return_tradeday', 'Net Return by Trade Day', ReportCategory.Net_Return), new ReportDetails('win_loss_tradeday', 'Win/Loss by Trade Day', ReportCategory.Win_Loss)];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Technical Indicator';
    reportSubType.description = "This report shows the realized return of the user's portfolio by technical indicator used to open the trade";
    reportSubType.id = "technical_indicator";
    reportSubType.reportDetailList = [new ReportDetails('net_return_technicalindicator', 'Net Return by Technical Indicator', ReportCategory.Net_Return), new ReportDetails('win_loss_technicalindicator', 'Win/Loss by Technical Indicator', ReportCategory.Win_Loss)];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Events';
    reportSubType.description = "This report shows the realized return of the user's portfolio by the event that triggered to open the trade";
    reportSubType.id = "event";
    reportSubType.reportDetailList = [new ReportDetails('net_return_events', 'Net Return by Events', ReportCategory.Net_Return), new ReportDetails('win_loss_events', 'Win/Loss by Events', ReportCategory.Win_Loss)];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Source';
    reportSubType.description = "This report shows the realized return of the user's portfolio by the source of the trade idea";
    reportSubType.id = "source";
    reportSubType.reportDetailList = [new ReportDetails('net_return_source', 'Net Return by Source', ReportCategory.Net_Return), new ReportDetails('win_loss_source', 'Win/Loss by Source', ReportCategory.Win_Loss)];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Contrarian';
    reportSubType.description = "This report shows the realized return of the user's portfolio by contrarian trade";
    reportSubType.id = "contrarian";
    reportSubType.reportDetailList = [new ReportDetails('contrarian', 'Contrarian Chart Title', ReportCategory.Net_Return)];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Mindset';
    reportSubType.description = "This report shows the realized return of the user's portfolio by user's mindset at the time of opening the trade";
    reportSubType.id = "mindset";
    reportSubType.reportDetailList = [new ReportDetails('net_return_mindset', 'Net Return by Mindset', ReportCategory.Net_Return), new ReportDetails('win_loss_mindset', 'Win/Loss by Mindset', ReportCategory.Win_Loss)];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Strike Price';
    reportSubType.description = "This report shows the realized return of the user's portfolio by strike price slection (in the money, at the money, or out of the money)";
    reportSubType.id = "strike_price";
    reportSubType.reportDetailList = [new ReportDetails('strike_price', 'Strike Price Chart title', ReportCategory.Net_Return)];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Entry Date';
    reportSubType.description = "This report shows the realized return of the user's portfolio by entry date";
    reportSubType.id = "entry_date";
    reportSubType.reportDetailList = [new ReportDetails('entry_date', 'Entry Date Chart title', ReportCategory.Net_Return)];
    reportSubTypes.push(reportSubType);

    return reportSubTypes;
  }

  private getDisciplineReportSubTypes(): ReportSubType[] {
    let reportSubTypes: ReportSubType[] = [];

    let reportSubType: ReportSubType = new ReportSubType();
    reportSubType.name = 'Planned Trades';
    reportSubType.description = "This report compares the realized return of the user's portfolio by planned and impromptu trades";
    reportSubType.id = "discipline_performance";
    reportSubType.reportDetailList = [new ReportDetails('discipline_trade_type', 'Return and Win Rate by planned trades', ReportCategory.Discipline)];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Trade Plan Compliance';
    reportSubType.description = "This report illustrates the importance of creating a trade plan by showing the realized return on the days trade plan was created";
    reportSubType.id = "discipline_compliance";
    reportSubType.reportDetailList = [new ReportDetails('discipline_netreturn', 'Net Return by Trade Plan Compliance', ReportCategory.Discipline), new ReportDetails('discipline_winrate', 'Win Rate by Trade Plan Compliance', ReportCategory.Discipline)];
    reportSubTypes.push(reportSubType);
    
    return reportSubTypes;
  }

  private getRiskReportSubTypes(): ReportSubType[] {
    let reportSubTypes: ReportSubType[] = [];

    let reportSubType: ReportSubType = new ReportSubType();
    reportSubType.name = 'Max Risk and Profit';
    reportSubType.description = "This report shows the potential maximum risk and maximum profit of the portfolio during the selected range. Maximum risk and profit are calculated based on the previous 30-day volatility of the stocks.";
    reportSubType.id = "risk_max_risk_profit";
    reportSubType.reportDetailList = [new ReportDetails('max_risk_profit', 'Maximum Risk and Proﬁt Potential', ReportCategory.Risk)];
    reportSubTypes.push(reportSubType);
    
    reportSubType = new ReportSubType();
    reportSubType.name = 'Max Risk by Asset';
    reportSubType.description = "This report shows the current maximum risk of the user's portfolio by symbol. Maximum risk is calculated based on the previous 30-day volatility of the stocks.";
    reportSubType.id = "max_risk_asset";
    reportSubType.reportDetailList = [new ReportDetails('max_risk_asset', 'Max Risk by Asset Chart', ReportCategory.Dashboard)];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Net R';
    reportSubType.description = "This report shows the risk adjusted return of the user's portfolio. ";
    reportSubType.id = "net_r";
    reportSubType.reportDetailList = [new ReportDetails('net_r', 'Net R', ReportCategory.Risk)];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Portfolio Systematic Risk';
    reportSubType.description = "This report shows the portfolio systematic risk (beta) of the user's portfolio";
    reportSubType.id = "portfolio_systematic_risk";
    reportSubType.reportDetailList = [new ReportDetails('portfolio_systematic_risk', 'Portfolio Systematic Risk Chart title', ReportCategory.Risk)];
    reportSubTypes.push(reportSubType);

    return reportSubTypes;
  }
  private getGoalsReportSubTypes(): ReportSubType[] {
    let reportSubTypes: ReportSubType[] = [];

    let reportSubType: ReportSubType = new ReportSubType();
    reportSubType.name = 'Goal Status';
    reportSubType.description = "This report compares the goals set by the user for a given period against the realized return during that period.";
    reportSubType.id = "goal_status";
    reportSubType.reportDetailList = [new ReportDetails('goal_status', 'Goal Status', ReportCategory.Goal_Status)];
    reportSubTypes.push(reportSubType);

    return reportSubTypes;
  }

  private getReportsRulesSubTypes(): ReportSubType[] {
    let reportSubTypes: ReportSubType[] = [];
    let reportSubType: ReportSubType = new ReportSubType();
    reportSubType.name = 'Rule 1';
    reportSubType.description = "Rule 1 description";
    reportSubType.id = "rule_1";
    reportSubType.reportDetailList = [new ReportDetails('rule', 'Rule 1', ReportCategory.Rule)];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Rule 2';
    reportSubType.description = "Rule 2 description";
    reportSubType.id = "rule_2";
    reportSubType.reportDetailList = [new ReportDetails('rule', 'Rule 2', ReportCategory.Rule)];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Rule 3';
    reportSubType.description = "Rule 3 description";
    reportSubType.id = "rule_3";
    reportSubType.reportDetailList = [new ReportDetails('rule', 'Rule 3', ReportCategory.Rule)];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Rule 4';
    reportSubType.description = "Rule 4 description";
    reportSubType.id = "rule_4";
    reportSubType.reportDetailList = [new ReportDetails('rule', 'Rule 4', ReportCategory.Rule)];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Rule 5';
    reportSubType.description = "Rule 5 description";
    reportSubType.id = "rule_5";
    reportSubType.reportDetailList = [new ReportDetails('rule', 'Rule 5', ReportCategory.Rule)];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Rule 6';
    reportSubType.description = "Rule 6 description";
    reportSubType.id = "rule_6";
    reportSubType.reportDetailList = [new ReportDetails('rule', 'Rule 6', ReportCategory.Rule)];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Rule 7';
    reportSubType.description = "Rule 7 description";
    reportSubType.id = "rule_7";
    reportSubType.reportDetailList = [new ReportDetails('rule', 'Rule 7', ReportCategory.Rule)];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Rule 8';
    reportSubType.description = "Rule 8 description";
    reportSubType.id = "rule_8";
    reportSubType.reportDetailList = [new ReportDetails('rule', 'Rule 8', ReportCategory.Rule)];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Rule 9';
    reportSubType.description = "Rule 9 description";
    reportSubType.id = "rule_9";
    reportSubType.reportDetailList = [new ReportDetails('rule', 'Rule 9', ReportCategory.Rule)];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Rule 10';
    reportSubType.description = "Rule 10 description";
    reportSubType.id = "rule_10";
    reportSubType.reportDetailList = [new ReportDetails('rule', 'Rule 10', ReportCategory.Rule)];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Rule 11';
    reportSubType.description = "Rule 11 description";
    reportSubType.id = "rule_11";
    reportSubType.reportDetailList = [new ReportDetails('rule', 'Rule 11', ReportCategory.Rule)];
    reportSubTypes.push(reportSubType);

    return reportSubTypes;
  }

}
