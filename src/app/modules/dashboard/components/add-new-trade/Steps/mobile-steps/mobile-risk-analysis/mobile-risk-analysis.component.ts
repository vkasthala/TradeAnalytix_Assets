import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mobile-risk-analysis',
  templateUrl: './mobile-risk-analysis.component.html',
  styleUrls: ['./mobile-risk-analysis.component.scss']
})
export class MobileRiskAnalysisComponent implements OnInit {
  
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
