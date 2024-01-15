import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-help-add-trade',
  templateUrl: './help-add-trade.component.html',
  styleUrls: ['./help-add-trade.component.scss']
})

export class HelpAddNewTradeComponent implements OnInit {

  constructor(
    private router: Router,
    private http:HttpClient,
  ) { }
  

  ngOnInit() {

  }

}
