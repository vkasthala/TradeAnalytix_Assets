import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/modules/shared/services/shared.service';
import { OrderPurchasehistory, OrderPurchasehistoryResponse } from '../shared/models/orders.model';
import { OmsService } from '../shared/services/oms.service';
import { OrdersWebsocketService } from '../shared/services/websocket/orders-websocket.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  openOrders: OrderPurchasehistoryResponse = { data: null };
  executedOrders: OrderPurchasehistoryResponse = {data: null};
  newOrder:boolean = false;
  userId: number = undefined;
  constructor(
    private _orderService: OmsService,
    private _sharedService: SharedService,
    private toastr: ToastrService,
    private ordersWebsocketService: OrdersWebsocketService,
    private userService: UserService
  ) {

    _sharedService.ordersReloadEvent.subscribe(
      (res) => {
        if(res){
          this.newOrder = res;
          this.loadOrders();
          if(this.newOrder) {
            setTimeout(() => {
            }, 4000)
          }
        }
      });

  }

  ngOnInit() {
    this.loadOrders();
    this.unsubscribe();
    this.loadUserDetails();
  }

  loadUserDetails() {
    this.userService.getUserDetails().subscribe(details => {
      if (details && details.userId) {
        this.userId = details.userId;
        this.subscribeOrdersUpdate(this.userId+'');
      }
    });
  }

  subscribeOrdersUpdate(userId: string) {
    let callback = (data: any) => {
      this.moveOrderToExecutedTab(data);
    };
    this.ordersWebsocketService.subscribeOrdersUpdate(userId, callback);
}

  unsubscribe(){
    // this.postionsWSService.unsubscribeAll();
  }

  moveOrderToExecutedTab(data: any) {
    if (data && data.body) {
      let payload = JSON.parse(data.body);
      if (payload.orderId) {
        let orderId = payload.orderId;
        let orderStatus = payload.status;
        if(null != this.openOrders.data){
        let openOrder  = this.openOrders.data.find(openOrder => openOrder.orderId == orderId);
        this.openOrders.data = this.openOrders.data.filter(openOrder => openOrder.orderId != orderId);
        if(openOrder){
        openOrder.status = orderStatus;
        if(null != this.executedOrders.data){
          this.executedOrders.data.push(openOrder);
      } else{
        this.executedOrders.data = [openOrder];
      }
        }
        }
      }
      }
  }

  updateChangeProps(openOrder: OrderPurchasehistory, data: any) {
    if (data && data.body) {
      let jsonResult = JSON.parse(data.body);
      if (jsonResult.price) {
        openOrder.ltp = jsonResult.price;
      }
    }
  }

  loadOrders(){
    this._orderService.getOrders().subscribe(response => {
      if(response){
        console.log(response);
        this.loadOpenOrders(response);
        this.loadExecutedOrders(response);
        // this.subscribeSymbolsPriceUpdate();
      }
    }, error => {
      this.toastr.error(error.error.errorMessage, 'Error', {timeOut: 3000, positionClass: 'toast-bottom-right'});
    }
    );
  }

  loadOpenOrders(response){
    response.data.openOrders.forEach(obj => {
      obj.journal = 'ADD';
      obj.selected = false;
  });
    this.openOrders.data = response.data.openOrders;
  }

  loadExecutedOrders(response){
    response.data.executedOrders.forEach(obj => {
      obj.journal = 'ADD';
      obj.selected = false;
  });
    this.executedOrders.data = response.data.executedOrders;
    // this._orderService.getExecutedOrders().subscribe(response => {
    //   if(response){
    //     this.executedOrders.data = response.data?.reverse();
    //   }
    // });
  }



}