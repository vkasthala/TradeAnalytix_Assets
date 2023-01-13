import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { IMyDateRangeModel, IMyDrpOptions } from 'mydaterangepicker';
import { Subject } from 'rxjs';
import { StockSymbol } from '../../shared/models/trade-management/stock-symbol.model';
import { TradeSearchComponent } from '../../trade-management/components/add-trade/Steps/search-trade/trade-search.component';
import { ReportFilter } from '../model/report-filter.model';
import { CommissionsComponent } from './commissions/commissions.component';
import { DisciplineComponent } from './discipline/discipline.component';
import { MetricsComponent } from './metrics/metrics.component';
import { PerformanceComponent } from './performance/performance.component';
import { ReportsRulesComponent } from './reports-rules/reports-rules.component';
import { RiskmanagementComponent } from './riskmanagement/riskmanagement.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  filterChangeSubject: Subject<ReportFilter> = new Subject<ReportFilter>();
  dateChangeSubject: Subject<ReportFilter> = new Subject<ReportFilter>();
  symbolChangeSubject: Subject<StockSymbol> = new Subject<StockSymbol>();

  @ViewChild('goalsReports', { static: false }) protected goalsReports: PerformanceComponent;
  @ViewChild('rulesReports', { static: false }) protected rulesReports: ReportsRulesComponent;
  @ViewChild('riskReports', { static: false }) protected riskReports: RiskmanagementComponent;
  @ViewChild('disciplineReports', { static: false }) protected disciplineReports: DisciplineComponent;
  @ViewChild('commissionsReports', { static: false }) protected commissionsReports: CommissionsComponent;
  @ViewChild('performanceReports', { static: false }) protected performanceReports: PerformanceComponent;
  @ViewChild('stats', { static: false }) protected statsComponent: MetricsComponent;
  // @ViewChild('tradeSearchComponent', { static: false }) protected tradeSearchComponent: TradeSearchComponent;

  public selectedParentReport: string = "Holding Reports";

  protected dateFilter: any;
  protected reportFilter: ReportFilter = new ReportFilter();

  websiteList: any = ['HDTuto.com', 'HDTuto.com', 'Nicesnippets.com']
  selectedTabReport;

  constructor() { }

  myDateRangePickerOptions: IMyDrpOptions = {
    dateFormat: 'dd.mm.yyyy',
    editableDateRangeField: false,
    ariaLabelInputField: 'Date'
  };

  ngOnInit() {
    this.dateFilter = this.initDateFilter();
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

  /*
  symbolSelectEventHandler(selectedSymbol: StockSymbol) {
    this.reportFilter.stockId = selectedSymbol.id;
    this.reportFilter.symbol = selectedSymbol.code + '';
    console.log('filter after selecting symbol:', this.reportFilter);
    this.symbolChangeSubject.next(selectedSymbol);
    this.filterChangeSubject.next(this.reportFilter);
  }

  onClearSymbol() {
    delete this.reportFilter.stockId;
    delete this.reportFilter.symbol;
    this.tradeSearchComponent.clearSelection();
    console.log('filter after clear symbol:', this.reportFilter);
    //this.filterChangeSubject.next(this.reportFilter);
  }
  */

  onTabSelect(selectedTab: string) {
    if (selectedTab === 'risk') {
      this.riskReports.reloadData(selectedTab);
    } else if (selectedTab === 'rules') {
      this.rulesReports.reloadData(selectedTab);
    } else if (selectedTab === 'performance') {
      this.performanceReports.reloadData(selectedTab);
    } else if (selectedTab === 'commissions') {
      this.commissionsReports.reloadData(selectedTab);
    } else if (selectedTab === 'goals') {
      this.goalsReports.reloadData(selectedTab);
    } else if (selectedTab === 'discipline') {
      this.disciplineReports.reloadData(selectedTab);
    } else if (selectedTab === 'stats') {
      this.statsComponent.reload();
    }
    this.selectedTabReport = selectedTab;
  }

  parentReportChange(e) {
    console.log(e.target.value);
    this.selectedParentReport = e.target.value;
  }

  changeWebsite(e) {
    console.log(e.target.value);
  }

  closePopup(e) {
    let iframe = document.querySelector('iframe');
    iframe.src = '';
    iframe.setAttribute("src", 'https://www.youtube.com/embed/oTOw-wUL1Jw');
  }

  onDateOptionSelect(option: string) {
    let fromDate: moment.Moment;
    let toDate: moment.Moment;
    toDate = moment();
    if ("1d" === option) {
      fromDate = moment();
    } else if ("5d" === option) {
      fromDate = moment().subtract(5, 'd');
    } else if ("1m" === option) {
      fromDate = moment().subtract(1, 'M');
    } else if ("3m" === option) {
      fromDate = moment().subtract(3, 'M');
    } else if ("1y" === option) {
      fromDate = moment().subtract(1, 'y');
    }
    this.reportFilter.fromDate = fromDate.format('YYYY-MM-DD');
    this.reportFilter.toDate = toDate.format('YYYY-MM-DD');

    this.dateFilter = {
      beginDate: {
        year: fromDate.year(),
        month: fromDate.month() + 1,
        day: fromDate.date()
      },
      endDate: {
        year: toDate.year(),
        month: toDate.month() + 1,
        day: toDate.date()
      }
    }
    this.dateChangeSubject.next(this.reportFilter);
    this.filterChangeSubject.next(this.reportFilter);
  }

  onDateRangeChanged(event: IMyDateRangeModel) {
    console.log('date::', event);
    let formattedText = event.formatted;
    let seperatorInd = formattedText.indexOf(' - ');
    if (seperatorInd > -1) {
      let fromDate = formattedText.substring(0, seperatorInd).trim()
      let toDate = formattedText.substring(seperatorInd + 3).trim();
      this.reportFilter.fromDate = moment(fromDate, 'DD.MM.YYYY').format('YYYY-MM-DD');
      this.reportFilter.toDate = moment(toDate, 'DD.MM.YYYY').format('YYYY-MM-DD');
    }
    this.dateChangeSubject.next(this.reportFilter);
    this.filterChangeSubject.next(this.reportFilter);
  }

  onSubTypeChange($event: any) {
    this.reportFilter.summaryType = $event;
    this.filterChangeSubject.next(this.reportFilter);
  }

}
