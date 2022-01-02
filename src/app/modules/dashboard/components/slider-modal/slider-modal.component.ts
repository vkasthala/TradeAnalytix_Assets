import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-slider-modal',
  templateUrl: './slider-modal.component.html',
  styleUrls: ['./slider-modal.component.scss']
})
export class SliderModalComponent implements OnInit {
  currentInd: number = 0;
  title: string;
  public data: any = [
    {
      title:"Welcome to TradeAnalytix",
      imgUrl:'',
      description: "<div>Most of the people investing or trading in the financial markets end up on the losing side mainly due to indiscipline.<br/><br/>Examples of actions that exhibit indiscipline include repeating the same mistakes, lack of understanding the risk being taken, impulsive trading without research or a plan.<br/><br/>TradeAnalytix provides tools to address these issues thereby improving your trading performance.<br/><br/>Click Next to explore the benefits.</div>"
    }, {
      title:'Trade Journal',
      imgUrl:'../../assets/images/slider/trade-details.jpg',
      description: "Adopt a systematic approach to investing or trading by recording your trades in detail with a comprehensive trading journal."
    }, {
      title:'Import Trades',
      imgUrl:'../../assets/images/slider/import-trades.jpg',
      description: "Add your trades in bulk to TradeAnalytix by importing trade history files exported from your brokerage or by filling in our standard template with your trades and uploading it."
    }, {
      title:'Risk Analysis',
      imgUrl:'../../assets/images/slider/risk-analysis.jpg',
      description: "Analyze potential returns on your trade strategies while varying the input parameters. Update the strategy and re-analyze until you are comfortable with the risk-reward potential of the trade."
    }, {
      title:'Strategy Comparison',
      imgUrl:'../../assets/images/slider/strategy-comparison.jpg',
      description: "Compare different trade strategies on a symbol and analyze their profitability in different scenarios so that you can pick a strategy that aligned with your risk appetite and reward expectations."
    }, {
      title:'Reports',
      imgUrl:'../../assets/images/slider/reports.jpg',
      description: "Improve your trading decisions by reviewing reports derived from your trading journal. Reports are generated across categories such as portfolio, performance, risk, discipline, trading rules, and goals."
    }, {
      title:'Trade Plan',
      imgUrl:'../../assets/images/slider/trade-plan.jpg',
      description: "Prepare for the day ahead with a meticulous trade plan, which makes you think objectively about the market and your positions without getting influenced by the price movements."
    }, {
      title:'Trading Rules',
      imgUrl:'../../assets/images/slider/trading-rules.jpg',
      description: "Set trading rules based on your experience and best practices and abide by them. Manual rules act like reminders while trading. Automatic rules trigger alerts when they are broken."
    }, {
      title:'Prerequisites',
      imgUrl:'',
      description: "To take complete advantage of TradeAnalytix, the following setups should be completed:Configure data for trade journaling:<br/>Create trading rules<br/>Define goals<br/>Add or import trades"
    }
  ];
  constructor(
    public dialogRef: MatDialogRef<SliderModalComponent>, 
  ) {
    //this.title = data.title;
  }

  ngOnInit() {
  }

  closeModal() {
    this.dialogRef.close();
  }

  priviousSlide() {
    this.currentInd--;
  }
  nextSlide() {
    if (this.currentInd === (this.data.length - 1)) {
      this.currentInd = 0;
    } else {
      this.currentInd++;
    }
  }

}
