import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CalReportDayData } from '../../model/cal-report-day-data.model';
import { ReportDataService } from '../../services/report-data.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, AfterViewInit {

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


  /*calendarDates: CalReportDayData[] = [
    { "day": "", "return": null, "tradecount": null },
    { "day": "", "return": null, "tradecount": null },
    { "day": "", "return": null, "tradecount": null },
    { "day": "", "return": null, "tradecount": null },
    { "day": "", "return": null, "tradecount": null },
    { "day": "1", "return": 50, "tradecount": 3, },
    { "day": "2", "return": null, "tradecount": null, },
    { "day": "3", "return": null, "tradecount": null, },
    { "day": "4", "return": 100, "tradecount": 30 },
    { "day": "5", "return": -75, "tradecount": 30 },
    { "day": "6", "return": 20, "tradecount": 30 },
    { "day": "7", "return": -50, "tradecount": 50 },
    { "day": "8", "return": 20, "tradecount": 30 },
    { "day": "9", "return": null, "tradecount": null, },
    { "day": "10", "return": null, "tradecount": null, },
    { "day": "11", "return": 80, "tradecount": 30 },
    { "day": "12", "return": -44, "tradecount": 30 },
    { "day": "13", "return": 50, "tradecount": 30 },
    { "day": "14", "return": -99, "tradecount": 30 },
    { "day": "15", "return": 50, "tradecount": 30 },
    { "day": "16", "return": null, "tradecount": null, },
    { "day": "17", "return": null, "tradecount": null, },
    { "day": "18", "return": 234, "tradecount": 45 },
    { "day": "19", "return": 2234, "tradecount": 35 },
    { "day": "20", "return": -734, "tradecount": 37 },
    { "day": "21", "return": -2234, "tradecount": 60 },
    { "day": "22", "return": -2234, "tradecount": 60 },
    { "day": "23", "return": null, "tradecount": null, },
    { "day": "24", "return": null, "tradecount": null, },
    { "day": "25", "return": -2234, "tradecount": 60 },
    { "day": "26", "return": -2234, "tradecount": 60 },
    { "day": "27", "return": -2234, "tradecount": 60 },
    { "day": "28", "return": -2234, "tradecount": 60 },
    { "day": "29", "return": -2234, "tradecount": 60 },
    { "day": "30", "return": null, "tradecount": null },
    { "day": "31", "return": null, "tradecount": null },
    { "day": "", "return": null, "tradecount": null },
    { "day": "", "return": null, "tradecount": null },
    { "day": "", "return": null, "tradecount": null },
    { "day": "", "return": null, "tradecount": null },
    { "day": "", "return": null, "tradecount": null },
    { "day": "", "return": null, "tradecount": null }
  ];*/

}
