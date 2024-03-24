import { trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { Margins } from 'src/app/modules/shared/models/margins.model';
import { OmsService } from 'src/app/modules/shared/services/oms.service';
import { SharedService } from 'src/app/modules/shared/services/shared.service';
import { IntradayOrderPopupComponent } from '../intraday-order-popup/intraday-order-popup.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-orders-modal',
  templateUrl: './orders-modal.component.html',
  styleUrls: ['./orders-modal.component.scss']
})
export class OrdersModalComponent implements OnInit {
  @Input('orderToggle') orderToggle: boolean=false;
  @Output('cancelOrder') cancelOrder = new EventEmitter();
  @Input('margins') margins:any = Margins;
  orderPlacementPrice: number = 0;
  isOrderModify: boolean = false;
  ltp: number = 0;

  stoplossChecked: boolean = false;
  targetChecked: boolean = false;

  loader: boolean = false;
  @Input() isPositionsOrder: boolean=false;
  @Input() isHoldingOrder: boolean=false;
  
  constructor(
    private _sharedService: SharedService,
    private toastr: ToastrService,
    private _omsService: OmsService,
    private _dialog: MatDialog
  ) { }

  ngOnInit() {
    this.isOrderModify = this.margins.order_id != null;
    this.orderPlacementPrice = this.margins.price;
    this.ltp = this.margins.price;
  }

  closePopup() {
    this.resetModalData();
    this.cancelOrder.emit()
  }

  resetModalData(){
    this.margins = null;
  }

  changeOrderType(event:any) {
    console.log('event', event)
    if (this.orderToggle) {
      this.margins.transaction_type = "SELL"
    } else {
      this.margins.transaction_type = "BUY"
    }
    this._sharedService.orderToggleStatus.emit(this.orderToggle);
  }

  varietyChange(event:any) {
    let val = event.target.value;
    console.log(event.target.value);
    if  (val === 'cover') {
      this.margins.product = 'INTRADAY';
      let isLimitChecked = (document.getElementById('LIMIT') as HTMLInputElement).checked;
      if(!isLimitChecked) {
        setTimeout(() => {
          (document.getElementById('MARKET') as HTMLInputElement).checked = true;
          (document.getElementById('MARKET') as HTMLInputElement).disabled = false;
          (document.getElementById('LIMIT') as HTMLInputElement).disabled = false;
        }, 50);
        
      } else {
        setTimeout(() => {
          (document.getElementById('MARKET') as HTMLInputElement).disabled = false;
          (document.getElementById('LIMIT') as HTMLInputElement).disabled = false;
        }, 50);
      }
    }
  }

  orderPlacement() {
    this._sharedService.loaderEvent.emit(true);
    let price = this.getPrice();
    if(!this.isValid(price)){
      this.displayNearestValidPriceErrorMsg(price);
      this._sharedService.loaderEvent.emit(false);
      return; 
    }

    const orderType = this.margins.variety;

    if(this.margins.quantity < 0) {
      this.margins.quantity = Math.abs(this.margins.quantity);
    }
    let orderPlaceType = this.margins.order_type;
    let stopLossEnabled = this.margins.order_type == 'SL' || this.margins.order_type == 'SL-M';
    let triggerPrice = this.getTriggerPrice();
    if(stopLossEnabled){
      orderPlaceType = this.margins.order_type == 'SL' ? 'STOPLOSS_LIMIT' : 'STOPLOSS_MARKET';
    }
    const placeOrderRequest = {
      orderType: orderPlaceType,
      productType: this.margins.product ? this.margins.product : "MIS",
      quantity: this.margins.quantity,
      symbol: this.margins.tradingsymbol,
      transactionType: this.margins.transaction_type,
      validity: 'DAY',
      limitPrice: price,
      stopPrice : triggerPrice,
      stopLossTriggerPrice: 0
    }
    this._omsService.placeOrder(placeOrderRequest, orderType).subscribe(response=>{
      if(response){
        this.toastr.success('Order placed successfully', 'Success', {timeOut: 3000, positionClass: 'toast-bottom-right'});
        this._sharedService.ordersReloadEvent.emit(true);
        this._sharedService.loaderEvent.emit(false);
        this.closePopup();
      }
    }, error => {
      this.toastr.error(error.error.errorMessage, 'Error', {timeOut: 3000, positionClass: 'toast-bottom-right'});
      this._sharedService.ordersReloadEvent.emit(true);
      this._sharedService.loaderEvent.emit(false);
    });
  }

  isValid(price: number): boolean{
    let isTrue: boolean = true;
    let isLimitChecked = this.isLimitChecked();
    console.log(isLimitChecked);
    if(isLimitChecked){
      isTrue = this.validateTickSize(price);
    }
    return isTrue;
  }

  getPrice(): number{
    let isLimitChecked = this.isLimitChecked();
    let price = (document.getElementById('price') as HTMLInputElement).value;
    console.log(isLimitChecked);
    if(!isLimitChecked){
      price = this.margins.price;
    }
    return parseFloat(price);
  }

  getTriggerPrice(): number{
    let price = (document.getElementById('trigger_price') as HTMLInputElement).value;
    return parseFloat(price);
  }

  isLimitChecked(): boolean{
    return (document.getElementById('LIMIT') as HTMLInputElement).checked || (document.getElementById('SL') as HTMLInputElement).checked;
  }

  validateTickSize(number: number): boolean {
    if (isNaN(number)) {
      return false;
    }
    if (number < 0.05 || ((number * 100) % 5 !== 0)) {
      return false;
    }
    return true;
  }

   findNearestValidTickSize(number: number): number[] {
    const roundedNumber: number = Number(number.toFixed(2));
    const lowerTick = Math.floor(roundedNumber / 0.05) * 0.05;
    const upperTick = Math.ceil(roundedNumber / 0.05) * 0.05;
    return [Number(lowerTick.toFixed(2)),Number(upperTick.toFixed(2))];
  }

  displayNearestValidPriceErrorMsg(price:number){
    let nearestValues = this.findNearestValidTickSize(price);
    let message = price < 0.05 
      ? 'Value must be greater than or equal to 0.05' 
      : 'Please enter a valid value. Two nearest valid values are ' + nearestValues[0] + ' and ' + nearestValues[1];
    this.toastr.error(message, 'Error', {timeOut: 3000, positionClass: 'toast-bottom-right'});
  }

  modifyOrder(){
    this._sharedService.loaderEvent.emit(true);
    console.log("modify");
    let price = this.getPrice();
    if(!this.isValid(price)){
      this.displayNearestValidPriceErrorMsg(price)
      return; 
    }
    let triggerPrice = this.getTriggerPrice();
    if(!this.isValidPricesForStopLoss(triggerPrice)){
      return;
    }
    console.log(this.margins);
    const placeOrderRequest = {
      exchange: "NSE",
      order_type: this.margins.order_type,
      product: this.margins.product,
      quantity: this.margins.quantity,
      tradingsymbol: this.margins.tradingsymbol,
      transaction_type: this.margins.transaction_type,
      variety: this.margins.variety,
      price: price,
      trigger_price : triggerPrice,
      stop_loss_enabled: true,
      stop_loss_trigger_price: this.margins.trigger_price
    }
    this._sharedService.ordersReloadEvent.emit(true);
    /*this._omsService.modifyOrder(this.margins.order_id, placeOrderRequest).subscribe(response=>{
      if(response){
        this.toastr.success('Order Updated successfully', 'Success', {timeOut: 3000, positionClass: 'toast-bottom-right'});
        this._sharedService.ordersReloadEvent.emit(true);
        this.closePopup();
        this._sharedService.loaderEvent.emit(false);
      }
    }, error => {
      this.toastr.error(error.error, 'Error', {timeOut: 3000, positionClass: 'toast-bottom-right'});
      this.closePopup();
      this._sharedService.loaderEvent.emit(false);
    });*/
  }

  changeOrderQty(event:any) {
    let val = event.target.value;
    if(val < 0) {
      this.margins.quantity = Math.abs(val);
    }
  }

  isValidPricesForStopLoss(triggerPrice: number) : boolean{
    let isvalid = true;
    if(triggerPrice > this.ltp){
      isvalid = false;
      let message = "Trigger price for " + this.margins.transaction_type  + " orders should be lesser than the last traded price ("
       + triggerPrice + "). Use limit order to sell at higer price.";
      this.toastr.error(message, 'Error', {timeOut: 3000, positionClass: 'toast-bottom-right'});
    }
    this._sharedService.loaderEvent.emit(false);
    return isvalid;
  }

  openIntradayOrderPopup() {
    console.log(this.margins);
    const dialogRef = this._dialog.open(IntradayOrderPopupComponent, {
      width: 'auto',
      height: 'auto',
      data: this.margins
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.modifyOrder();
      }
    });
  }

  gttChange(event:any) {
    let val = event.target.value;
    console.log(event.target.value);
    console.log(event.currentTarget.checked);
    if(event.target.name === "Stoploss"){
      this.stoplossChecked = !this.stoplossChecked;
      
    } else if(event.target.name === "Target"){
      this.targetChecked = !this.targetChecked;
    }
    
    // Stoploss

  }

}
