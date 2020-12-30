import { Injectable } from '@angular/core';
import { ReportDetails } from '../model/report-details.model';
import { ReportSubType } from '../model/report-sub-type.model';

@Injectable({
  providedIn: 'root'
})
export class ReportTypeService {

  constructor() { }

  getSubTypesByCategory(category: string): ReportSubType[] {
    let subTypes: ReportSubType[] = [];
    if (category === 'performance') {
      subTypes = this.getPerformanceSubTypes();
    }
    return subTypes;
  }

  private getPerformanceSubTypes(): ReportSubType[] {
    let reportSubTypes: ReportSubType[] = [];

    let reportSubType: ReportSubType = new ReportSubType();
    reportSubType.name = 'Overview';
    reportSubType.reportDetailList = [new ReportDetails('goal_status', 'Goal Status'), new ReportDetails('total_net_return_win_rate', 'Total Net Return & Win-Rate'), new ReportDetails('calendar_eport', 'Calendar Report')];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Strategy Type';
    reportSubType.reportDetailList = [new ReportDetails('net_return_strategy_type', 'Net Return by Strategy Type'), new ReportDetails('win_loss_strategy_type', 'Win/Loss by Strategy Type')];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Direction';
    reportSubType.reportDetailList = [new ReportDetails('net_return_direction', 'Net Return by Direction'), new ReportDetails('win_loss_direction', 'Win/Loss by Direction')];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Holding Period';
    reportSubType.reportDetailList = [new ReportDetails('net_return_holdingperiod', 'Net Return by Holding Period'), new ReportDetails('win_loss_holdingperiod', 'Win/Loss by Holding Period')];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Trade Day';
    reportSubType.reportDetailList = [new ReportDetails('net_return_tradeday', 'Net Return by Trade Day'), new ReportDetails('win_loss_tradeday', 'Win/Loss by Trade Day')];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Entry Price';
    reportSubType.reportDetailList = [new ReportDetails('net_return_entryprice', 'Net Return by Entry Price'), new ReportDetails('win_loss_entryprice', 'Win/Loss by Entry Price')];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Technical Indicator';
    reportSubType.reportDetailList = [new ReportDetails('net_return_technicalindicator', 'Net Return by Technical Indicator'), new ReportDetails('win_loss_technicalindicator', 'Win/Loss by Technical Indicator')];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Events';
    reportSubType.reportDetailList = [new ReportDetails('net_return_events', 'Net Return by Events'), new ReportDetails('win_loss_events', 'Win/Loss by Events')];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Source';
    reportSubType.reportDetailList = [new ReportDetails('net_return_source', 'Net Return by Source'), new ReportDetails('win_loss_source', 'Win/Loss by Source')];
    reportSubTypes.push(reportSubType);

    reportSubType = new ReportSubType();
    reportSubType.name = 'Mindset';
    reportSubType.reportDetailList = [new ReportDetails('net_return_mindset', 'Net Return by Mindset'), new ReportDetails('win_loss_mindset', 'Win/Loss by Mindset')];
    reportSubTypes.push(reportSubType);

    return reportSubTypes;
  }

}
