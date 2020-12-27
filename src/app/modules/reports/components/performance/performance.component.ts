import { Component, OnInit, Input } from '@angular/core';
import { ReportsItem } from '../../models/reports-item.model';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent implements OnInit {
  reportsitems: ReportsItem[] = [];

    const reportsItemsData = {
      overview: [
        { name: 'Account Balance', value: "34123" },
        { name: 'Net Return', value: "Short Puts" },
        { name: '% Goal Achieved', value: "72%" },
        { name: 'Win-Loss Ratio / Win Rate', value: "Short Puts" },
        { name: 'Cash Reserves', value: "12%" },
        { name: 'Avg Win Size', value: "532" },
        { name: 'Avg Loss Size', value: "133" },
        { name: 'Avg Gain on Winning Trade', value: "1231" },
        { name: 'Avg Loss on Winning Trade', value: "-1231" },
        { name: 'Profit Factor', value: "213" },
        ]
      ,
      strategy:[
        { name: 'Best Strategy by Return', value: "Short Puts" },
        { name: 'Best Strategy by Win/Loss', value: "Short Puts" },
        { name: 'Worst Strategy by Return', value: "Naked Calls" },
        { name: 'Worst Strategy by Win/Loss', value: "Naked Puts" },
        { name: 'Most-Used Strategy', value: "Naked Call" },
      ],
      direction:[
        { name: 'Total Trades', value: "1242" },
        { name: 'Return from Long Trades', value: "$12456" },
        { name: 'Return from Short Trades', value: "-$12456" },
        { name: 'Return from Neutral Trades', value: "$456" },
        { name: 'Return from Custom Trades', value: "$456" },
      ],
      holding:[
        { name: 'Avg Holding Period', value: "4.2 days" },
        { name: 'Avg Hold Period for Won Trades', value: "7.8 days" },
        { name: 'Avg Hold Period  for Lost Trades', value: "3.4 days" },
      ],
      stocks:[
        { name: 'Most Successful Stock', value: "NIO" },
        { name: 'Most Successful Stock', value: "USO" },
        { name: 'Frequently Traded Stock', value: "XPEV"}
      ],
      tradeday:[
        { name: 'Best Day to Trade', value: "Monday" },
        { name: 'Worst Day to Trade', value: "Friday"}
      ],
      entryprice:[
        { name: 'Best Entry Price by Net Return', value: "5% of Highs" },
        { name: 'Worst Entry Price by Net Return', value: "5% of Lows"},
        { name: 'Best Entry Price by Win-Loss', value: "70-90% Highs"},
        { name: 'Worst Entry Price by Win-Loss', value: "Friday"}
      ],
      technicalindicator:[
        { name: 'Most Used Technical Indicator', value: "NIO"},
        { name: 'Best Indicator by Return', value: "USO"},
        { name: 'Best Indicator by Win-Loss', value: "USO"},
        { name: 'Worst Indicator by Return', value: "USO"},
        { name: 'Worst Indicator by Win-Loss', value: "USO"},
      ],
      events:[
        { name: 'Best Event to Trade by Return', value: "NIO"},
        { name: 'Best Event to Trade by Win-Loss', value: "USO"},
        { name: 'Worst Event to Trade by Return', value: "NIO"},
        { name: 'Worst Event to Trade by Win-Loss', value: "USO"},
      ],
      source:[
        { name: 'Top Source of Trade Ideas', value: "NIO"},
        { name: 'Best Source by Net Return', value: "USO"},
        { name: 'Best Source by Win-Loss', value: "USO"},
        { name: 'Worst Source by Net Return', value: "USO"},
        { name: 'Worst Source by Win-Loss', value: "USO"},
      ],
      mindset:[
        { name: 'Most Common Mindset', value: "NIO"},
        { name: 'Best Mindset by Return', value: "NIO"},
        { name: 'Best Mindset by Win-Loss', value: "USO"},
        { name: 'Worst Mindset by Return', value: "NIO"},
        { name: 'Worst Mindset by Win-Loss', value: "USO"},
      ]
};
    
  constructor() { }

  ngOnInit() {
    this.getOverviewItems();
    
  }
  getOverviewItems(): ReportsItem[] {
    this.reportsitems = this.reportsItemsData.overview;
  }
  getStrategyTypeItems(): ReportsItem[] {
    this.reportsitems = this.reportsItemsData.strategy;
  }
  getDirectionItems(): ReportsItem[] {
    this.reportsitems = this.reportsItemsData.direction;
  }
  getHoldingItems(): ReportsItem[] {
    this.reportsitems = this.reportsItemsData.holding;
  }
  getStocksItems(): ReportsItem[] {
    this.reportsitems = this.reportsItemsData.stocks;
  }
  getTradeDayItems(): ReportsItem[] {
    this.reportsitems = this.reportsItemsData.tradeday;
  }
  getEntryPriceItems(): ReportsItem[] {
    this.reportsitems = this.reportsItemsData.entryprice;
  }
  getTechnicalIndicatorItems(): ReportsItem[] {
    this.reportsitems = this.reportsItemsData.technicalindicator;
  }
  getEventsItems(): ReportsItem[] {
    this.reportsitems = this.reportsItemsData.events;
  }
  getSourceItems(): ReportsItem[] {
    this.reportsitems = this.reportsItemsData.source;
  }
  getMindsetItems(): ReportsItem[] {
    this.reportsitems = this.reportsItemsData.mindset;
  }

}
