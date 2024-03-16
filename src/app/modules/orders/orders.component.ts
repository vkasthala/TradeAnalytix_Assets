import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/modules/shared/services/shared.service';
import { OrderPurchasehistory, OrderPurchasehistoryResponse } from '../shared/models/orders.model';
import { OmsService } from '../shared/services/oms.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  openOrders: OrderPurchasehistoryResponse = { data: null };
  executedOrders: OrderPurchasehistoryResponse = {data: null};
  newOrder:boolean = false;
  constructor(
    private _orderService: OmsService,
    private _sharedService: SharedService,
    private toastr: ToastrService,
    // private quoteUpdateService: QuoteUpdateStompService,
    // private ordersWebsocketService: OrdersWebsocketService,
    // private _userService: UserService,
    // private postionsWSService: PositionsWebsocketService
  ) {

    _sharedService.ordersReloadEvent.subscribe(
      (res) => {
        if(res){
          this.newOrder = res;
          this.loadOpenOrders();
          this.loadExecutedOrders();
          if(this.newOrder) {
            setTimeout(() => {
            }, 4000)
          }
        }
      });

  }

  ngOnInit() {
    this.loadOpenOrders();
    this.loadExecutedOrders();
    this.unsubscribe();
    // this.loadUserId();
  }

  unsubscribe(){
    // this.postionsWSService.unsubscribeAll();
  }

  moveOrderToExecutedTab(data: any) {
    if (data && data.body) {
      let orderId = data.body;
      if (orderId) {
        if(null != this.openOrders.data){
        let openOrder  = this.openOrders.data.find(openOrder => openOrder.id == orderId);
        this.openOrders.data = this.openOrders.data.filter(openOrder => openOrder.id != orderId);
        if(openOrder){
        openOrder.status = 'COMPLETE';
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

  loadOpenOrders(){
    this.openOrders.data = 
       [
        {'id': 123,
    'order_id': 'string',
    'time': '10:46:59',
    'type': 'BUY',
    'instrument': {
      'symbol':'HDFC',
      'exchange':'',
      'symbolId':0
    },
    'product': 'MIS',
    'quantity': 1/1,
    'ltp': 131.05,
    'price': 172.05,
    'status': 'OPEN',
    'journal': 'ADD',
    'selected': false
    },
    {'id': 123,
    'order_id': 'string',
    'time': '10:46:59',
    'type': 'SELL',
    'instrument': {
      'symbol':'HDFC',
      'exchange':'',
      'symbolId':0
    },
    'product': 'MIS',
    'quantity': 1/1,
    'ltp': 131.05,
    'price': 172.05,
    'status': 'OPEN',
    'journal': 'ADD',
    'selected': false
    }
  ]
    // this._orderService.getOpenOrders().subscribe(response => {
    //   if(response){
    //     console.log(response);
    //     this.openOrders.data = response.data?.reverse();
    //     this.subscribeSymbolsPriceUpdate();
    //   }
    // });
  }

  loadExecutedOrders(){

    this.executedOrders.data = 
       [
        {'id': 123,
    'order_id': 'string',
    'time': '10:46:59',
    'type': 'BUY',
    'instrument': {
      'symbol':'HDFC',
      'exchange':'',
      'symbolId':0
    },
    'product': 'MIS',
    'quantity': 1/1,
    'ltp': 131.05,
    'price': 172.05,
    'status': 'COMPLETED',
    'journal': 'ADD',
    'selected': false
    },
    {'id': 123,
    'order_id': 'string',
    'time': '10:46:59',
    'type': 'SELL',
    'instrument': {
      'symbol':'HDFC',
      'exchange':'',
      'symbolId':0
    },
    'product': 'MIS',
    'quantity': 1/1,
    'ltp': 131.05,
    'price': 172.05,
    'status': 'COMPLETED',
    'journal': 'ADD',
    'selected': false
    }
  ]



    // this._orderService.getExecutedOrders().subscribe(response => {
    //   if(response){
    //     this.executedOrders.data = response.data?.reverse();
    //   }
    // });
  }



}