import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { TradePlanEntry } from '../../models/trade-plan-entry.model';
import { TradePlan } from '../../models/trade-plan.model';
import { TradePlansService } from '../../services/trade-plans.service';

@Component({
  selector: 'app-rate-experience',
  templateUrl: './rate-experience.component.html',
  styleUrls: ['./rate-experience.component.scss']
})
export class RateExperienceDialogComponent implements OnInit {
  tradePlan: TradePlan;

  constructor(
    private dialogRef: MatDialogRef<RateExperienceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    protected tradePlanService: TradePlansService,
    protected toastr: ToastrService,
  ) {
    this.tradePlan = data.tradePlan;
  }

  ngOnInit() {
  }

  closeModal() {
    console.log("tradeplan... ", this.tradePlan);
    this.dialogRef.close(this.tradePlan);
  }

}
