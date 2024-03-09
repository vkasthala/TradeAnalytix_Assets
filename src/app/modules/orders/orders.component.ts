import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/modules/shared/services/shared.service';



@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  // openOrders: OrderPurchasehistoryResponse = { data: null };
  // executedOrders: OrderPurchasehistoryResponse = {data: null};
  newOrder:boolean = false;
  constructor(
    // private _orderService: OmsService,
    private _sharedService: SharedService,
    private toastr: ToastrService,
    // private quoteUpdateService: QuoteUpdateStompService,
    // private ordersWebsocketService: OrdersWebsocketService,
    // private _userService: UserService,
    // private postionsWSService: PositionsWebsocketService
  ) {

    // _sharedService.ordersReloadEvent.subscribe(
    //   (res) => {
    //     if(res){
    //       this.newOrder = res;
    //       this.loadOpenOrders();
    //       this.loadExecutedOrders();
    //       if(this.newOrder) {
    //         setTimeout(() => {
    //         }, 4000)
    //       }
    //     }
    //   });

  }

  ngOnInit() {
    // this.loadOpenOrders();
    // this.loadExecutedOrders();
    // this.unsubscribe();
    // this.loadUserId();
  }



}