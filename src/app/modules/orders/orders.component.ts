import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/modules/shared/services/shared.service';
import { OrderPurchasehistory, OrderPurchasehistoryResponse } from '../shared/models/orders.model';
import { OmsService } from '../shared/services/oms.service';
import { OrdersWebsocketService } from '../shared/services/websocket/orders-websocket.service';
import { UserService } from '../shared/services/user.service';
import { NavigationStart, Router } from '@angular/router';
import { PriceUpdateWebsocketService } from '../shared/services/websocket/price-update-websocket.service';

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
  isMobileDevice: any;
  constructor(
    private _orderService: OmsService,
    private _sharedService: SharedService,
    private toastr: ToastrService,
    private ordersWebsocketService: OrdersWebsocketService,
    private userService: UserService,
    private instrumentPriceUpdateService: PriceUpdateWebsocketService,
    private router: Router
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

      this.router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
          this.instrumentPriceUpdateService.disconnectUser();
        }
      });

  }

  ngOnInit() {
    this.instrumentPriceUpdateService.establishConnection();
    this.checkDevice();
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

  updateChangeProps(openOrders: OrderPurchasehistoryResponse, data: any) {
    openOrders.data.forEach(openOrder => {
      if(openOrder.instrument.actualSymbol === data.symbol){
        openOrder.ltp = data.ltp;
      }});
  }

  loadOrders(){
    let isBrokerageActive = sessionStorage.getItem('isBrokerageActive') && sessionStorage.getItem('isBrokerageActive') === 'true';
    if (isBrokerageActive && isBrokerageActive !== undefined) {
      this._orderService.getOrders().subscribe(response => {
        if(response){
          console.log(response);
          this.loadOpenOrders(response);
          this.loadExecutedOrders(response);
          this.subscribeSymbolsPriceUpdate();
        }
      }, error => {
        this.toastr.error(error.error.errorMessage, 'Error', {timeOut: 3000});
      });
    } else {
      this.toastr.error("You are not connected to the broker. Click 'Connect Broker' to establish a connection", 'Error');
    }
  }

  subscribeSymbolsPriceUpdate() {
    if (this.openOrders.data && this.openOrders.data.length > 0) {
      this.instrumentPriceUpdateService.joinRoom(this.instrumentPriceUpdateService.userId);
      this.openOrders.data.forEach(openOrder => {
          let callback = (data: any) => {
            this.updateChangeProps(this.openOrders, data);
          };
          this.instrumentPriceUpdateService.initPriceUpdateSubscription(openOrder.instrument.actualSymbol, [callback]);
        });
    }
    if (this.executedOrders.data && this.executedOrders.data.length > 0) {
      this.instrumentPriceUpdateService.joinRoom(this.instrumentPriceUpdateService.userId);
      this.executedOrders.data.forEach(executedOrder => {
          let callback = (data: any) => {
            this.updateChangeProps(this.executedOrders, data);
          };
          this.instrumentPriceUpdateService.initPriceUpdateSubscription(executedOrder.instrument.actualSymbol, [callback]);
        });
    }
  }

  loadOpenOrders(response){
    response.data.openOrders.forEach(obj => {
      obj.journal = 'Journal';
      obj.selected = false;
  });
    this.openOrders.data = response.data.openOrders;
  }

  loadExecutedOrders(response){
    response.data.executedOrders.forEach(obj => {
      obj.journal = 'Journal';
      obj.selected = false;
  });
    this.executedOrders.data = response.data.executedOrders;
    // this._orderService.getExecutedOrders().subscribe(response => {
    //   if(response){
    //     this.executedOrders.data = response.data?.reverse();
    //   }
    // });
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