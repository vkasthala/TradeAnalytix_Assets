import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from 'src/app/modules/shared/services/user.service';

@Component({
  selector: 'app-first-user',
  templateUrl: './first-user.component.html',
  styleUrls: ['./first-user.component.scss']
})
export class FirstUserComponent implements OnInit {
  public isAcceptChecked = false;
  public isLastSlide = false;
  public applicableList = [];

  currentInd: number = 0;
  title: string;
  userName: string = '';
  referralInput: boolean = false;
  otherInput: boolean = false;
  public data: any = [
    {
      title:"Welcome to CueTrade",
    }, {
      title:'CueTrade Benefits',
    }, {
      title:'Trade Journal',
    }, {
      title:'Import Trades',
    }, {
      title:'Trade Plan',
    }, {
      title:'Strategy Builder',
    }, {
      title:'Strategy Picker',
    }, {
      title:'Reports and Metrics',
    }, {
      title:'Trading Rules',
    }, {
      title: "Prerequisites"
    }
  ];
  constructor(
    public dialogRef: MatDialogRef<FirstUserComponent>,
    private userService: UserService,
  ) {
    //this.title = data.title;
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
    if(isChecked) {
      if (this.applicableList.length > 0) {
        if(this.applicableList.includes(name)){
          this.applicableList.filter((x, i) => {
            if(x === name) {
              this.applicableList.splice(i, 1)
            }
          })
        }else {
          this.applicableList.push(name)
        }
      }else {
        this.applicableList.push(name)
      }
      
    } else {
      this.applicableList.filter((x, i) => {
        if(x === name) {
          this.applicableList.splice(i, 1)
        }
      })
    }
    
  }

}