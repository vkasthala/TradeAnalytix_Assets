import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from 'src/app/modules/shared/services/user.service';
import { FirstUserResponse } from '../../models/first-user.model';
import { DashboardChartService } from '../../services/dashboard-chart.service';

@Component({
  selector: 'app-first-user',
  templateUrl: './first-user.component.html',
  styleUrls: ['./first-user.component.scss']
})
export class FirstUserComponent implements OnInit {
  public isAcceptChecked = false;
  public isLastSlide = false;
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
    public dialogRef: MatDialogRef<FirstUserComponent>,
    private userService: UserService,
    private dashboardService: DashboardChartService,
    @Inject(MAT_DIALOG_DATA) public questionOptions: any
  ) {
    this.questions = questionOptions;
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.userService.getUserDetails().subscribe(details => {
      if (details && details.name) {
        this.userName = details.name;
      }
    });
  }

  closeModal() {
    this.getDropdownResponse();
    this.updateSurveyResponse();
    this.dialogRef.close();
  }

  priviousSlide() {
    this.currentInd--;
  }
  nextSlide() {
    if (this.currentInd === 5) {
      this.currentInd = 0;
    } else {
      this.currentInd++;
    }
  }

  onChange($event) {
    this.selectedOption = $event.target.value;
    this.referralInput = $event.target.value === "Referral" ? true : false
    this.otherInput = $event.target.value === "Other" ? true : false
    this.isLastSlide = $event.target.value !== "" ? true : false
  }
  goToSlide(index) {
    // this.applicableList = index === 2 ? [] : this.applicableList;
    this.currentInd = index;
  }

  acceptChange() {
    this.isAcceptChecked = !this.isAcceptChecked
  }
  applicableCheck(event: Event): void {
    const isChecked: boolean = event.target['checked'];
    const name: any = event.target['name'];
    if (isChecked) {
      if (this.applicableList.length > 0) {
        if (this.applicableList.includes(name)) {
          this.applicableList.filter((x, i) => {
            if (x === name) {
              this.applicableList.splice(i, 1)
            }
          })
        } else {
          this.applicableList.push(name)
        }
      } else {
        this.applicableList.push(name)
      }

    } else {
      this.applicableList.filter((x, i) => {
        if (x === name) {
          this.applicableList.splice(i, 1)
        }
      })
    }
  }

  instrumentsCheck(event: Event): void {
    const isChecked: boolean = event.target['checked'];
    const name: any = event.target['name'];
    if (isChecked) {
      if (this.instrumentsList.length > 0) {
        if (this.instrumentsList.includes(name)) {
          this.instrumentsList.filter((x, i) => {
            if (x === name) {
              this.instrumentsList.splice(i, 1)
            }
          })
        } else {
          this.instrumentsList.push(name)
        }
      } else {
        this.instrumentsList.push(name)
      }

    } else {
      this.instrumentsList.filter((x, i) => {
        if (x === name) {
          this.instrumentsList.splice(i, 1)
        }
      })
    }

  }

  buttonResponse(option) {
    let response = this.createResponseObj(option);
    this.userResponse.set(response.questionId, [response]);
    this.nextSlide();
  }

  checkboxResponse() {
    let currentQuestion = this.questions[this.currentInd];
    let options: [] = currentQuestion.surveyOptions;
    let checkboxResponse: FirstUserResponse[] = [];
    options.forEach(option => {
      if (this.instrumentsList.includes(option['value']) || this.applicableList.includes(option['value'])) {
        let response = this.createResponseObj(option);
        if (option['value'] == 'otherInstrument') {
          response.customText = this.otherInstrumentValue;
        }
        if (option['value'] == 'lackOfTools') {
          response.customText = this.lackOfToolsValue;
        }
        if (option['value'] == 'otherApplicable') {
          response.customText = this.otherApplicableValue;
        }
        checkboxResponse.push(response);
      }
    })
    this.userResponse.set(currentQuestion.id, checkboxResponse);
    this.nextSlide();
  }

  createResponseObj(option) {
    let response = new FirstUserResponse();
    response.optionId = option.id;
    response.questionId = this.questions[this.currentInd].id;
    return response;
  }

  getDropdownResponse() {
    let currentQuestion = this.questions[this.currentInd];
    let option = currentQuestion.surveyOptions.find(option => option['value'] == this.selectedOption);
    let response = this.createResponseObj(option);
    response.customText = this.referralInput ? this.referralInputValue : this.otherInput ? this.otherInputValue : "";
    this.userResponse.set(currentQuestion.id, [response]);
  }

  updateSurveyResponse() {
    const requestObj = {};
    this.userResponse.forEach((value, key) => {
      requestObj[key] = value;
    });
    this.dashboardService.updateSurveyResponse(requestObj).subscribe(res => { });
  }
}