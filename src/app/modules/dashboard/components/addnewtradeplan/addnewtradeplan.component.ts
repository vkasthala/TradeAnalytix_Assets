import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatStepper } from '@angular/material';

@Component({
  selector: 'app-addnewtradeplan',
  templateUrl: './addnewtradeplan.component.html',
  styleUrls: ['./addnewtradeplan.component.scss']
})
export class AddnewtradeplanComponent implements OnInit {

  @ViewChild('tradeMobileStepper', { static: false }) private tradeMobileStepper: MatStepper;
  
  constructor(private router: Router) { }

  ngOnInit() {
  }

  addEntry() { this.router.navigate(['/dashboard/trade-plans']) }

  previous() { this.router.navigate(['/dashboard/trade-plans']) }


  goForward() {
      this.tradeMobileStepper.next();
  }

}
