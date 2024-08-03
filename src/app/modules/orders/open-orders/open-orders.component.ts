import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CancelOrderPopupComponent } from './cancel-order-popup/cancel-order-popup.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Margins } from '../../shared/models/margins.model';
import { OmsService } from '../../shared/services/oms.service';
import { SharedService } from '../../shared/services/shared.service';

@Component({
  selector: 'app-open-orders',
  templateUrl: './open-orders.component.html',
  styleUrls: ['./open-orders.component.scss']
})
export class OpenOrdersComponent implements OnInit {
  isMobileDevice: any;
  @Input() openOrders:any;

  orderToggle: boolean = true;
  marginsSource: Margins = new Margins();
  showOrdersModal: boolean | undefined;
  selectAll: boolean = false;
  cancelOrdersList:any=[];

  constructor(
    private _orderService: OmsService,
    private _sharedService: SharedService,
    private toastr: ToastrService,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.checkDevice();
  }

  editOrder(purchasedOrder : any){
    this._sharedService.orderModifyEvent.emit(purchasedOrder);
    if(this.isMobileDevice) {
      this.modifyOrder(purchasedOrder)
    }
  }

  cancelOrder(purchasedOrder : any){
    this._sharedService.loaderEvent.emit(true);
    let orderIds = purchasedOrder.order_id;
    this._orderService.cancelOrder(orderIds).subscribe(
      response => {
        console.log(response);
        this.toastr.success('Success', 'Order Cancelled successfully', {timeOut: 3000, positionClass: 'toast-bottom-right'});
        this._sharedService.ordersReloadEvent.emit(true);
        this._sharedService.loaderEvent.emit(false);
      }, error => {
        console.log(error);
        this.toastr.error('Error', 'Error whike cancelling orders', {timeOut: 3000, positionClass: 'toast-bottom-right'});
        this._sharedService.loaderEvent.emit(false);
      }
    );
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

  closeModal() {
    this.showOrdersModal = false;
  }

  modifyOrder(order : any) {
    this._sharedService.loaderEvent.emit(true);
    let orderId = order.order_id
    this._orderService.getEditOrderDetail(orderId).subscribe(response =>{
      if(response){
        // this.marginsSource = response;
        console.log(this.marginsSource);
        this.showOrdersModal = true;
        this.orderToggle = true;
        if (response.type === 'BUY') {
          this.orderToggle = false;
        }
      }
      this._sharedService.loaderEvent.emit(true);
    }, error =>{
      this.toastr.error("Error", error.error, {timeOut: 3000, positionClass: 'toast-bottom-right'});
      this._sharedService.loaderEvent.emit(false);
    });
  }

  toggleSelectAll() {
    let list:any = [];
    this.openOrders.forEach((order:any) => {
      order.selected = this.selectAll;
      if(order.selected) {
        list.push(order);
      }
    });
    this.cancelOrdersList = list;
  }

  toggleOrder(order : any) {
    if(order.selected) {
      this.cancelOrdersList.push(order);
      this.selectAll = this.openOrders.length === this.cancelOrdersList.length ? true : false;
    } else {
      this.cancelOrdersList.filter((item:any, i:any) => {
        if(item.order_id === order.order_id) {
          this.cancelOrdersList.splice(i, 1);
        }
      })
      this.selectAll = false;
    }
  }

  openCancelOrderPopup() {
    const dialogRef = this._dialog.open(CancelOrderPopupComponent, {
      width: 'auto',
      height: 'auto',
      data: this.cancelOrdersList
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        if(res === "Cancel All") {
          this.cancelAllSelectedOpenOrders()
        }
        this._sharedService.ordersReloadEvent.emit(true);
      }
    });
  }

  cancelAllSelectedOpenOrders() {
    let orderIds:any = [];
    this.cancelOrdersList.filter((item:any) => {
      orderIds.push(item.order_id)
    })

    this._orderService.cancelOrder(orderIds).subscribe(
      response => {
        console.log(response);
        this.cancelOrdersList = [];
        this.selectAll = false;
        this._sharedService.ordersReloadEvent.emit(true);
      }
    );
  }

  openIntradayOrder(order) {
    this._sharedService.orderModifyEvent.emit(order);
    if(this.isMobileDevice) {
      this.modifyOrder(order)
    }
  }


}
