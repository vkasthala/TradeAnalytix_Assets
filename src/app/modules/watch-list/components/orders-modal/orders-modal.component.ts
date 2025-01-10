import { trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { Margins } from 'src/app/modules/shared/models/margins.model';
import { OmsService } from 'src/app/modules/shared/services/oms.service';
import { SharedService } from 'src/app/modules/shared/services/shared.service';
import { IntradayOrderPopupComponent } from '../intraday-order-popup/intraday-order-popup.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { OrderRuleCheckRequest, OrderRuleDto, OrderRuleResponse } from 'src/app/modules/shared/models/orders.model';

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
  isMobileDevice: any;
  isButtonEnabled: boolean = true;

  loader: boolean = false;
  @Input() isPositionsOrder: boolean=false;
  @Input() isHoldingOrder: boolean=false;
  
  constructor(
    private _sharedService: SharedService,
    private toastr: ToastrService,
    private _omsService: OmsService,
    private _dialog: MatDialog,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.isOrderModify = this.margins.orderId != null;
    this.orderPlacementPrice = this.margins.price;
    this.ltp = this.margins.price;
    this.checkDevice();
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
      this.margins.type = "SELL"
    } else {
      this.margins.transaction_type = "BUY"
      this.margins.type = "BUY"
    }
    this.calculateMargin();
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

  calculateMargin(){
    const placeOrderRequest = this.getOrderPlacementRequest();
      if(placeOrderRequest){
        this.loader = true;
        this._omsService.getMargin(placeOrderRequest).subscribe(response =>{
          this.margins.margin = response.margin;
          this.margins.charges = response.charges;
          this.margins.availableMargin = response.availableMargin;
          this.loader = false;
        }, error =>{
          // this.toastr.error(error.error, "Error", {timeOut: 3000});
          console.log("Error in calling margin api "+error.error);
          this.loader = false;
        });
      }
  }

  orderPlacement(orderRules: OrderRuleDto) {
    this._sharedService.loaderEvent.emit(true);
    const placeOrderRequest = this.getOrderPlacementRequest();
    const orderType = this.margins.variety;
    placeOrderRequest.stopLossTriggerPrice = 0;
      this._omsService.placeOrder(placeOrderRequest).subscribe(response=>{
        if(response){
          this.toastr.success('Order Placed Successfully', 'Success', {timeOut: 3000});
          this._sharedService.ordersReloadEvent.emit(true);
          this._sharedService.loaderEvent.emit(false);
          this.closePopup();
          this._omsService.saveRules(orderRules, response.data.orderId).subscribe(res=>{
            if(res){
              this._omsService.updateRulesForStrategy(response.data.orderId).subscribe(success => {}, err => {});
            }
          }, error => {
            // this.toastr.error("Error while saving order rules", 'Error', {timeOut: 3000});
          });
        }
      }, error => {
        this.toastr.error(error.error.errorMessage, 'Error', {timeOut: 3000});
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
      // price = '0.0';
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
    if (number < 0.05) {
      return false;
    }
    const num = parseFloat((number * 100).toFixed(10));
    if(number<250){
      return num % 1 === 0;
    } else  {
      return num % 5 === 0;
    }
  }

  findNearestValidTickSize(number: number): number[] {
    const roundedNumber: number = Number(number.toFixed(2));
    const lowerTick = number<250 ? Math.floor(roundedNumber / 0.01) * 0.01 : Math.floor(roundedNumber / 0.05) * 0.05;
    const upperTick = number<250 ? Math.ceil(roundedNumber / 0.01) * 0.01 : Math.ceil(roundedNumber / 0.05) * 0.05;
    return [Number(lowerTick.toFixed(2)),Number(upperTick.toFixed(2))];
  }

  displayNearestValidPriceErrorMsg(price:number){
    const numStr = price.toFixed(2);

    let nearestValues = this.findNearestValidTickSize(price);
    let message :any = 'Value must be greater than or equal to 0.05';
    const decimalPart:any = numStr.toString().split('.')[1];
    if (price < 0.05) {
      this.showBottomRight(message);
    } else {
        message = 'Please enter a valid value. Two nearest valid values are ' + nearestValues[0].toFixed(2) + ' and ' + nearestValues[1].toFixed(2);
        this.showBottomRight(message);
    }
  }

  showBottomRight(message: string, title: string = '') {
    this.toastr.error(message, title, { positionClass: 'toast-bottom-right' });
  }

  modifyOrder(orderRules: OrderRuleDto, orderId:any){
    this.isButtonEnabled = true;
    this._sharedService.loaderEvent.emit(true);
    let price = this.getPrice();
    if(!this.isValid(price)){
      this.isButtonEnabled = false;
      this.displayNearestValidPriceErrorMsg(price)
      return; 
    }
    let triggerPrice = this.getTriggerPrice();
    if(!this.isValidPricesForStopLoss(triggerPrice)){
      this.isButtonEnabled = false;
      return;
    }
    console.log(this.margins);
    const placeOrderRequest = this.getOrderPlacementRequest();
    this._sharedService.ordersReloadEvent.emit(true);
    this._omsService.modifyOrder(this.margins.orderId, placeOrderRequest).subscribe(response=>{
      if(response){
        this.toastr.success('Order Updated Successfully', 'Success', {timeOut: 3000});
        this._sharedService.ordersReloadEvent.emit(true);
        this.closePopup();
        this._sharedService.loaderEvent.emit(false);
        this._omsService.updateRules(orderRules, orderId).subscribe(response=>{
          // if(response){
          //   this.toastr.success('Order rules saved successfully', 'Success', {timeOut: 3000});
          // }
        }, error => {
          // this.toastr.error("Error while saving order rules", 'Error', {timeOut: 3000});
        });
      }
    }, error => {
      this.toastr.error(error.error.errorMessage, 'Error', {timeOut: 3000});
      this.closePopup();
      this._sharedService.ordersReloadEvent.emit(true);
      this._sharedService.loaderEvent.emit(false);
    });
  }

  changeOrderQty(event:any) {
    let val = event.target.value;
    if(val < 0) {
      this.margins.quantity = Math.abs(val);
    }
    this.calculateMargin();
  }

  isValidPricesForStopLoss(triggerPrice: number) : boolean{
    let isvalid = true;
    if(triggerPrice > this.ltp){
      isvalid = false;
      let message = "Trigger price for " + this.margins.transaction_type  + " orders should be lesser than the last traded price ("
       + triggerPrice + "). Use limit order to sell at higer price.";
      this.toastr.error(message, 'Error', {timeOut: 3000});
    }
    this._sharedService.loaderEvent.emit(false);
    return isvalid;
  }

  openIntradayOrderPopup(orderType:any) {
    console.log(this.margins);
    let ruleCheckPayload: OrderRuleCheckRequest = this.getOrderPlacementRequest();
    ruleCheckPayload.tradeType = this.margins.tradeType;
    if(ruleCheckPayload.tradeType == 'OPTION') {
      ruleCheckPayload.expiryDate = this.margins.expiry;
    }
    if(this.margins.orderId){
      ruleCheckPayload.orderId = this.margins.orderId;
    }
    const dialogRef = this._dialog.open(IntradayOrderPopupComponent, {
      width: 'auto',
      height: 'auto',
      data: {'ruleCheckPayload':ruleCheckPayload, 'margins': this.margins, 'orderType':orderType}
    });
    dialogRef.afterClosed().subscribe((orderRules) => {
      if (orderRules) {
        if(this.margins.orderId){
        this.modifyOrder(orderRules, this.margins.orderId);
        } else{
          this.orderPlacement(orderRules);
        }
      }
    });
  }

  getOrderPlacementRequest(): any {
    let price = this.getPrice();
    if(!this.isValid(price)){
      this._sharedService.loaderEvent.emit(false);
      return; 
    }

    if(this.margins.quantity < 0) {
      this.margins.quantity = Math.abs(this.margins.quantity);
    }
    let orderPlaceType = this.margins.order_type;
    let stopLossEnabled = this.margins.order_type == 'SL' || this.margins.order_type == 'SL-M';
    let triggerPrice = this.getTriggerPrice();
    if(stopLossEnabled){
      orderPlaceType = this.margins.order_type == 'SL' ? 'STOPLOSS_LIMIT' : 'STOPLOSS_MARKET';
    }
    let placeOrderRequest = {
      orderType: orderPlaceType,
      productType: this.margins.product ? this.margins.product : "MIS",
      quantity: this.margins.quantity,
      symbol: this.margins.instrument.symbol,
      transactionType: this.margins.type,
      validity: 'DAY',
      limitPrice: this.isLimitChecked() ? price : 0,
      stopPrice : triggerPrice,
      stopLossTriggerPrice: 0
    }
    return placeOrderRequest;
  }

  checkIfSameDayExpiryExcluded(expiryDate: string): string {
    let today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    if(today == expiryDate){
      return 'No';
    } else{
      return 'Yes';
    }
  }

  checkIfNextDayExpiryExcluded(expiryDate: string): string {
    let today = new Date(new Date());
    today.setDate(today.getDate() + 1);
    let tomorrow = this.datePipe.transform(today, 'yyyy-MM-dd');
    if(tomorrow == expiryDate){
      return 'No';
    } else{
      return 'Yes';
    }
  }

  onBlurEvent(event: any) {
    let price = this.getPrice();
    if (event.target.name === 'price' && !this.isValid(price)){
      this.displayNearestValidPriceErrorMsg(price);
      this._sharedService.loaderEvent.emit(false);
      return; 
    }
    if (event.target.name === 'trigger_price'){
      let triggerPrice = this.getTriggerPrice();
      if(!this.isValidPricesForStopLoss(triggerPrice)){
      return;
    } else{
      if(!this.validateTickSize(triggerPrice)){
        this.displayNearestValidPriceErrorMsg(triggerPrice);
        return;
      }
    }
    }

    this.calculateMargin();
  }

  onInput(event: any){
    this.isButtonEnabled = true;
    let price = this.getPrice();
    if (event.target.name === 'price' && !this.isValid(price)){
      this.isButtonEnabled = false;
    }
    if (event.target.name === 'trigger_price'){
      let triggerPrice = this.getTriggerPrice();
      if(triggerPrice > this.ltp){
        this.isButtonEnabled = false;
    } else{
      if(!this.validateTickSize(triggerPrice)){
        this.isButtonEnabled = false;
      }
    }
    }
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

}
