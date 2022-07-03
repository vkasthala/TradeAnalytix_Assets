import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from 'src/app/modules/shared/services/user.service';

@Component({
  selector: 'app-referral-modal',
  templateUrl: './referral-modal.component.html',
  styleUrls: ['./referral-modal.component.scss']
})
export class ReferralModalComponent implements OnInit {
  currentInd: number = 0;
  title: string;

  public data: any = [
    {
      title:"Referral Information",
    }
  ];
  constructor(
    public dialogRef: MatDialogRef<ReferralModalComponent>,
    private userService: UserService,
  ) { }

  ngOnInit() {
  }


  submitReferral() {
    this.dialogRef.close();
  }
  closeModal() {
    this.dialogRef.close();
  }

}
