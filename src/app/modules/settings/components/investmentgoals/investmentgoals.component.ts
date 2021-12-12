import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IMyDateRangeModel } from 'mydaterangepicker';
import { GoalsService } from '../../services/goals.service';
import { InvestmentGoals } from '../../models/investment-goals.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-investmentgoals',
  templateUrl: './investmentgoals.component.html',
  styleUrls: ['./investmentgoals.component.scss']
})
export class InvestmentGoalsComponent implements OnInit {
  entry_date: Date;
  targetDate: any;
  targetProfit: number;
  id: number;
  entryDate: string;
  targetDateRange: string;
  goalName: string;
  public GoalsList: [];
  public showGoalForm: boolean = false;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private goalsService: GoalsService) {
  }
  step = 0;

  setStep(index: number) {
    this.step = index;
  }
  ngOnInit() {
    this.goalsService.getInvestGoals().subscribe((data: []) => {
      this.GoalsList = data;
    });
  }

  addGoal() {
    const num1 = ((document.getElementById('targetProfit') as HTMLInputElement).value);

    if (num1 === '' || num1 === undefined) {
      this.toastr.error('Please Enter Target Profit', 'Error', { 
        tapToDismiss:false,
        closeButton:true,
        disableTimeOut: true
      });
      return;
    } else {
      this.saveProfile(this.createGoalsEntry());
    }
    this.showGoalForm = false;
  }

  editinvestmentGoal(goal: InvestmentGoals) {
    this.entry_date = new Date(goal.entryDate);
    this.entryDate = goal.entryDate;
    this.targetProfit = goal.targetAmount;
    this.id = goal.id;
    this.goalName = goal.goalName;
    this.targetDateRange = goal.startDate + ' - ' + goal.endDate;
    const startDate = new Date(goal.startDate.trim());
    const endDate = new Date(goal.endDate.trim());
    const dateObj = {
      beginDate: { year: startDate.getFullYear(), month: startDate.getMonth(), day: startDate.getDate() },
      endDate: { year: endDate.getFullYear(), month: endDate.getMonth(), day: endDate.getDate() }
    };
    this.targetDate = dateObj;
  }

  deleteinvestmentGoal(goal: InvestmentGoals) {
    this.goalsService.deleteInvestmentGoals(goal).subscribe((data: []) => {
      this.GoalsList = data;
    });
  }

  createGoalsEntry() {
    const goalEntry = new InvestmentGoals();
    if (this.id) {
      goalEntry.id = this.id;
    }
    goalEntry.goalName = this.goalName;
    goalEntry.entryDate = this.entryDate;
    goalEntry.targetAmount = this.targetProfit;
    const dateRange: string[] = this.targetDateRange.split(' - ');
    goalEntry.startDate = dateRange[0].trim();
    goalEntry.endDate = dateRange[1].trim();
    return goalEntry;
  }

  handleClear() {
    this.entry_date = null;
    this.targetProfit = null;
    this.targetDate = null;
    this.id = null;
    this.targetDateRange = null;
    this.entryDate = null;
    this.goalName = null;
  }
  onDateRangeChanged(event: IMyDateRangeModel) {
    this.targetDateRange = event.formatted;
  }

  addEvent(event: any) {
    this.entryDate = event.targetElement.value;
  }

  saveProfile(goal: InvestmentGoals) {
    this.goalsService.saveInvestmentGoals(goal).subscribe((data: []) => {
      this.GoalsList = data;
      this.toastr.success('Goals saved successfully', 'Success');
      this.handleClear();
    }, (error) => {
      console.log('test: ', error);
      this.toastr.error(error.error ? String(error.error) : 'Failed saving the goals', 'Error', { 
        tapToDismiss:false,
        closeButton:true,
        disableTimeOut: true
      });
      this.handleClear();
      return;
    });
  }

  openGoalForm() {
    this.showGoalForm = true;
  }
  hideGoalForm() {
    this.showGoalForm = false;
  }
}
