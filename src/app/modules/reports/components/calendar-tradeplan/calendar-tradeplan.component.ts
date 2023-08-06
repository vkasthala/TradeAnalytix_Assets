import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CalReportDayData } from '../../model/cal-report-day-data.model';
import { ReportDataService } from '../../services/report-data.service';

@Component({
  selector: 'app-calendar-tradeplan',
  templateUrl: './calendar-tradeplan.component.html',
  styleUrls: ['./calendar-tradeplan.component.scss']
})
export class CalendarComponentTradeplan implements OnInit, AfterViewInit {

  calendarDays: any[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  calendarDates: CalReportDayData[] = [];

  constructor(private reportDataService: ReportDataService) { }

  ngOnInit() {

  }

  ngAfterViewInit(): void {

  }

  loadData(year: number, month: number) {
    this.reportDataService.getCalendarReportData(month, year).subscribe(result => {
      this.calendarDates = result;
    });
  }

}
