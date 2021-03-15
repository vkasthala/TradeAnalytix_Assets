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
    if (category === 'performance') {
      subTypes = this.getPerformanceSubTypes();
    } else if (category === 'discipline') {
      subTypes = this.getDisciplineReportSubTypes();
    }
    return subTypes;
  }

  private getPerformanceSubTypes(): ReportSubType[] {
    let reportSubTypes: ReportSubType[] = [];

    let reportSubType: ReportSubType = new ReportSubType();
    /*reportSubType.name = 'Overview';
    reportSubType.reportDetailList = [new ReportDetails('goal_status', 'Goal Status'), new ReportDetails('total_net_return_win_rate', 'Total Net Return & Win-Rate'), new ReportDetails('calendar_eport', 'Calendar Report')];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();*/
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
    reportSubType.name = 'Holding Period';
    reportSubType.id = "holding_period";
    reportSubType.reportDetailList = [new ReportDetails('net_return_holdingperiod', 'Net Return by Holding Period', ReportCategory.Net_Return), new ReportDetails('win_loss_holdingperiod', 'Win/Loss by Holding Period', ReportCategory.Win_Loss)];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Trade Day';
    reportSubType.id = "initiated_day";
    reportSubType.reportDetailList = [new ReportDetails('net_return_tradeday', 'Net Return by Trade Day', ReportCategory.Net_Return), new ReportDetails('win_loss_tradeday', 'Win/Loss by Trade Day', ReportCategory.Win_Loss)];
    reportSubTypes.push(reportSubType);

    /*reportSubType = new ReportSubType();
    reportSubType.name = 'Entry Price';
    reportSubType.reportDetailList = [new ReportDetails('net_return_entryprice', 'Net Return by Entry Price'), new ReportDetails('win_loss_entryprice', 'Win/Loss by Entry Price')];
    reportSubTypes.push(reportSubType);*/

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
    reportSubType.name = 'Mindset';
    reportSubType.id = "mindset";
    reportSubType.reportDetailList = [new ReportDetails('net_return_mindset', 'Net Return by Mindset', ReportCategory.Net_Return), new ReportDetails('win_loss_mindset', 'Win/Loss by Mindset', ReportCategory.Win_Loss)];
    reportSubTypes.push(reportSubType);

    return reportSubTypes;
  }

  private getDisciplineReportSubTypes(): ReportSubType[] {
    let reportSubTypes: ReportSubType[] = [];

    let reportSubType: ReportSubType = new ReportSubType();
    reportSubType.name = 'Performance by Planned Trades';
    reportSubType.id = "type";
    reportSubType.reportDetailList = [new ReportDetails('discipline_trade_type', 'Return and Win Rate by planned trades', ReportCategory.Discipline_Return_Winloss)];
    reportSubTypes.push(reportSubType);

    return reportSubTypes;
  }

}
