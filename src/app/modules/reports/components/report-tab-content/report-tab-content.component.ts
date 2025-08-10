import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { IMyDateRangeModel } from 'mydaterangepicker';
import { Subject, Subscription } from 'rxjs';
import { StockSymbol } from 'src/app/modules/shared/models/trade-management/stock-symbol.model';
import { TradeSearchComponent } from 'src/app/modules/trade-management/components/add-trade/Steps/search-trade/trade-search.component';
import { ReportDetails } from '../../model/report-details.model';
import { ReportFilter } from '../../model/report-filter.model';
import { ReportSubType } from '../../model/report-sub-type.model';
import { ReportSummaryItem } from '../../model/report-summary-item.model';
import { ReportTypeService } from '../../services/report-type.service';
import { ReportChartComponent } from '../report-chart/report-chart.component';
import { ReportSummaryComponent } from '../report-summary/report-summary.component';

interface category {
  id: number;
  name: string;
}

@Component({
  selector: 'app-report-tab-content',
  templateUrl: './report-tab-content.component.html',
  styleUrls: ['./report-tab-content.component.scss']
})
export class ReportTabContentComponent implements OnInit, AfterViewInit, OnDestroy {
  selectedObject: category;

  @ViewChild('reportSummary', { static: false }) protected reportSummary: ReportSummaryComponent;

  @ViewChild('reportChart', { static: false }) protected reportChart: ReportChartComponent;

  //@ViewChild('tradeSearchComponent', { static: false }) protected tradeSearchComponent: TradeSearchComponent;

  @Input("filterChangeSubject") filterChangeSubject: Subject<ReportFilter>;
  @Input("reportFilter") reportFilter: ReportFilter;

  @Output('reportTypeChangeEmitter') reportTypeChangeEmitter: EventEmitter<string> = new EventEmitter();

  reportTypeChangeSubject: Subject<ReportFilter> = new Subject<ReportFilter>();

  protected reportSubTypes: ReportSubType[];

  protected reports: ReportDetails[];

  protected reportSummaryItems: ReportSummaryItem[] = [];

  protected subtype: string;

  protected description: string;

  //protected reportFilter: ReportFilter = new ReportFilter();

  protected dateFilter: any;

  dateChangeSubscription: Subscription;
  symbolChangeSubscription: Subscription;


  constructor(protected type: string, protected reportTypeService: ReportTypeService) { }

  ngOnInit() {
    //this.dateFilter = this.initDateFilter();
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    if (this.dateChangeSubscription) {
      this.dateChangeSubscription.unsubscribe();
    }

    if (this.symbolChangeSubscription) {
      this.symbolChangeSubscription.unsubscribe();
    }
  }

  onReportSubTypeSelect(type: ReportSubType): void {
    this.subtype = type.id;
    this.reportSummary.subtype = type.id;
    this.description = type.description;
    this.reportFilter.summaryType = type.id;
    this.reports = type.reportDetailList;
    this.reportTypeChangeEmitter.emit(type.id);
    // this.filterChangeSubject.next(this.reportFilter);
    //this.reportTypeChangeSubject.next(this.reportFilter);
  }

  onDateRangeChanged(event: IMyDateRangeModel) {
    console.log('date::', event);
    let formattedText = event.formatted;
    let seperatorInd = formattedText.indexOf(' - ');
    if (seperatorInd > -1) {
      this.reportFilter.fromDate = formattedText.substring(0, seperatorInd).trim();
      this.reportFilter.toDate = formattedText.substring(seperatorInd + 3).trim();
    }
    //this.filterChangeSubject.next(this.reportFilter);
  }

  onDateChange(event: ReportFilter) {
    // if (event.fromDate && event.toDate) {
    //   this.reportFilter.fromDate = event.fromDate;
    //   this.reportFilter.toDate = event.toDate;
    //   this.reportFilter.summaryType = this.subtype;
    //   this.filterChangeSubject.next(this.reportFilter);
    // }
    this.reportFilter = event;
    this.reportFilter.summaryType = this.subtype;
  }

  initDateFilter(): any {
    let today = new Date();
    let startDay = new Date();
    startDay.setMonth(startDay.getMonth() - 11);
    let dateObj = {
      beginDate: { year: startDay.getFullYear(), month: startDay.getMonth(), day: 1 },
      endDate: { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() }
    };
    this.reportFilter.fromDate = startDay.toISOString().slice(0, 10);
    this.reportFilter.toDate = today.toISOString().slice(0, 10);
    console.log('init date:', dateObj);
    return dateObj;
  }

  protected reloadData(tab: string) {

  }

}
