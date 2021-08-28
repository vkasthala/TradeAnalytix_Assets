import { Component, OnInit, ViewChild } from '@angular/core';
import { IMyDateRangeModel } from 'mydaterangepicker';
import { Subject } from 'rxjs';
import { StockSymbol } from 'src/app/modules/shared/models/trade-management/stock-symbol.model';
import { TradeSearchComponent } from 'src/app/modules/trade-management/components/add-trade/Steps/search-trade/trade-search.component';
import { ReportDetails } from '../../model/report-details.model';
import { ReportFilter } from '../../model/report-filter.model';
import { ReportSubType } from '../../model/report-sub-type.model';
import { ReportSummaryItem } from '../../model/report-summary-item.model';
import { ReportTypeService } from '../../services/report-type.service';
import { ReportChartComponent } from '../report-chart/report-chart.component';
import { ReportSummaryComponent } from '../report-summary/report-summary.component';

@Component({
  selector: 'app-report-tab-content',
  templateUrl: './report-tab-content.component.html',
  styleUrls: ['./report-tab-content.component.scss']
})
export class ReportTabContentComponent implements OnInit {

  @ViewChild('reportSummary', { static: false }) protected reportSummary: ReportSummaryComponent;

  @ViewChild('reportChart', { static: false }) protected reportChart: ReportChartComponent;

  @ViewChild('tradeSearchComponent', { static: false }) protected tradeSearchComponent: TradeSearchComponent;

  filterChangeSubject: Subject<ReportFilter> = new Subject<ReportFilter>();

  reportTypeChangeSubject: Subject<ReportFilter> = new Subject<ReportFilter>();

  protected reportSubTypes: ReportSubType[];

  protected reports: ReportDetails[];

  protected reportSummaryItems: ReportSummaryItem[] = [];

  protected subtype: string;

  protected reportFilter: ReportFilter = new ReportFilter();

  protected dateFilter: any;

  constructor(protected type: string, protected reportTypeService: ReportTypeService) { }

  ngOnInit() {
    this.dateFilter = this.initDateFilter();
  }

  onReportSubTypeSelect(type: ReportSubType): void {
    this.subtype = type.id;
    this.reportFilter.summaryType = type.id;
    this.reports = type.reportDetailList;
    this.reportTypeChangeSubject.next(this.reportFilter);
  }

  onDateRangeChanged(event: IMyDateRangeModel) {
    console.log('date::', event);
    let formattedText = event.formatted;
    let seperatorInd = formattedText.indexOf(' - ');
    if (seperatorInd > -1) {
      this.reportFilter.fromDate = formattedText.substring(0, seperatorInd).trim();
      this.reportFilter.toDate = formattedText.substring(seperatorInd + 3).trim();
    }
    this.filterChangeSubject.next(this.reportFilter);
  }

  initDateFilter(): any {
    let today = new Date();
    let dateObj = {
      beginDate: { year: today.getFullYear(), month: 1, day: 1 },
      endDate: { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() }
    };
    this.reportFilter.fromDate = today.getFullYear() + '-01-01';
    this.reportFilter.toDate = today.toISOString().slice(0, 10);;
    console.log('init date:', dateObj);
    return dateObj;
  }

  protected reloadData(tab: string) {

  }

  symbolSelectEventHandler(selectedSymbol: StockSymbol) {
    this.reportFilter.stockId = selectedSymbol.id;
    this.reportFilter.symbol = selectedSymbol.code + '';
    console.log('filter after selecting symbol:', this.reportFilter);
    this.filterChangeSubject.next(this.reportFilter);
  }

  onClearSymbol(){
    delete this.reportFilter.stockId;
    delete this.reportFilter.symbol;
    this.tradeSearchComponent.clearSelection();
    console.log('filter after clear symbol:', this.reportFilter);
    this.filterChangeSubject.next(this.reportFilter);
  }

}
