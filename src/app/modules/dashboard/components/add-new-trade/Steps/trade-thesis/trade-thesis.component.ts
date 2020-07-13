import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-trade-thesis',
  templateUrl: './trade-thesis.component.html',
  styleUrls: ['./trade-thesis.component.scss']
})
export class TradeThesisComponent implements OnInit {
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
