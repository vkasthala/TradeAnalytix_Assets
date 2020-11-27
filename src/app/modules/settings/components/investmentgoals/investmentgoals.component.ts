import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMyDrpOptions } from 'mydaterangepicker';

@Component({
  selector: 'app-investmentgoals',
  templateUrl: './investmentgoals.component.html',
  styleUrls: ['./investmentgoals.component.scss']
})
export class InvestmentGoalsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
