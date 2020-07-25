import { AddTradeConfirmationPopupComponent } from './../../../../modalAsComponents/add-trade-confirmation-popup/add-trade-confirmation-popup.component';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { TradeDataService } from 'src/app/trade-data.service';
import { TradeStrategyService } from 'src/app/trade-strategy.service';
import { TradeStrategy } from '../../../../../TradeStrategy';

@Component({
  selector: 'app-entry-rules',
  templateUrl: './entry-rules.component.html',
  styleUrls: ['./entry-rules.component.scss']
})
export class EntryRulesComponent implements OnInit {

  @Output('prevStep') prevStep = new EventEmitter();

  private tradeStrategy:TradeStrategy;


  constructor(
    private _dialog: MatDialog,
    private router: Router,
    private tradeStrategyService:TradeStrategyService,
    private tradeDataService:TradeDataService
  ) { }

  ngOnInit() {
    this.tradeDataService.share.subscribe(x=>this.tradeStrategy=x)
  }

  previous() {
    this.prevStep.emit()
  }
  callMe() {
    console.log("Print Trade Strategy")
    console.log(this.tradeStrategy);
    this.tradeStrategyService.addStrategy(this.tradeStrategy).subscribe((result) => {
      console.log("Came back after  @add Stock");});
    this.router.navigate(['/dashboard/trade-strategies'])
  }
  confirmAddTrade() {
    const dialogRef = this._dialog.open(AddTradeConfirmationPopupComponent, {
      disableClose: true,
      width: 'auto'
    });

    dialogRef.afterClosed().subscribe((res) => {
      res ? this.callMe() : 0;


    });
  }
}
