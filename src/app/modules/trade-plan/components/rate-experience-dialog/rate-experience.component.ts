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
  title: string;
  selectedPL:string;
  selectedRating:string;

  tradePlanId: number = 0;
  selectedPlan: TradePlanEntry;
  day: string;

  tradePlan: TradePlan = new TradePlan();

  constructor(
    private dialogRef: MatDialogRef<RateExperienceDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data,
    protected tradePlanService: TradePlansService,
    protected toastr: ToastrService,
  ) {
    this.title = data.title;
  }

  ngOnInit() {
  }

  closeModal() {
    this.dialogRef.close();
  }

  changePL(e) {
    console.log(e.target.value);
    this.selectedPL = e.target.value;
  }

  updateTradePlan(e) {
    this.selectedRating = e.target.value
    this.tradePlan.id = this.selectedPlan.id;
    this.tradePlan.day = this.selectedPlan.day;
    this.tradePlan.statusId = 2;
    console.log('trade plan to be updated: ', this.tradePlan);
    this.tradePlanService.updateTradePlan(this.tradePlan).subscribe(result => {
      this.toastr.success('Trade plan updated', 'Success');
    });
  }

}
