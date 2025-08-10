import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { IMyDrpOptions } from 'mydaterangepicker';
import { FirstUserResponse } from '../../dashboard/models/first-user.model';
import { DashboardChartService } from '../../dashboard/services/dashboard-chart.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  showResetForm:boolean= false;

  public isAcceptChecked = false;
  public applicableList = [];
  public instrumentsList = [];

  currentInd: number = 1;
  title: string;
  userName: string = '';
  referralInput: boolean = false;
  otherInput: boolean = false;
  questions = [];
  userResponse = new Map<number, FirstUserResponse[]>();

  referralInputValue: string = '';
  otherInputValue: string = '';
  otherInstrumentValue: string = '';
  lackOfToolsValue: string = '';
  otherApplicableValue: string = '';
  selectedOption: string = '';


  public data: any = [
    {
      title: "Welcome to CueTrade",
    }, {
      title: 'CueTrade Benefits',
    }, {
      title: 'Trade Journal',
    }, {
      title: 'Import Trades',
    }, {
      title: 'Trade Plan',
    }, {
      title: 'Strategy Builder',
    }, {
      title: 'Strategy Picker',
    }, {
      title: 'Reports and Metrics',
    }, {
      title: 'Trading Rules',
    }, {
      title: "Prerequisites"
    }
  ];

  constructor(
    private router: Router,
    private userService: UserService,
    private dashboardService: DashboardChartService
  ) {

  }

  myDateRangePickerOptions: IMyDrpOptions = {
    dateFormat: 'dd.mm.yyyy',
    editableDateRangeField: false,
    ariaLabelInputField : 'Date'
  };
 
  step = 0;

  setStep(index: number) {
    this.step = index;
  }
  ngOnInit() {
    this.dashboardService.getSurveyQuestions().subscribe(res => {
    })
  }

  ngAfterViewInit(): void {
    this.userService.getUserDetails().subscribe(details => {
      if (details && details.name) {
        this.userName = details.name;
      }
    });
  }

  saveprofile() {
    this.router.navigate(['/dashboard']);
  }
  resetPassword() {
    this.showResetForm = !this.showResetForm;
  }

  onChange($event) {
    if($event.target.value === "Other" && $event.target.checked) {
      this.otherInput =  true;
    } else {
      this.otherInput =  false;
    }
  }
  onReferralChange($event) {
    this.selectedOption = $event.target.value;
    this.referralInput = $event.target.value === "Referral" && $event.target.checked ? true : false
  }

  applicableCheck($event) {

  }

}
