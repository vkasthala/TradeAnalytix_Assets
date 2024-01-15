import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-help-edit-trade',
  templateUrl: './help-edit-trade.component.html',
  styleUrls: ['./help-edit-trade.component.scss']
})

export class HelpEditTradeComponent implements OnInit {

  constructor(
    private router: Router,
    private http:HttpClient,
  ) { }
  

  ngOnInit() {

  }

}
