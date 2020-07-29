import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exit-rules',
  templateUrl: './exit-rules.component.html',
  styleUrls: ['./exit-rules.component.scss']
})
export class ExitRulesComponent implements OnInit {

  checkbox2:any;
  checkbox4:any;
  checkbox6:any;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  closeTrade() {
    this.router.navigate(['/dashboard/trade-strategies'])
  }

  previous() {
    this.router.navigate(['/dashboard/close-trade/05082020-001'])
  }

}
