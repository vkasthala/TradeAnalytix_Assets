import { trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orders-modal',
  templateUrl: './orders-modal.component.html',
  styleUrls: ['./orders-modal.component.scss']
})
export class OrdersModalComponent implements OnInit {
  @Input('orderToggle') orderToggle: boolean=false;
  @Output('cancelOrder') cancelOrder = new EventEmitter();
  // @Input('margins') margins:any = Margins;
  orderPlacementPrice: number = 0;
  isOrderModify: boolean = false;
  ltp: number = 0;

  loader: boolean = false;
  @Input() isPositionsOrder: boolean=false;
  @Input() isHoldingOrder: boolean=false;
  
  constructor(
    // private _sharedService: SharedService,
    private toastr: ToastrService,
    // private _omsService: OmsService
  ) { }

  ngOnInit() {
    // this.isOrderModify = this.margins.order_id != null;
    // this.orderPlacementPrice = this.margins.price;
    // this.ltp = this.margins.price;
  }

  closePopup() {
    this.resetModalData();
    this.cancelOrder.emit()
  }

  resetModalData(){
    // this.margins = null;
  }

}
