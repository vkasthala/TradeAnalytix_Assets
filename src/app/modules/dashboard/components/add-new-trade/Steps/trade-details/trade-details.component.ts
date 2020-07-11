
import { Component, OnInit, EventEmitter,Output,NgModule } from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import {MatAutocompleteModule, MatInputModule } from '@angular/material';



@NgModule({
  declarations: [],
  imports: [
    MatStepperModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    AngularMaterialModule    
  ],
  exports : [
    MatStepperModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule    
  ]
})

@Component({
  selector: 'app-trade-details',
  templateUrl: './trade-details.component.html',
  styleUrls: ['./trade-details.component.scss']
})


export class TradeDetailsComponent implements OnInit {


 stockLowerBand: number = -10;
 stockUpperBand: number = 10;

  currentState:number = 1;
  stockAdded:boolean;
  performRiskAnalysis:boolean;
  promptPerformRiskAnalysis:boolean;
  displayRiskAnalysis:boolean;
  analyzeRisk:boolean;
  stockOptions:any[] = [];
  myFormControl=new FormControl();
  symbolOptions: string[]=['NTFX','AAPL'];
  @Output('nextStep') nextStep = new EventEmitter();
  @Output('activateRisk') activateRisk = new EventEmitter();

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
    if (this.stockOptions.length < 4) {
      this.stockOptions.push({
        daysLeft: 23,
        impliedValue: 65
      })
    }
  }

  next() {
    this.nextStep.emit()
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
    if (stock.daysLeft > 0 && stock.daysLeft < 731) {
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

  activateRiskAnalysisStep() {
    this.activateRisk.emit(true);
  }


}
