import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-trade-details-header',
  templateUrl: './trade-details-header.component.html',
  styleUrls: ['./trade-details-header.component.scss']
})
export class TradeDetailsHeaderComponent implements OnInit {
  allStats: boolean=false;
  
  constructor() { }

  ngOnInit() {
  }
  showMoreStats(){
    this.allStats = !this.allStats;
  }

}
