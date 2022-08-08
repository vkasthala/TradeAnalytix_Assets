import { Injectable } from '@angular/core';
import { ReportDetails } from '../model/report-details.model';
import { ReportSubType } from '../model/report-sub-type.model';
import { ReportCategory } from '../model/report-category.enum';
import { CodedRuleService } from '../../settings/services/coded-rule.service';
import { UserCodedRule } from '../../settings/models/user-coded-rule.model';

@Injectable({
  providedIn: 'root'
})
export class ReportTypeService {

  constructor() { }

  getSubTypesByCategory(category: string): ReportSubType[] {
    let subTypes: ReportSubType[] = [];
    if (category === 'portfolio') {
      subTypes = this.getPortfolioSubTypes();
    } else if (category === 'performance') {
      subTypes = this.getPerformanceSubTypes();
    } else if (category === 'risk') {
      subTypes = this.getRiskReportSubTypes();
    }
    return subTypes;
  }

  getRuleReportsSubTypes(category: string, userCodedRules: UserCodedRule[]): ReportSubType[] {
    let reportSubTypes: ReportSubType[] = [];

    if (userCodedRules && userCodedRules.length) {
      for (let ind = 0; ind < userCodedRules.length; ind++) {
        const reportSubType: ReportSubType = new ReportSubType();
        reportSubType.name = userCodedRules[ind].ruleName;
        reportSubType.id = userCodedRules[ind].id ? userCodedRules[ind].id + '' : '0';
        const winRateReportDetails: ReportDetails = new ReportDetails('rule_winrate', 'Win Rate By Rule Alignment', ReportCategory.Rule, "This report illustrates the importance of a rule set by the user by showing the win rate on the trades in which the rule is aligned");
        winRateReportDetails.url = '/reports/rule/win-rate/' + (userCodedRules[ind].id ? userCodedRules[ind].id + '' : '0');
        const realizedReturnReportDetails: ReportDetails = new ReportDetails('rule_realizedreturn', 'Realized Return By Rule Alignment', ReportCategory.Rule, "This report illustrates the importance of a rule set by the user by showing the realized return on the trades in which the rule is aligned");
        realizedReturnReportDetails.url = '/reports/rule/realized-return/' + (userCodedRules[ind].id ? userCodedRules[ind].id + '' : '0');
        reportSubType.reportDetailList = [winRateReportDetails, realizedReturnReportDetails];
        reportSubTypes.push(reportSubType);
      }
    }
   

    return reportSubTypes;
  }

  private getPortfolioSubTypes(): ReportSubType[] {
    let reportSubTypes: ReportSubType[] = [];

    let reportSubType: ReportSubType = new ReportSubType();

    reportSubType.name = 'Value at Risk by Asset';
    reportSubType.id = "max_risk_asset";
    reportSubType.reportDetailList = [new ReportDetails('max_risk_asset', 'Value at Risk by Asset Chart', ReportCategory.Dashboard, "This report shows the current maximum risk of the user's portfolio by symbol. Maximum risk is calculated based on the previous 30-day volatility of the stocks.")];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Allocation By Stock';
    reportSubType.id = "allocation-stock";
    reportSubType.reportDetailList = [new ReportDetails('allocation-long-stock', 'Allocation By Net Debit ', ReportCategory.Allocation, "This report shows the diversification of the portfolio by symbol by depicting the proportion of the amount currently put in different trades by symbol. User's cash on-hand is ignored in this report."), new ReportDetails('allocation-short-stock', 'Allocation By Net Credit', ReportCategory.Allocation, "This report shows the diversification of the portfolio by symbol by depicting the proportion of the amount currently put in different trades by symbol. User's cash on-hand is ignored in this report.")];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Allocation By Sector';
    reportSubType.id = "allocation-sector";
    reportSubType.reportDetailList = [new ReportDetails('allocation-long-sector', 'Allocation By Net Debit', ReportCategory.Allocation, "This report shows the diversification of the portfolio by sector by depicting the proportion of the amount currently put in different trades by sector. User's cash on-hand is ignored in this report."), new ReportDetails('allocation-short-sector', 'Allocation By Net Credit', ReportCategory.Allocation, "This report shows the diversification of the portfolio by sector by depicting the proportion of the amount currently put in different trades by sector. User's cash on-hand is ignored in this report.")];
    reportSubTypes.push(reportSubType);

    return reportSubTypes;
  }

  private getPerformanceSubTypes(): ReportSubType[] {
    let reportSubTypes: ReportSubType[] = [];

    let reportSubType: ReportSubType = new ReportSubType();
    reportSubType.name = 'Realized Return';
    reportSubType.id = "overview";
    reportSubType.reportDetailList = [new ReportDetails('total_net_return_win_rate', 'Realized Return', ReportCategory.Dashboard, "This report shows the realized return of the user's portfolio for the selected date range.")];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Calendar Report';
    reportSubType.id = "calendar_report";
    reportSubType.reportDetailList = [new ReportDetails('return_by_asset_type', 'Calendar Report', ReportCategory.Calendar_Report, "This report shows the unrealized return and number of trades executed by the user on all the days in the selected month")];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Top-10 Symbols';
    reportSubType.reportDetailList = [new ReportDetails('net_return_top_symbols', 'Top 10 Symbols by Net Return', ReportCategory.Symbols_By_Net_Return, "This report shows the realized return of top 10 symbols"), new ReportDetails('win_loss_top_symbols', 'Top 10 Symbols by Win Rate', ReportCategory.Symbols_By_Win_Loss, "This report shows the win rate of top 10 symbols")];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Bottom-10 Symbols';
    reportSubType.reportDetailList = [new ReportDetails('net_return_bottom_symbols', 'Bottom 10 Symbols by Net Return', ReportCategory.Symbols_By_Net_Return, "This report shows the realized return of bottom 10 symbols"), new ReportDetails('win_loss_bottom_symbols', 'Bottom 10 Symbols by Win Rate', ReportCategory.Symbols_By_Win_Loss, "This report shows the win rate of bottom 10 symbols")];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Holding Period';
    reportSubType.id = "holding_period";
    reportSubType.reportDetailList = [new ReportDetails('net_return_holdingperiod', 'Net Return by Holding Period', ReportCategory.Net_Return, "This report shows the realized return of the user's portfolio by holding period of the trades for the selected date range."), new ReportDetails('win_loss_holdingperiod', 'Win/Loss by Holding Period', ReportCategory.Win_Loss, "This report shows the number of winning and losing trades by tags assigned to the trades by the user")];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Asset Type';
    reportSubType.id = "asset_type";
    reportSubType.reportDetailList = [new ReportDetails('return_by_asset_type', 'Realized Return by Asset Type', ReportCategory.Asset_Type, "This report shows the realized return by asset type")];
    reportSubTypes.push(reportSubType);

     reportSubType = new ReportSubType();
    reportSubType.name = 'Trade Day and Time';
    reportSubType.id = "initiated_day";
    reportSubType.reportDetailList = [new ReportDetails('net_return_tradeday', 'Net Return by Trade Day', ReportCategory.Net_Return, "This report shows the realized return of the user's portfolio by the day on which they are opened"), new ReportDetails('win_loss_tradeday', 'Win/Loss by Trade Day', ReportCategory.Win_Loss, "This report shows the number of winning and losing trades by the day on which the user opened the trade")];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Trade Count';
    reportSubType.id = "trade_count";
    reportSubType.reportDetailList = [new ReportDetails('trade_count', 'Trade Count by Day', ReportCategory.Allocation, "This report shows the transactions of user by executed day")];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Commissions';
    reportSubType.id = "commissions";
    reportSubType.reportDetailList = [new ReportDetails('daily-commission', 'Daily Commission', ReportCategory.Commission, "This report shows commission amount by day"), new ReportDetails('commission-by-asset', 'Commission Paid by Asset Type', ReportCategory.Commission, "This report shows commission amount by asset type")];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Stock Price Range';
    reportSubType.id = "stockPrice";
    reportSubType.reportDetailList = [new ReportDetails('net-return-price-range', 'Realized Return by Price Range', ReportCategory.Symbols_By_Net_Return, "This report shows the realized return by stock price range"), new ReportDetails('win-loss-price-range', 'Win Rate by Price Range', ReportCategory.Symbols_By_Win_Loss, "This report shows the win rate by stock price range")];
    reportSubTypes.push(reportSubType);

    

    // reportSubType = new ReportSubType();
    // reportSubType.name = 'Strategy Type';
    // reportSubType.id = "type";
    // reportSubType.reportDetailList = [new ReportDetails('net_return_strategy_type', 'Net Return by Strategy Type', ReportCategory.Net_Return, "This report shows the realized return of the user's portfolio by strategy type for the selected date range."), new ReportDetails('win_loss_strategy_type', 'Win/Loss by Strategy Type', ReportCategory.Win_Loss, "This report shows the number of winning and losing trades by strategy type for the selected date range.")];
    // reportSubTypes.push(reportSubType);

    

    

    // reportSubType = new ReportSubType();
    // reportSubType.name = 'Close Date';
    // reportSubType.id = "closeDate";
    // reportSubType.reportDetailList = [];
    // reportSubTypes.push(reportSubType);

    // reportSubType = new ReportSubType();
    // reportSubType.name = 'Entry Date';
    // reportSubType.id = "entry_date";
    // reportSubType.reportDetailList = [];
    // reportSubTypes.push(reportSubType);

    

    

    reportSubType = new ReportSubType();
    reportSubType.name = 'Maximum Risk and Proﬁt Potential';
    reportSubType.id = "risk_max_risk_profit";
    reportSubType.reportDetailList = [new ReportDetails('max_risk_profit', 'Maximum Risk and Proﬁt Potential', ReportCategory.Risk, "This report shows the potential maximum risk and maximum profit of the portfolio during the selected range. Maximum risk and profit are calculated based on the previous 30-day volatility of the stocks.")];
    reportSubTypes.push(reportSubType);

    return reportSubTypes;
  }

  private getDisciplineReportSubTypes(): ReportSubType[] {
    let reportSubTypes: ReportSubType[] = [];

    let reportSubType: ReportSubType = new ReportSubType();
    reportSubType.name = 'Planned Trades';
    reportSubType.id = "discipline_performance";
    reportSubType.reportDetailList = [new ReportDetails('discipline_trade_type', 'Return and Win Rate by planned trades', ReportCategory.Discipline, "This report compares the realized return of the user's portfolio by planned and impromptu trades")];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Trade Plan Compliance';
    reportSubType.id = "discipline_compliance";
    reportSubType.reportDetailList = [new ReportDetails('discipline_netreturn', 'Net Return by Trade Plan Compliance', ReportCategory.Discipline, "This report illustrates the importance of creating a trade plan by showing the realized return on the days trade plan was created"), new ReportDetails('discipline_winrate', 'Win Rate by Trade Plan Compliance', ReportCategory.Discipline, "This report illustrates the importance of creating a trade plan by showing the realized return on the days trade plan was created")];
    reportSubTypes.push(reportSubType);

    return reportSubTypes;
  }

  private getRiskReportSubTypes(): ReportSubType[] {
    let reportSubTypes: ReportSubType[] = [];

    let reportSubType: ReportSubType = new ReportSubType();
    reportSubType.name = 'Goal Status';
    reportSubType.id = "goal_status";
    reportSubType.reportDetailList = [new ReportDetails('goal_status', 'Goal Status', ReportCategory.Goal_Status, "This report compares the goals set by the user for a given period against the realized return during that period.")];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Tag';
    reportSubType.id = "trade_tags";
    reportSubType.reportDetailList = [new ReportDetails('net_return_trade_tags', 'Net Return by Tag', ReportCategory.Net_Return_Tag, "This report shows the realized return of the user's portfolio by tags assigned to the trades"), new ReportDetails('win_loss_trade_tags', 'Win/Loss by Tag', ReportCategory.Win_Loss_Tag, "This report shows the number of winning and losing trades by tags assigned to the trades by the user")];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Technical Indicator';
    reportSubType.id = "technical_indicator";
    reportSubType.reportDetailList = [new ReportDetails('net_return_technicalindicator', 'Net Return by Technical Indicator', ReportCategory.Net_Return, "This report shows the realized return of the user's portfolio by technical indicator used to open the trade"), new ReportDetails('win_loss_technicalindicator', 'Win/Loss by Technical Indicator', ReportCategory.Win_Loss, "This report shows the number of winning and losing trades by technical indicator used to open the trade")];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Source';
    reportSubType.id = "source";
    reportSubType.reportDetailList = [new ReportDetails('net_return_source', 'Net Return by Source', ReportCategory.Net_Return, "This report shows the realized return of the user's portfolio by the source of the trade idea"), new ReportDetails('win_loss_source', 'Win/Loss by Source', ReportCategory.Win_Loss, "This report shows the number of winning and losing trades by the source of the trade idea")];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Events';
    reportSubType.id = "event";
    reportSubType.reportDetailList = [new ReportDetails('net_return_events', 'Net Return by Events', ReportCategory.Net_Return, "This report shows the realized return of the user's portfolio by the event that triggered to open the trade"), new ReportDetails('win_loss_events', 'Win/Loss by Events', ReportCategory.Win_Loss, "This report shows the number of winning and losing trades by the event that triggered to open the trade")];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Direction';
    reportSubType.id = "direction";
    reportSubType.reportDetailList = [new ReportDetails('net_return_direction', 'Net Return by Direction', ReportCategory.Net_Return, "This report shows the realized return of the user's portfolio by direction for the selected date range."), new ReportDetails('win_loss_direction', 'Win/Loss by Direction', ReportCategory.Win_Loss, "This report shows the number of winning and losing trades by direction for the selected date range.")];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Contrarian';
    reportSubType.id = "contrarian";
    reportSubType.reportDetailList = [new ReportDetails('net_return_contrarian', 'Net Return by Contrarian', ReportCategory.Net_Return, "This report shows the realized return by contrarian type"), new ReportDetails('win_loss_contrarian', 'Win/Loss by Contrarian', ReportCategory.Win_Loss, "This report shows the number of winning and losing trades by contrarian")];
    reportSubTypes.push(reportSubType);

    // reportSubType = new ReportSubType();
    // reportSubType.name = 'Net R';
    // reportSubType.id = "net_r";
    // reportSubType.reportDetailList = [new ReportDetails('net_r', 'Net R', ReportCategory.Risk, "This report shows the risk adjusted return of the user's portfolio.")];
    // reportSubTypes.push(reportSubType);

    // reportSubType = new ReportSubType();
    // reportSubType.name = 'Portfolio Systematic Risk';
    // reportSubType.id = "portfolio_systematic_risk";
    // reportSubType.reportDetailList = [];
    // reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Mindset';
    reportSubType.id = "mindset";
    reportSubType.reportDetailList = [new ReportDetails('net_return_mindset', 'Net Return by Mindset', ReportCategory.Net_Return, "This report shows the realized return of the user's portfolio by user's mindset at the time of opening the trade"), new ReportDetails('win_loss_mindset', 'Win/Loss by Mindset', ReportCategory.Win_Loss, "This report shows the number of winning and losing trades by user's mindset at the time of opening the trade")];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Entry Price';
    reportSubType.reportDetailList = [];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Planned Trades';
    reportSubType.id = "discipline_performance";
    reportSubType.reportDetailList = [new ReportDetails('discipline_trade_type', 'Return and Win Rate by planned trades', ReportCategory.Discipline, "This report compares the realized return of the user's portfolio by planned and impromptu trades")];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Trade Plan Compliance';
    reportSubType.id = "discipline_compliance";
    reportSubType.reportDetailList = [new ReportDetails('discipline_netreturn', 'Net Return by Trade Plan Compliance', ReportCategory.Discipline, "This report illustrates the importance of creating a trade plan by showing the realized return on the days trade plan was created"), new ReportDetails('discipline_winrate', 'Win Rate by Trade Plan Compliance', ReportCategory.Discipline, "This report illustrates the importance of creating a trade plan by showing the realized return on the days trade plan was created")];
    reportSubTypes.push(reportSubType);

    return reportSubTypes;
  }

  /*private getGoalsReportSubTypes(): ReportSubType[] {
    let reportSubTypes: ReportSubType[] = [];

    let reportSubType: ReportSubType = new ReportSubType();
    reportSubType.name = 'Goal Status';
    reportSubType.id = "goal_status";
    reportSubType.reportDetailList = [new ReportDetails('goal_status', 'Goal Status', ReportCategory.Goal_Status, "This report compares the goals set by the user for a given period against the realized return during that period.")];
    reportSubTypes.push(reportSubType);

    return reportSubTypes;
  }*/

}
