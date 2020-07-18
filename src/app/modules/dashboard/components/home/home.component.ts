import { Component, OnInit } from '@angular/core';
import { TradeStrategyService } from 'src/app/trade-strategy.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  tradeStrategiesData:any;
  constructor(private service:TradeStrategyService) { }

  ngOnInit() {
    let response = this.service.getAllTradeStrategies('1001');
     response.subscribe((data)=>this.tradeStrategiesData=data);
  }

}
