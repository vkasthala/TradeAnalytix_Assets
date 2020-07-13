import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trade-strategies',
  templateUrl: './trade-strategies.component.html',
  styleUrls: ['./trade-strategies.component.scss']
})
export class TradeStrategiesComponent implements OnInit {

  expandIndex:any;
  showDetailsIndex:any;

  tradeStrategiesData = [
       {
          "strategyId":"05082020-001",
          "strategy":"Naked Call",
          "stock":"Facebook",
          "direction":"Long",
          "directionSymbol" : "../../../../../assets/images/icon/Icon awesome-arrow-up.png",
          "status":"Draft",
          "rulesCompliance":true,
          "maxGain":"-$2000",
          "minLoss":"-$2000",
          "openDate":null,
          "closeDate":null,
          "return":"-$2000"
       },
       {
          "strategyId":"05082020-002",
          "strategy":"Naked Put",
          "stock":"Google",
          "direction":"Neutral",
          "directionSymbol" : "../../../../../assets/images/icon/Icon awesome-minus.png",
          "status":"Open",
          "rulesCompliance":false,
          "maxGain":"+$5000",
          "minLoss":"+$5000",
          "openDate":null,
          "closeDate":null,
          "return":"+$5000"
       },
       {
          "strategyId":"05082020-003",
          "strategy":"Iron Condor",
          "stock":"Amazon",
          "direction":"Neutral",
          "directionSymbol": "../../../../../assets/images/Icon awesome-arrow-up.png",
          "status":"Closed",
          "rulesCompliance":true,
          "maxGain":"-$2000",
          "minLoss":"-$2000",
          "openDate":"08 May 2020",
          "closeDate":null,
          "return":"-$2000"
       },
       {
          "strategyId":"05092020-001",
          "strategy":"Bull Call Spread",
          "stock":"Microsoft",
          "direction":"Long",
          "directionSymbol" : "../../../../../assets/images/icon/Icon awesome-arrow-up.png",
          "status":"Expired",
          "rulesCompliance":false,
          "maxGain":"+$5000",
          "minLoss":"+$5000",
          "openDate":null,
          "closeDate":null,
          "return":"+$5000"
       },
       {
          "strategyId":"05092020-002",
          "strategy":"Bull Put Spread",
          "stock":"Netflix",
          "direction":"Neutral",
          "directionSymbol" : "../../../../../assets/images/icon/Icon awesome-minus.png",
          "status":"Draft",
          "rulesCompliance":true,
          "maxGain":"-$2000",
          "minLoss":"-$2000",
          "openDate":null,
          "closeDate":null,
          "return":"-$2000"
       },
       {
          "strategyId":"05102020-001",
          "strategy":"Covered Call",
          "stock":"Facebook",
          "direction":"Neutral",
          "directionSymbol": "../../../../../assets/images/Icon awesome-arrow-up.png",
          "status":"Open",
          "rulesCompliance":false,
          "maxGain":"-$5000",
          "minLoss":"-$5000",
          "openDate":null,
          "closeDate":null,
          "return":"-$5000"
       },
       {
          "strategyId":"05102020-002",
          "strategy":"Protective Put",
          "stock":"Google",
          "direction":"Long",
          "directionSymbol" : "../../../../../assets/images/icon/Icon awesome-arrow-up.png",
          "status":"Draft",
          "rulesCompliance":true,
          "maxGain":"-$2000",
          "minLoss":"-$2000",
          "openDate":null,
          "closeDate":null,
          "return":"-$2000"
       },
       {
          "strategyId":"05102020-003",
          "strategy":"Naked Call",
          "stock":"Amazon",
          "direction":"Neutral",
          "directionSymbol" : "../../../../../assets/images/icon/Icon awesome-minus.png",
          "status":"Open",
          "rulesCompliance":false,
          "maxGain":"+$5000",
          "minLoss":"+$5000",
          "openDate":null,
          "closeDate":null,
          "return":"+$5000"
       },
       {
          "strategyId":"05102020-004",
          "strategy":"Naked Put",
          "stock":"Microsoft",
          "direction":"Neutral",
          "directionSymbol": "../../../../../assets/images/Icon awesome-arrow-up.png",
          "status":"Expired",
          "rulesCompliance":true,
          "maxGain":"-$2000",
          "minLoss":"-$2000",
          "openDate":null,
          "closeDate":null,
          "return":"-$2000"
       }
      ];

  minifiedTradeStrategiesData = [
    {
       "strategyId":"050720-001",
       "symbol":"GOOG",
       "strategy":"Naked Put",
       "status":"Open",
       "return":"-"
    },
    {
       "strategyId":"050720-001",
       "symbol":"FB",
       "strategy":"Iron Condor",
       "status":"Closed",
       "return":"+$500"
    },
    {
       "strategyId":"050720-001",
       "symbol":"ROKU",
       "strategy":"Custom",
       "status":"Draft",
       "return":"-"
    },
    {
       "strategyId":"050720-001",
       "symbol":"AMZN",
       "strategy":"Call Spread",
       "status":"Open",
       "return":"-"
    },
    {
       "strategyId":"050720-001",
       "symbol":"AMZN",
       "strategy":"Put Spread",
       "status":"Draft",
       "return":"-"
    },
    {
       "strategyId":"050720-001",
       "symbol":"FB",
       "strategy":"Iron Condor",
       "status":"Expired",
       "return":"+$500"
    },
    {
       "strategyId":"050720-001",
       "symbol":"ROKU",
       "strategy":"Custom",
       "status":"Draft",
       "return":"-"
    },
    {
       "strategyId":"050720-001",
       "symbol":"AMZN",
       "strategy":"Call Spread",
       "status":"Closed",
       "return":"-$985"
    },
    {
       "strategyId":"050720-001",
       "symbol":"AMZN",
       "strategy":"Put Spread",
       "status":"Expired",
       "return":"-"
    },
    {
       "strategyId":"050720-001",
       "symbol":"FB",
       "strategy":"Iron Condor",
       "status":"Closed",
       "return":"+$500"
    },
    {
       "strategyId":"050720-001",
       "symbol":"ROKU",
       "strategy":"Custom",
       "status":"Open",
       "return":"-"
    },
    {
       "strategyId":"050720-001",
       "symbol":"AMZN",
       "strategy":"Call Spread",
       "status":"Closed",
       "return":"-$985"
    }
 ]    

  constructor(private router:Router) { }

  ngOnInit() {
  }

  closeTrade(strategyId) {
    this.router.navigate(['dashboard/close-trade/' + strategyId]);
  }

  editTrade() {

  }

  deleteTrade() {

  }

  expandRowOptions(index) {
    this.expandIndex = index;
  }

  closeActionBox() {
    this.expandIndex = null
  }

  expandShowDetails(index) {
   this.showDetailsIndex = index;
 }

 closeShowDetails() {
   this.showDetailsIndex = null
 }
}
