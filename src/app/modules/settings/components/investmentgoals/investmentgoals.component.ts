import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { IMyDateRangeModel } from 'mydaterangepicker';

@Component({
  selector: 'app-investmentgoals',
  templateUrl: './investmentgoals.component.html',
  styleUrls: ['./investmentgoals.component.scss']
})
export class InvestmentGoalsComponent implements OnInit {

  tradeItem = '';
  investmentGoals: any = [];
  targetProfit:number;
  targetDate:string;

  constructor(private router: Router) { }

  ngOnInit() {
  }
  addGoal() { 
    var num1 = ((document.getElementById("targetProfit") as HTMLInputElement).value);
    console.log(num1);

    if(num1 == '' || num1 == undefined){
      return;
    }else {
      this.investmentGoals.push(this.createGoalsEntry(num1));
      console.log('investmentGoals', this.investmentGoals);
      this.handleClear();
    }
  }

  deleteinvestmentGoal(index){
    this.investmentGoals.splice(index, 1);
  }

  createGoalsEntry(num1){
    let goalEntry = new Object();
    goalEntry.profit = num1;
    goalEntry.targetdate = this.targetDate;
    return goalEntry;
  }
  

  handleClear(){
    this.targetProfit = null;
    this.targetDate = null;
  }

  onDateRangeChanged(event: IMyDateRangeModel) {
    console.log('date::', event);
    let formattedText = event.formatted;
    let seperatorInd = formattedText.indexOf(' - ');
    // this.targetDate = formattedText.substring(0, seperatorInd).trim()+' to '+formattedText.substring(seperatorInd + 3).trim();
    // if (seperatorInd > -1) {
    //   this.reportFilter.fromDate = formattedText.substring(0, seperatorInd).trim();
    //   this.reportFilter.toDate = formattedText.substring(seperatorInd + 3).trim();
    // }
  }

}
