import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mobile-risk-management',
  templateUrl: './mobile-risk-management.component.html',
  styleUrls: ['./mobile-risk-management.component.scss']
})
export class MobileRiskManagementComponent implements OnInit {

  @Output('nextStep') nextStep = new EventEmitter();
  @Output('prevStep') prevStep = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  previous() {
    this.prevStep.emit()
  }

  next() {
    this.nextStep.emit()
  }


  preventNegatives(e, preventDecimal?:boolean) {
    if(preventDecimal) {
      if(!((e.keyCode > 95 && e.keyCode < 106)
      || (e.keyCode > 47 && e.keyCode < 58) 
      || e.keyCode == 8 ||e.keyCode == 17 || e.keyCode == 110)) {
        if(e.keyCode != 190) {
          return false;
        }else {
          return true;
        }
    }
    }else {
      if(!((e.keyCode > 95 && e.keyCode < 106)
      || (e.keyCode > 47 && e.keyCode < 58) 
      || e.keyCode == 8)) {
        if(e.keyCode != 190) {
          return false;
        }else {
          return true;
        }
    }
    }
  }

}
