import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-trading-rules',
  templateUrl: './trading-rules.component.html',
  styleUrls: ['./trading-rules.component.scss']
})
export class TradingRulesComponent implements OnInit {
  protected loginModalOpen: boolean = false;
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    
  }

  

}
