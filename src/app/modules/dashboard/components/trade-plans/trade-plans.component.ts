import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trade-plans',
  templateUrl: './trade-plans.component.html',
  styleUrls: ['./trade-plans.component.scss']
})
export class TradePlansComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  addEntry() { this.router.navigate(['/dashboard/add-new-trade-plan']) }

}
