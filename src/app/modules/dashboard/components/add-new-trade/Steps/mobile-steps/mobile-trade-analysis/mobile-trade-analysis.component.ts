import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-mobile-trade-analysis',
  templateUrl: './mobile-trade-analysis.component.html',
  styleUrls: ['./mobile-trade-analysis.component.scss']
})
export class MobileTradeAnalysisComponent implements OnInit {

  @Output('nextStep') nextStep = new EventEmitter();
  @Output('prevStep') prevStep = new EventEmitter();

  @Input('stockOptions') stockOptions:any[];
  @Input('stockAdded') stockAdded: boolean;
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
