import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mobile-trade-analysis',
  templateUrl: './mobile-trade-analysis.component.html',
  styleUrls: ['./mobile-trade-analysis.component.scss']
})
export class MobileTradeAnalysisComponent implements OnInit {

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
