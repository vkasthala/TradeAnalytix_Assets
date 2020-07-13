import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mobile-trade-thesis',
  templateUrl: './mobile-trade-thesis.component.html',
  styleUrls: ['./mobile-trade-thesis.component.scss']
})
export class MobileTradeThesisComponent implements OnInit {

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
