import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from 'src/app/modules/shared/services/user.service';

@Component({
  selector: 'app-slider-modal',
  templateUrl: './slider-modal.component.html',
  styleUrls: ['./slider-modal.component.scss']
})
export class SliderModalComponent implements OnInit {
  public isAcceptChecked = false;
  public applicableList = [];

  currentInd: number = 1;
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
    public dialogRef: MatDialogRef<SliderModalComponent>,
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
    if (this.currentInd === 11) {
      this.currentInd = 0;
    } else {
      this.currentInd++;
    }
  }


}