import { Component, OnInit, ViewChild, Input  } from '@angular/core';
import { Router } from '@angular/router';
import { IMyDateRangeModel } from 'mydaterangepicker';
import { GoalsService } from '../../services/goals.service';
import { InvestmentGoals } from'../../models/investment-goals.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-investmentgoals',
  templateUrl: './investmentgoals.component.html',
  styleUrls: ['./investmentgoals.component.scss']
})
export class InvestmentGoalsComponent implements OnInit {
  entry_date: Date;
  targetDate:string;
  targetProfit:number;

  entryDate:string;
  targetDateRange:string;

  public GoalsList = [];

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private goalsService: GoalsService) { 
  }

  ngOnInit() {
    this.goalsService.getInvestGoals().subscribe(data => {
      //console.log('investmentgoals', data.investmentgoals)
      //this.GoalsList = data.investmentgoals;
    });
  }
  addGoal() { 
    var num1 = ((document.getElementById("targetProfit") as HTMLInputElement).value);

    if(num1 == '' || num1 == undefined){
      this.toastr.error('Please Enter Target Profit', '');
      return;
    }else {
      this.GoalsList.push(this.createGoalsEntry());
      this.handleClear();
    }
  }

  deleteinvestmentGoal(index){
    this.GoalsList.splice(index, 1);
  }

  createGoalsEntry(){
    let goalEntry = Object();
    goalEntry.entrydate = this.entryDate;
    goalEntry.profit = this.targetProfit;
    goalEntry.targetdate = this.targetDateRange;
    return goalEntry;
  }
  

  handleClear(){
    this.entry_date = null;
    this.targetProfit = null;
    this.targetDate = null;
  }
  onDateRangeChanged(event: IMyDateRangeModel) {
    this.targetDateRange= event.formatted;
  }

  addEvent(event) {
    this.entryDate = event.targetElement.value;
  }

}

