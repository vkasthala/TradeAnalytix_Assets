import { Component, HostListener, Injectable, OnInit, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


// import { MatDialog, MatStepper } from '@angular/material';
import { CdkDrag, CdkDragDrop } from '@angular/cdk/drag-drop';
import { WatchlistService } from 'src/app/modules/shared/services/watchlist.service';
import { Watchlist } from 'src/app/modules/shared/models/watchlist.model';
import { Watchlistsymbol } from 'src/app/modules/shared/models/watchlistsymbol.model';
import { SharedService } from 'src/app/modules/shared/services/shared.service';
import { Margins } from 'src/app/modules/shared/models/margins.model';
import { OmsService } from 'src/app/modules/shared/services/oms.service';
import { InstrumentPriceUpdateService } from 'src/app/modules/shared/services/instrument-price-update.service';
import { PriceUpdateModel } from 'src/app/modules/shared/models/price-update-model';
import { PriceUpdateWebsocketService } from 'src/app/modules/shared/services/websocket/price-update-websocket.service';
import { NavigationStart, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.scss']
})
export class WatchListComponent implements OnInit {

  isMobileDevice: any;
  marginsSource: Margins = new Margins();

  orderToggle: boolean = false;
  showOrdersModal: boolean = false;
  watchItem: any = null;
  pageIndex: number = 1;
  selecedIndex: number = 1;
  watchListData: Watchlist[] = [];
  showMobileContextMenu: boolean = false;
  selectedSymbol: any;

  loader = true;

  niftyList = ['NIFTY 50','NIFTY NEXT 50','NIFTY 100','NIFTY 200','NIFTY 500','NIFTY MIDCAP 50','NIFTY MIDCAP 100','NIFTY SMALLCAP 100','INDIA VIX','NIFTY MIDCAP 150','NIFTY SMALLCAP 50','NIFTY SMALLCAP 250','NIFTY MIDSMALLCAP 400','NIFTY500 MULTICAP 50:25:25','NIFTY LARGEMIDCAP 250','NIFTY MIDCAP SELECT','NIFTY TOTAL MARKET','NIFTY MICROCAP 250','NIFTY BANK','NIFTY AUTO','NIFTY FINANCIAL SERVICES','NIFTY FINANCIAL SERVICES 25/50','NIFTY FMCG','NIFTY IT','NIFTY MEDIA','NIFTY METAL','NIFTY PHARMA','NIFTY PSU BANK','NIFTY PRIVATE BANK','NIFTY REALTY','NIFTY HEALTHCARE INDEX',  'NIFTY CONSUMER DURABLES','NIFTY OIL & GAS'];

  sampleData:any =[];

  isPriceUpdateSubscribed: boolean = false;

  country:string = environment.country;

  constructor(
    private renderer: Renderer2,
    private _sharedService: SharedService,
    private _watchlistService: WatchlistService,
    private instrumentPriceUpdateService: PriceUpdateWebsocketService,
    private _omsService: OmsService,
    private toastr: ToastrService,
    private router: Router
  ) {
    _sharedService.sessionActiveEvent.subscribe(
      (res) => {
        if(!this.isPriceUpdateSubscribed){
          this.subscribeSymbolsPriceUpdate(this.pageIndex);
        }
      }
    );
    _sharedService.addItemEvent.subscribe(
      (res) => {
        this.addNewItem(res);
      }
    );
    _sharedService.transactionsEvent.subscribe(
      (res) => {
        this.showOrdersModal = true;
        this.orderToggle = true;
        if (res.transaction_type === 'BUY') {
          this.orderToggle = false;
        }
        this.createMargin(res)
      }
    );
    _sharedService.orderToggleStatus.subscribe(
      (res) => {
        this.orderToggle = res;
      }
    );

    _sharedService.orderModifyEvent.subscribe(
      (orderData) => {
        this.marginsSource = orderData;
        this.marginsSource.instrument = orderData.instrument;
        this.marginsSource.trading_symbol = orderData.instrument.actualSymbol;
        this.marginsSource.transaction_type = orderData.type;
        this.orderToggle = true;
        if (orderData.type === 'BUY') {
          this.orderToggle = false;
        }
        this.modifyOrder(orderData.orderId);
      }
    );
    _sharedService.loaderEvent.subscribe(
      (res) => {
        this.loader = res;
      }
    );

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.instrumentPriceUpdateService.disconnectUser();
      }
    });
  }


  ngOnInit() {
    this.instrumentPriceUpdateService.establishConnection();
    this.checkDevice();
    this.loadWatchList();
    setTimeout(()=>{
      this.loader = false;
    }, 3000);
  }

  loadWatchList() {
    let isBrokerageActive = sessionStorage.getItem('isBrokerageActive') && sessionStorage.getItem('isBrokerageActive') === 'true';
      this.loader = true;
      this._watchlistService.getWatchListItems().subscribe(
        response => {
          if (response) {
            console.log(response)
            this.watchListData = response.watch_lists;
            this._sharedService.watchListReloadEvent.emit(this.watchListData);
            if (isBrokerageActive && isBrokerageActive !== undefined) {
            this.subscribeSymbolsPriceUpdate(this.pageIndex);
            }
          }
          this.loader = false;
        }, error => {
          //this.toastr.error(error, 'Error', {timeOut: 3000});
          this.loader = false;
        }
      );
  }

  unsubscribeSymbol(item: Watchlistsymbol) {
    this.instrumentPriceUpdateService.unSubscribePriceUpdate(item.trading_symbol);
    console.log("Supposed to register the price update listener");
  }

  unSubscribeSymbolsPriceUpdate(pageIndex: number) {
    if (this.watchListData && this.watchListData.length >= pageIndex) {
      let watchList = this.watchListData[pageIndex - 1];
      if (watchList.items) {
        watchList.items.forEach(wlItem => {
          this.instrumentPriceUpdateService.unSubscribePriceUpdate(wlItem.trading_symbol);
        });
      }
    }
  }

  subscribeSymbolsPriceUpdate(pageIndex: number) {
    this.isPriceUpdateSubscribed = true;
    if (this.watchListData && this.watchListData.length >= pageIndex) {
      let watchList = this.watchListData[pageIndex - 1];
      if (watchList.items) {
        if(this.instrumentPriceUpdateService.userId){
        this.instrumentPriceUpdateService.joinRoom(this.instrumentPriceUpdateService.userId);
        watchList.items.forEach(wlItem => {
          console.log(wlItem)
          let callback = (data: any) => {
            this.updatePriceModel(watchList, data);
          };
          this.instrumentPriceUpdateService.initPriceUpdateSubscription(wlItem.trading_symbol, [callback]);
        });
      }
    }
    }
  }

  updatePriceModel(watchLists: Watchlist, data: any) {
    watchLists.items.forEach(wlItem => {
      if(wlItem.trading_symbol === data.symbol){
        wlItem.ltp = data.ltp;
        wlItem.price = data.ltp;
        wlItem.changePercent = data.chp;
      }
    })
  }

  showActions(event: any, index: any) {
    event.preventDefault();
    this.watchItem = index;
  }

  out(index: any) {
    if (this.watchItem !== index) {
      this.watchItem = null;
    }

  }
  nextPage(index: any) {
    this.selecedIndex = index;
    this._watchlistService.setSelectedIndex(index);
    this.unSubscribeSymbolsPriceUpdate(this.pageIndex);
    this.subscribeSymbolsPriceUpdate(index);
    this.pageIndex = index;
    this._sharedService.searchDataReloadEvent.emit(index);
  }

  @HostListener('mouseleave') mouseleave(i: any) {
    if (this.watchItem !== i) {
      this.watchItem = null;
    }
  }

  buyOrders($event: any) {
    let isBrokerageActive = sessionStorage.getItem('isBrokerageActive') && sessionStorage.getItem('isBrokerageActive') === 'true';
    if (!isBrokerageActive || isBrokerageActive === undefined) {
      this.toastr.error("You are not connected to the broker. Click 'Connect Broker' to establish a connection", 'Error');
      return;
    }
    $event.transaction_type = 'BUY';
    this.createMargin($event);
    
  }

  sellOrders($event: any) {
    let isBrokerageActive = sessionStorage.getItem('isBrokerageActive') && sessionStorage.getItem('isBrokerageActive') === 'true';
    if (!isBrokerageActive || isBrokerageActive === undefined) {
      this.toastr.error("You are not connected to the broker. Click 'Connect Broker' to establish a connection", 'Error');
      return;
    }
    $event.transaction_type = 'SELL';
    this.showOrdersModal = true;
    this.orderToggle = true;
    this.createMargin($event)
  }

  deleteOrder(item: Watchlistsymbol) {
    this.loader = true;
    this._watchlistService.deleteSymbolFromWatchList(item.id).subscribe(
      response => {
        if (response) {
          this.removeItemFromWatchList(item);
          this.unsubscribeSymbol(item);
        }
        this.showMobileContextMenu = false;
        this.loader = false;
        this._sharedService.watchListCountEvent.emit(event);
        this.toastr.success('Symbol Deleted Successfully', 'Success', 
        {
          timeOut: 3000
        });
      }, error => {
        this.toastr.error(error, 'Error', {timeOut: 3000});
        this.loader = false;
      }
    )
  }

  removeItemFromWatchList(item: Watchlistsymbol) {
    const watchlist = this.watchListData.find(
      (list) => list.pageNumber === this.pageIndex
    );
    if (watchlist) {
      const itemIndexToRemove = watchlist.items.findIndex(
        (symbol) => symbol.trading_symbol == item.trading_symbol
      );
      if (itemIndexToRemove !== -1) {
        watchlist.items.splice(itemIndexToRemove, 1);
      }
    }
  }

  cancelOrders() {
    this.showOrdersModal = false;
  }

  closeSarchUI(event: any) {
    this._sharedService.outSideSidebarEvent.emit(event);
  }

  addNewItem(item: any) {
    let isItemExist = false;
    this.watchListData.map((x: any) => {
      if (x.pageNumber === this.pageIndex) {
        x.items.filter((instrument: any) => {
          if (instrument.tradingsymbol === item.tradingsymbol) {
            isItemExist = true;
            return;
          }
        });
        !isItemExist ? x.items.push(item) : ''
      }
    })
    this.loadWatchList();
    // this.registerinstrumentPriceUpdateListner();
  }

  createMargin($event: any) {
    console.log($event);
    let tradingsymbol = $event.symbol ? $event.symbol : $event.trading_symbol;

    //If segment is 11, it is OPTION. If segment is 10 , it is STOCK 
    let qty = $event.segment == 11 ? $event.lotSize : 1;

    const defaultOrderRequest = {
      orderType: "MARKET",
      productType: "MIS",
      quantity: qty,
      symbol: tradingsymbol,
      transactionType: $event.transaction_type,
      limitPrice: 0,
      stopPrice: 0,
      validity: 'DAY',
      stopLossTriggerPrice: 0,
      price: $event.price
    }

    this._omsService.getMargin(defaultOrderRequest).subscribe(response =>{
      // this.marginsSource = response;
      this.marginsSource.margin = response.margin;
      this.marginsSource.charges = response.charges;
      this.marginsSource.availableMargin = response.availableMargin;
      this.showOrdersModal = true;
      this.orderToggle = true;
      if ($event.transaction_type === 'BUY') {
          this.orderToggle = false;
        }
      this.showMobileContextMenu = false;
      this.loader = false;
    }, error =>{
      // this.toastr.error(error.error, "Error", {timeOut: 3000});
      this.loader = false;
      this.showMobileContextMenu = false;
    });

    // this.showOrdersModal = true;
    this.marginsSource = $event;
    this.marginsSource.product = "MIS";
    this.marginsSource.order_type = "MARKET";
    this.marginsSource.quantity = qty;
    this.marginsSource.variety= "regular";
    this.marginsSource.trigger_price= $event.price;
    // this.orderToggle = true;
    // if ($event.transaction_type === 'BUY') {
    //   this.orderToggle = false;
    // }

    this.marginsSource.type = $event.transaction_type;
    this.marginsSource.instrument = {'symbol':tradingsymbol, 'symbolId':$event.token ? $event.token : $event.instrument_token, 'exchange':'', actualSymbol:'', expiryDate: ''};
    this.marginsSource.price = $event.price;
    this.marginsSource.expiry = $event.expiryDate ? $event.expiryDate : $event.expiry;
    //If segment is 11, it is OPTION. If segment is 10 , it is STOCK 
    this.marginsSource.tradeType = $event.segment == 11 ? 'OPTION' : 'STOCK';
    this.marginsSource.previousDayClose = $event.previousDayClose;
    this.marginsSource.todayLow = $event.todayLow;
    this.marginsSource.todayHigh = $event.todayHigh;
    this.marginsSource.volume = $event.volume;
    return this.marginsSource;
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

  openMobileActions(symbol: any) {
    this.showMobileContextMenu = true;
    this.selectedSymbol = symbol;
  }

  closeMobileContextMenu(event: any) {
    let elClass = event.target.className;
    console.log('className', event.target.className);
    if (elClass === 'mobile-context-menu' || elClass === 'mobile-context-menu ng-star-inserted') {
      this.showMobileContextMenu = false;
    }
  }

  modifyOrder(orderId : string) {
    // this.loader = true;
    this.showOrdersModal = true;
    this._omsService.getEditOrderDetail(orderId).subscribe(response =>{
      if(response){
        const marginRequest = {
          orderType: response.order_type,
          productType: response.product,
          quantity: response.qty,
          symbol: response.instrument.actualSymbol,
          transactionType: response.type,
          limitPrice: response.price,
          stopPrice: response.trigger_price,
          validity: 'DAY',
          stopLossTriggerPrice: 0
        }

        this._omsService.getMargin(marginRequest).subscribe(resp =>{
          // this.marginsSource = response;
          this.marginsSource.margin = resp.margin;
          this.marginsSource.charges = resp.charges;
          this.marginsSource.availableMargin = resp.availableMargin;
          this.marginsSource.orderId = orderId;
          this.showOrdersModal = true;
          this.orderToggle = true;
          if (response.type === 'BUY') {
              this.orderToggle = false;
            }
          this.showMobileContextMenu = false;
          this.loader = false;
        }, error =>{
          // this.toastr.error(error.error, "Error", {timeOut: 3000});
          this.loader = false;
        });
        // this.marginsSource = response;
    this.marginsSource.product = response.product;
    this.marginsSource.order_type = response.order_type;
    this.marginsSource.quantity = response.qty;
    this.marginsSource.variety= "regular";
    this.marginsSource.trigger_price= response.trigger_price;
    // this.orderToggle = true;
    // if ($event.transaction_type === 'BUY') {
    //   this.orderToggle = false;
    // }

    this.marginsSource.type = response.type;
    this.marginsSource.instrument = {'symbol':response.instrument.actualSymbol, 'symbolId':response.instrument.symbolId, 'exchange':response.instrument.exchange, 'actualSymbol':response.instrument.actualSymbol, expiryDate:response.instrument.expiryDate};
    this.marginsSource.price = response.price;
    this.marginsSource.expiry = response.instrument.expiryDate;
    this.marginsSource.tradeType = response.tradeType;

    this.marginsSource.previousDayClose = response.previousDayClose;
    this.marginsSource.todayLow = response.todayLow;
    this.marginsSource.todayHigh = response.todayHigh;
    this.marginsSource.volume = response.volume;

    //$event.instrumenType == 14 ? 'OPTION' : 'STOCK';
      }
    }, error =>{
      // this.toastr.error(error.error, "Error", {timeOut: 3000});
      this.loader = false;
    });
  }

  drop(event: CdkDragDrop<unknown>) {
    let watchList = this.watchListData[this.pageIndex - 1].items;
    const fromIndex = event.previousIndex; 
    const toIndex = event.currentIndex;
    const element = watchList.splice(fromIndex, 1)[0];
    this.watchListData[this.pageIndex - 1].items.splice(toIndex, 0, element);
  }

  entered(event:any)  {
    event.stopPropagation();
  }
   sortPredicate(index: number, item: CdkDrag<number>) {
    this.showActions(item, 0);
    return;
  }

  isNiftyStock(item:any) {
    return this.niftyList.includes(item.tradingsymbol);
  }

  showTradingViewChart(item){
    this._sharedService.clickChartIconEvent.emit(item);
  }

}
