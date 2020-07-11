import { Component, OnInit, NgModule } from '@angular/core';
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

  currentState:number = 1;
  stockAdded:boolean;
  performRiskAnalysis:boolean;
  promptPerformRiskAnalysis:boolean;
  displayRiskAnalysis:boolean;
  analyzeRisk:boolean;
  stockOptions:any[] = [];
  myFormControl=new FormControl();
  symbolOptions: string[]=['NTFX','AAPL'];

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
