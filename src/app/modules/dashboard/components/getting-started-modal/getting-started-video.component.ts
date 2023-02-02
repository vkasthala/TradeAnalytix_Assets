import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/modules/shared/services/user.service';
import { ReferralInfo } from '../../models/referral-info.model';
import { RegistrationSource } from '../../models/registration-source.model';

@Component({
  selector: 'app-getting-started-video',
  templateUrl: './getting-started-video.component.html',
  styleUrls: ['./getting-started-video.component.scss']
})
export class GettingStartedVideoComponent implements OnInit {
  currentInd: number = 0;
  title: string;
  videoType: any;

  registrationSources: RegistrationSource[] = [];
  referralInfo: ReferralInfo = new ReferralInfo();

  // public data: any = [
  //   {
  //     title: "Quick Intro to CueTrade",
  //   }
  // ];

  constructor(
    public dialogRef: MatDialogRef<GettingStartedVideoComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.loadRegistrationSources();
    this.title = data.title;
    this.videoType = data.videoType;
  }

  ngOnInit() {
  }

  loadRegistrationSources() {
    this.userService.getRegistrationSources().subscribe(result => {
      this.registrationSources = result;
    });
  }

  closeVideoPopup() {
    this.dialogRef.close();
    let iframe = document.querySelector('iframe');
    iframe.src='';
  }

}
