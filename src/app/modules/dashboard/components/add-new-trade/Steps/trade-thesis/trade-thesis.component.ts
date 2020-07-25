import { Component, OnInit, Output,Input, EventEmitter } from '@angular/core';
import { TradeStrategy } from '../../../../../TradeStrategy';
import { TradeDataService} from 'src/app/trade-data.service';
import { TradeStrategyService } from 'src/app/trade-strategy.service';
@Component({
  selector: 'app-trade-thesis',
  templateUrl: './trade-thesis.component.html',
  styleUrls: ['./trade-thesis.component.scss']
})
export class TradeThesisComponent implements OnInit {
  @Output('nextStep') nextStep = new EventEmitter();
  @Output('prevStep') prevStep = new EventEmitter();
 
//  @Input() public tradeStrategy:TradeStrategy;
  private tradeStrategy:TradeStrategy;

  constructor(private tradeDataService:TradeDataService) { }

  ngOnInit() {
    this.tradeDataService.share.subscribe(x=>this.tradeStrategy=x)
  }

 
  previous() {
    this.prevStep.emit()
  }

 


  next() {
       console.log(this.tradeStrategy);
       this.tradeDataService.updateData(this.tradeStrategy);
       this.nextStep.emit()
  }

}
