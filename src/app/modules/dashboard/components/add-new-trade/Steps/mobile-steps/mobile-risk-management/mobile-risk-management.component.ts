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

}
