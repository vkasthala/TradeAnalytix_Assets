import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';
import { OmsService } from '../../shared/services/oms.service';
import { Margins } from '../../shared/models/margins.model';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IntradayOrderPopupComponent } from '../../watch-list/components/intraday-order-popup/intraday-order-popup.component';
import { OrderRuleCheckRequest, OrderRuleDto, OrderRuleResponse } from '../../shared/models/orders.model';

@Component({
  selector: 'app-executed-orders',
  templateUrl: './executed-orders.component.html',
  styleUrls: ['./executed-orders.component.scss']
})

export class ExecutedOrdersComponent implements OnInit {

  @Input() executedOrders:any;
  @Output('cancelOrder') cancelOrder = new EventEmitter();
  isMobileDevice: any;

  orderToggle: boolean = true;
  marginsSource: Margins = new Margins();
  showOrdersModal: boolean | undefined;
  
  constructor(
    private _sharedService: SharedService, 
    private _orderService: OmsService,
    private toastr: ToastrService,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.checkDevice();
  }

  closePopup() {
    this.cancelOrder.emit()
  }

  checkDevice() {
    setTimeout(() => {
      const agent = window.navigator.userAgent.toLowerCase();
      let regexp = /android|iphone|kindle|ipad/i;
      let deviceType = regexp.test(agent);
      if (deviceType) {
        this.isMobileDevice = true;
      } else {
        this.isMobileDevice = false;
      }
    }, 100)
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkDevice()
  }

  openIntradayOrderPopup(orderType:any, order:any) {
    console.log(this.executedOrders);
    let ruleCheckPayload: OrderRuleCheckRequest = {} as OrderRuleCheckRequest;
    ruleCheckPayload.orderType = order.order_type;
    ruleCheckPayload.productType = order.product;
    ruleCheckPayload.tradeType = order.tradeType ? order.tradeType : 'STOCK';
    ruleCheckPayload.limitPrice = order.limitPrice;
    ruleCheckPayload.stopPrice = order.trigger_price;
    ruleCheckPayload.quantity = order.placedQty;
    ruleCheckPayload.transactionType = order.type;
    ruleCheckPayload.symbol = order.instrument.actualSymbol;
    ruleCheckPayload.marketPrice = order.price;

    let margins: Margins = {} as Margins;
    margins = order;
    margins.trading_symbol = order.instrument.actualSymbol;
    margins.transaction_type = order.type;
    ruleCheckPayload.orderId = order.orderId;
    const dialogRef = this._dialog.open(IntradayOrderPopupComponent, {
      width: 'auto',
      height: 'auto',
      data: {'ruleCheckPayload':ruleCheckPayload, 'margins': margins, 'orderType':orderType}
    });
    dialogRef.afterClosed().subscribe((orderRules) => {
      if (orderRules) {
        this.updateJournal(orderRules, order.orderId);
      }
    });
  }

  updateJournal(orderRules: OrderRuleDto, orderId:string){
    this._sharedService.loaderEvent.emit(true);
    this._orderService.updateRules(orderRules, orderId).subscribe(response=>{
      if(response){
        this.toastr.success('Journal updated successfully', 'Success', {timeOut: 3000});
        this._sharedService.ordersReloadEvent.emit(true);
        this.closePopup();
        setTimeout(() => {
          this._orderService.updateRulesForStrategy(orderRules, orderId).subscribe(success => {}, err => {});
        }, 2000);
      }
    }, error => {
      this.toastr.error(error.error.errorMessage, 'Error', {timeOut: 3000});
      this.closePopup();
      this._sharedService.ordersReloadEvent.emit(true);
      this._sharedService.loaderEvent.emit(false);
    });
  }

  get hasExecutedOrders(): boolean {
    return !this.executedOrders || this.executedOrders.length === 0;
  }

}
