import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Margins } from 'src/app/modules/shared/models/margins.model';
import { OrderRuleCheckRequest, OrderRuleResponse } from 'src/app/modules/shared/models/orders.model';
import { OmsService } from 'src/app/modules/shared/services/oms.service';
import { SharedService } from 'src/app/modules/shared/services/shared.service';
import { UserStockStatsService } from 'src/app/modules/shared/services/user-stock-stats.service';
import { StockSummaryResult } from 'src/app/modules/trade-management/models/stock-summary-result.model';

@Component({
  selector: 'app-intraday-order-popup',
  templateUrl: './intraday-order-popup.component.html',
  styleUrls: ['./intraday-order-popup.component.scss']
})
export class IntradayOrderPopupComponent implements OnInit {
  @Input('orderToggle') orderToggle: boolean=false;
  @Input('margins') margins:any = Margins;
  data:{'ruleCheckPayload':OrderRuleCheckRequest, 'margins':Margins};
  orderRules: OrderRuleResponse[] = [new OrderRuleResponse()];
  stockSummaryResult: StockSummaryResult = new StockSummaryResult();

  constructor(
    public dialogRef: MatDialogRef<IntradayOrderPopupComponent>,
    @Inject(MAT_DIALOG_DATA) data:any,
    private _orderService: OmsService,
    private _sharedService: SharedService,
    private toastr: ToastrService,
    private userStockStatsService: UserStockStatsService
  ) {
    this.data = data;
    this.margins = data.margins;
  }

  ngOnInit() {
    console.log(this.data);
    this.loadRules();
    this.loadSummary();
  }

  loadRules(){
  this._orderService.checkRules(this.data.ruleCheckPayload).subscribe(response=>{
    if(response){
      this.orderRules = response;
    }
  }, error => {
    console.log("Error "+error);
  });
}

loadSummary() {
  this.userStockStatsService.getStockMetricsSummaryResult(Number(this.data.margins.instrument.symbolId)).subscribe(result => {
    if(result){
    this.stockSummaryResult = result;
    }
  }, error => {
    console.log("Error "+error);
  });
}

  ngAfterViewInit(): void {

  }

  closeModal() {
    this.dialogRef.close();
  }

  orderPlacement(order:any) {
    let orderIds = order.order_id;
    this.dialogRef.close(this.orderRules);
  }

  cancelAllOpenOrders() {
    this.dialogRef.close("Cancel All");
  }

}