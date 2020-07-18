
import { Component, OnInit, EventEmitter,Output,NgModule } from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {AngularMaterialModule } from '../../../../../../angular-material/angular-material.module';
import { TradeStrategyService } from 'src/app/trade-strategy.service';
import { TradeStrategy } from '../../../../../TradeStrategy'
import { StockLeg} from '../../../../../StockLeg'



@NgModule({
  declarations: [],
  imports: [
    MatStepperModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule  
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

  stockLeg : StockLeg = new StockLeg();
  tradeStrategy : TradeStrategy =new TradeStrategy(1,"NSFT","","","",0,"","",1,1,1,this.stockLeg,"","","");
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
  symbolOptions: string[]=['NTFX','AAPL','PCG'];
  @Output('nextStep') nextStep = new EventEmitter();
  @Output('activateRisk') activateRisk = new EventEmitter();

  constructor(private service:TradeStrategyService) { }

  ngOnInit() {
    
     // this.service
  }

  enterSymbol() {
    this.currentState++;
  }

  addStock() {
   // this.stockAdded = true;
    console.log("Came here @add Stock");
     this.service.addStrategy(this.tradeStrategy);
    return;
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
