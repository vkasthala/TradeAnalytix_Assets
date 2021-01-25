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

  constructor(
    private toastr: ToastrService,
    private router: Router/*,
    private depositService: DepositService*/) { 
  }

  ngOnInit() {
    /*this.depositService.getDeposits().subscribe(data => {
      this.DepositList = data;
    });*/
  }

}
