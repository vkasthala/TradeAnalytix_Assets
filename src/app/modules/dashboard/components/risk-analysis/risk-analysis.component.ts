import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-risk-analysis',
  templateUrl: './risk-analysis.component.html',
  styleUrls: ['./risk-analysis.component.scss']
})
export class RiskAnalysisComponent implements OnInit {


  stockLowerBand: number = -10;
  stockUpperBand: number = 10;
  riskFreeRate: number = 10;
  stockAdded: boolean;
  performRiskAnalysis: boolean;
  promptPerformRiskAnalysis: boolean;
  displayRiskAnalysis: boolean;
  analyzeRisk: boolean;
  stockOptions: any[] = [];

  constructor(private utilService: UtilService) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
  
  }

  addStock() {
    this.stockAdded = true;
    this.promptPerformRiskAnalysis = false;
    this.performRiskAnalysis = false;
    this.displayRiskAnalysis = false;
  }

  addOption() {
    if (this.stockOptions.length < 4) {
      this.stockOptions.push({
        daysLeft: 23,
        impliedValue: 65
      })
    }
  }


  deleteStock() {
    this.stockAdded = false;
    if(this.stockOptions.length == 0) {
      this.displayRiskAnalysis = false;
      this.promptPerformRiskAnalysis = false;
    }
  }
  deleteStockOption(index) {
    this.stockOptions.splice(index, 1);
   
  }

  decreaseStockLowerBand() {
    if (this.stockLowerBand < 1 && this.stockLowerBand > -100) {
      this.stockLowerBand--;
    }
  }

  increaseStockLowerBand() {
    if (this.stockLowerBand < 0 && this.stockLowerBand > -100) {
      this.stockLowerBand++;
    }
  }


  decreaseStockUpperBand() {
    if (this.stockUpperBand > 0 && this.stockUpperBand < 101) {
      this.stockUpperBand--;
    }
  }

  increaseStockeUpperBand() {
    if (this.stockUpperBand > -1 && this.stockUpperBand < 100) {
      this.stockUpperBand++;
    }
  }

  decreaseDaysLeft(index) {
    let stock = this.stockOptions[index];
    if (stock.daysLeft > 0 && stock.daysLeft < 731) {
      stock.daysLeft--;
    }
  }

  increaseDaysLeft(index) {
    let stock = this.stockOptions[index];
    if (stock.daysLeft >= 0 && stock.daysLeft < 731) {
      stock.daysLeft++;
    }
  }

  decreaseImpliedValue(index) {
    let stock = this.stockOptions[index];
    if (stock.impliedValue > 1 && stock.impliedValue < 501) {
      stock.impliedValue--;
    }
  }

  increaseImpliedValue(index) {
    let stock = this.stockOptions[index];
    if (stock.impliedValue > 1 && stock.impliedValue < 501) {
      stock.impliedValue++;
    }
  }


  preventNegatives(e, preventDecimal?:boolean) {
    if(preventDecimal) {
      if(!((e.keyCode > 95 && e.keyCode < 106)
      || (e.keyCode > 47 && e.keyCode < 58) 
      || e.keyCode == 8 ||e.keyCode == 17 || e.keyCode == 110)) {
        if(e.keyCode != 190 && e.keyCode != 46 && e.keyCode != 37  && e.keyCode != 39 && e.keyCode != 9) {
          return false;
        }else {
          return true;
        }
    }
    }else {
      if(!((e.keyCode > 95 && e.keyCode < 106)
      || (e.keyCode > 47 && e.keyCode < 58) 
      || e.keyCode == 8)) {
        if(e.keyCode != 190 && e.keyCode != 46 && e.keyCode != 37  && e.keyCode != 39 && e.keyCode != 9) {
          return false;
        }else {
          return true;
        }
    }
    }
  }

  checkForDecimalValidation(event) {
    event.target.value = parseFloat(event.target.value).toFixed(2);
  }


  enforceMaxLength($event, min, max) {
   let t = $event.target;
    if(t.value < min || t.value > max) {
      return false;
    }
  }

  //Code for handling Mouse Hold event
  name: number = 0;
  timeoutHandler;

  public mouseup() {
    if (this.timeoutHandler) {
      clearInterval(this.timeoutHandler);
      this.name = 0;
      this.timeoutHandler = null;
    }
  }

  decreaseRiskFreeRate() {
    if (this.riskFreeRate > 0 && this.riskFreeRate < 101) {
      this.riskFreeRate--;
    }
  }

  increaseRiskFreeRate() {
    if (this.riskFreeRate > -1 && this.riskFreeRate < 100) {
      this.riskFreeRate++;
    }
  }

  /*
  * @mousedown 'Requires operation field which is the operation to be performed on mouse hold'
  */
  public mousedown(operations, index?) {
    this.timeoutHandler = setInterval(() => {
      switch (operations) {
        case 'increaseStockeUpperBand': this.increaseStockeUpperBand(); break;
        case 'decreaseStockUpperBand': this.decreaseStockUpperBand(); break;
        case 'increaseStockLowerBand': this.increaseStockLowerBand(); break;
        case 'decreaseStockLowerBand': this.decreaseStockLowerBand(); break;
        case 'decreaseDaysLeft': this.decreaseDaysLeft(index); break;
        case 'increaseDaysLeft': this.increaseDaysLeft(index); break;
        case 'decreaseImpliedValue': this.decreaseImpliedValue(index); break;
        case 'increaseImpliedValue': this.increaseImpliedValue(index); break;
        case 'decreaseRiskFreeRate': this.decreaseRiskFreeRate(); break;
        case 'increaseRiskFreeRate': this.increaseRiskFreeRate(); break;
      }
      this.name += 1;
    }, 100);
  }


}
