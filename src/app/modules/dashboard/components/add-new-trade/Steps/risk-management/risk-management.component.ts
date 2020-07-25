import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TradeDataService } from 'src/app/trade-data.service';
import { TradeStrategyService } from 'src/app/trade-strategy.service';
import { TradeStrategy } from '../../../../../TradeStrategy';

@Component({
  selector: 'app-risk-management',
  templateUrl: './risk-management.component.html',
  styleUrls: ['./risk-management.component.scss']
})
export class RiskManagementComponent implements OnInit {

  @Output('nextStep') nextStep = new EventEmitter();
  @Output('prevStep') prevStep = new EventEmitter();
  private tradeStrategy:TradeStrategy;

  constructor(private tradeDataService:TradeDataService) { }

  ngOnInit() {
    this.tradeDataService.share.subscribe(x=>this.tradeStrategy=x)
  }

  previous() {
    this.prevStep.emit()
  }

  next() {
    console.log(this.tradeStrategy)
    this.nextStep.emit()
  }
}
