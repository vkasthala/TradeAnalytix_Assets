import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/modules/shared/services/user.service';
import { ReferralInfo } from '../../models/referral-info.model';
import { RegistrationSource } from '../../models/registration-source.model';

@Component({
  selector: 'app-referral-modal',
  templateUrl: './referral-modal.component.html',
  styleUrls: ['./referral-modal.component.scss']
})
export class ReferralModalComponent implements OnInit {
  currentInd: number = 0;
  title: string;

  registrationSources: RegistrationSource[] = [];
  referralInfo: ReferralInfo = new ReferralInfo();

  public data: any = [
    {
      title: "Referral Information",
    }
  ];

  constructor(
    public dialogRef: MatDialogRef<ReferralModalComponent>,
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

  submitReferral() {
    this.userService.saveReferralInfo(this.referralInfo).subscribe(result => {
    });
    this.dialogRef.close();
  }

  closeModal() {
    this.dialogRef.close();
  }

}
