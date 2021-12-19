import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clode-trade',
  templateUrl: './clode-trade.component.html',
  styleUrls: ['./clode-trade.component.scss']
})

export class HelpCloseTradeComponent implements OnInit {

  constructor(
    private router: Router,
    private http:HttpClient,
  ) { }
  

  ngOnInit() {

  }

}
