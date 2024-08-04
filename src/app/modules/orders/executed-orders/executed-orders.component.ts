import { Component, HostListener, Input, OnInit } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';
import { OmsService } from '../../shared/services/oms.service';
import { Margins } from '../../shared/models/margins.model';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-executed-orders',
  templateUrl: './executed-orders.component.html',
  styleUrls: ['./executed-orders.component.scss']
})

export class ExecutedOrdersComponent implements OnInit {

  @Input() executedOrders:any;
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

  openIntradayOrder(order) {
    this._sharedService.orderModifyEvent.emit(order);
    if(this.isMobileDevice) {
      this.modifyOrder(order)
    }
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
        if (response.transaction_type === 'BUY') {
          this.orderToggle = false;
        }
      }
      this._sharedService.loaderEvent.emit(true);
    }, error =>{
      this.toastr.error("Error", error.error, {timeOut: 3000, positionClass: 'toast-bottom-right'});
      this._sharedService.loaderEvent.emit(false);
    });
  }

}
