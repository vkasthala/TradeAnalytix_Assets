import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
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

  registrationSources: RegistrationSource[] = [];
  referralInfo: ReferralInfo = new ReferralInfo();

  public data: any = [
    {
      title: "Getting Started",
    }
  ];

  constructor(
    public dialogRef: MatDialogRef<GettingStartedVideoComponent>,
    private userService: UserService,
  ) {
    this.loadRegistrationSources();
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
