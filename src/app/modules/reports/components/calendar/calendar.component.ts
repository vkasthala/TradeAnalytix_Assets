import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  calendarDays: any[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  calendarDates: any[] = [
    {"id":"", "return":"", "tradecount": "" },
    {"id":"", "return":"", "tradecount": ""},
    {"id":"", "return":"", "tradecount": ""},
    {"id":"", "return":"", "tradecount": ""},
    {"id":"", "return":"", "tradecount": ""},
    {"id":"1", "return":50, "tradecount": 3,},
    {"id":"2", "return":"", "tradecount": "",},
    {"id":"3", "return":"", "tradecount": "",},
    {"id":"4", "return":100, "tradecount": 30},
    {"id":"5", "return":-75, "tradecount": 30},
    {"id":"6", "return":20, "tradecount": 30},
    {"id":"7", "return":-50, "tradecount": 50},
    {"id":"8", "return":20, "tradecount": 30},
    {"id":"9", "return":"", "tradecount": "",},
    {"id":"10", "return":"", "tradecount": "",},
    {"id":"11", "return":80, "tradecount": 30},
    {"id":"12", "return":-44, "tradecount": 30},
    {"id":"13", "return":50, "tradecount": 30},
    {"id":"14", "return":-99, "tradecount": 30},
    {"id":"15", "return":50, "tradecount": 30},
    {"id":"16", "return":"", "tradecount": "",},
    {"id":"17", "return":"", "tradecount": "",},
    {"id":"18", "return":234, "tradecount": 45},
    {"id":"19", "return":2234, "tradecount": 35},
    {"id":"20", "return":-734, "tradecount": 37},
    {"id":"21", "return":-2234, "tradecount": 60},
    {"id":"22", "return":-2234, "tradecount": 60},
    {"id":"23", "return":"", "tradecount": "",},
    {"id":"24", "return":"", "tradecount": "",},
    {"id":"25", "return":-2234, "tradecount": 60},
    {"id":"26", "return":-2234, "tradecount": 60},
    {"id":"27", "return":-2234, "tradecount": 60},
    {"id":"28", "return":-2234, "tradecount": 60},
    {"id":"29", "return":-2234, "tradecount": 60},
    {"id":"30", "return":"", "tradecount": "",},
    {"id":"31", "return":"", "tradecount": "",},
    {"id":"", "return":"", "tradecount": "" },
    {"id":"", "return":"", "tradecount": ""},
    {"id":"", "return":"", "tradecount": ""},
    {"id":"", "return":"", "tradecount": ""},
    {"id":"", "return":"", "tradecount": ""},
    {"id":"", "return":"", "tradecount": ""},
  
];

}
