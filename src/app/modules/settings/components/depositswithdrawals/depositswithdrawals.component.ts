import { Component, OnInit, ViewChild, Input  } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-depositswithdrawals',
  templateUrl: './depositswithdrawals.component.html',
  styleUrls: ['./depositswithdrawals.component.scss']
})
export class DepositswithdrawalsComponent implements OnInit {

  entry_date: Date;
  targetDate:string;
  targetProfit:number;

  entryDate:string;
  targetDateRange:string;

  public DepositList = [];
  public showDepositForm: boolean = false;

  constructor(
    private toastr: ToastrService,
    private router: Router/*,
    private depositService: DepositService*/) { 
  }
  step = 0;
  ngOnInit() {
    /*this.depositService.getDeposits().subscribe(data => {
      this.DepositList = data;
    });*/
  }
  

  setStep(index: number) {
    this.step = index;
  }
  openDepositForm() {
    this.showDepositForm = true;
  }
  hideDepositForm() {
    this.showDepositForm = false;
  }

}
