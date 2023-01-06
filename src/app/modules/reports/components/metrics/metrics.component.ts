import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ReportsItem } from '../../model/reports-item.model';
import { ReportTabContentComponent } from '../report-tab-content/report-tab-content.component';
import { ReportTypeService } from '../../services/report-type.service';
import { ReportFilter } from '../../model/report-filter.model';
import { SummaryRequest } from 'src/app/modules/shared/models/reports/summary-request.model';
import { ReportDataService } from '../../services/report-data.service';
import * as moment from 'moment';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss']
})
export class MetricsComponent extends ReportTabContentComponent implements OnInit, AfterViewInit {

  private USER_PL_TYPE: string = "user_pl";
  private STRATEGY_TYPE: string = "type";
  private VOLUME_TYPE: string = "trade_volume";
  private DIRECTION_TYPE: string = "direction";

  private initialTypes: string[] = [this.USER_PL_TYPE, this.STRATEGY_TYPE, this.VOLUME_TYPE, this.DIRECTION_TYPE];
  private secondLevelTypes: string[] = [];
  private allTypes: string[] = [this.USER_PL_TYPE, this.STRATEGY_TYPE, this.VOLUME_TYPE, this.DIRECTION_TYPE];

  showMoreMetrics: boolean = false;
  allTypesLoaded: boolean = false;
  loader: boolean = false;

  plSummary: any = {};
  volumeSummary: any = {};
  strategySummary: any = {};
  directionSummary: any = {};


  constructor(reportTypeService: ReportTypeService, private reportDataService: ReportDataService) {
    super('stats', reportTypeService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  toggleMetrics() {
    this.showMoreMetrics = !this.showMoreMetrics;
    if (!this.allTypesLoaded) {
      this.loadStats(this.secondLevelTypes, true);
    }
  }

  ngAfterViewInit(): void {
    this.loadStats(this.initialTypes, false);
    this.filterChangeSubject.asObservable().subscribe(data => {
      this.loadStats(this.allTypes, true);
    });
  }

  loadStats(types: string[], allLoaded: boolean) {
    this.loader = true;
    this.reportDataService.getReportStats(this.createSummaryRequest(types)).subscribe(result => {
      this.loader = false;
      if (result && result.stats) {
        this.assignSummaryObjects(result.stats);
        this.allTypesLoaded = allLoaded;
      }
    });
  }

  assignSummaryObjects(map: any) {
    Object.keys(map).forEach(key => {
      if (key === this.USER_PL_TYPE) {
        this.plSummary = map[key];
      } else if (key === this.STRATEGY_TYPE) {
        this.strategySummary = map[key];
      } else if (key === this.VOLUME_TYPE) {
        this.volumeSummary = map[key];
      } else if (key == this.DIRECTION_TYPE) {
        this.directionSummary = map[key];
      }
    });
  }

  createSummaryRequest(types: string[]): SummaryRequest {
    let summaryRequest: SummaryRequest = new SummaryRequest();
    summaryRequest.fromDate = this.reportFilter.fromDate;
    summaryRequest.toDate = this.reportFilter.toDate;
    summaryRequest.summaryTypes = types;
    summaryRequest.symbol = this.reportFilter.symbol;
    summaryRequest.stockId = this.reportFilter.stockId;
    return summaryRequest;
  }

  percentage(partialValue, totalValue) {
    return (100 * partialValue) / totalValue;
  }

  getAvgTradeCount(totatlTradeCount: number) {
    if (totatlTradeCount) {
      return totatlTradeCount / this.calculateWorkdays();
    }
    return 0;
  }

  calculateWorkdays(): number {
    const totalDays: number = moment(this.reportFilter.toDate).diff(moment(this.reportFilter.fromDate), 'days') + 1;
    const dayOfWeek = moment(this.reportFilter.fromDate).isoWeekday();
    let totalWorkdays = 0;

    for (let i = dayOfWeek; i < totalDays + dayOfWeek; i++) {
      if (i % 7 !== 6 && i % 7 !== 0) {
        totalWorkdays++;
      }
    }
    return totalWorkdays;
  }

}
