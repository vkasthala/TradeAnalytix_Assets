import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { CancelOrderPopupComponent } from './cancel-order-popup/cancel-order-popup.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-open-orders',
  templateUrl: './open-orders.component.html',
  styleUrls: ['./open-orders.component.scss']
})
export class OpenOrdersComponent implements OnInit {
  isMobileDevice: any;
  @Input() openOrders:any;

  orderToggle: boolean = true;
  // marginsSource: Margins = new Margins();
  showOrdersModal: boolean | undefined;
  selectAll: boolean = false;
  cancelOrdersList:any=[];

  constructor(
    // private _orderService: OmsService,
    // private _sharedService: SharedService,
    private toastr: ToastrService,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.checkDevice();
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
          // this.cancelAllSelectedOpenOrders()
        }
        // this._sharedService.ordersReloadEvent.emit(true);
      }
    });
  }



}
