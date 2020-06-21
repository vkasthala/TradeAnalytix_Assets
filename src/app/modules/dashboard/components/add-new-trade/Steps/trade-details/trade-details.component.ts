import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trade-details',
  templateUrl: './trade-details.component.html',
  styleUrls: ['./trade-details.component.scss']
})
export class TradeDetailsComponent implements OnInit {

  currentState:number = 1;
  stockAdded:boolean;
  performRiskAnalysis:boolean;
  promptPerformRiskAnalysis:boolean;
  displayRiskAnalysis:boolean;
  analyzeRisk:boolean;
  stockOptions:any[] = [];

  constructor() { }

  ngOnInit() {
  }

  enterSymbol() {
    this.currentState++;
  }

  addStock() {
    this.stockAdded = true;
  }

  addOption() {
    if(this.stockOptions.length < 3) {
      this.stockOptions.push(true)
    }
  }

}
