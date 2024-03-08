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

  sampleData:any =[
    {
       "id":1,
       "name":"1",
       "items":[
          {
             "id":"NSE:INE033L07GN7",
             "weight":0,
             "tradingsymbol":"TATACAPHSG-N3",
             "instrument_token":4297985,
             "segment":"NSE",
             "exchange":"NSE",
             "expiry":"",
             "sequence":"",
             "priceModel":"",
             "symbol_id":""
          },
          {
             "id":"NSE:INE033L07GO5",
             "weight":1,
             "tradingsymbol":"TATACAPHSG-N4",
             "instrument_token":4298497,
             "segment":"NSE",
             "exchange":"NSE",
             "expiry":"",
             "sequence":"",
             "priceModel":"",
             "symbol_id":""
          },
          {
             "id":"BSE:INE029H01016",
             "weight":2,
             "tradingsymbol":"SUJALA",
             "instrument_token":138013956,
             "segment":"BSE",
             "exchange":"BSE",
             "expiry":"",
             "sequence":"",
             "priceModel":"",
             "symbol_id":""
          },
          {
             "id":"NSE:INE560A01015",
             "weight":3,
             "tradingsymbol":"INDIAGLYCO",
             "instrument_token":389377,
             "segment":"NSE",
             "exchange":"NSE",
             "expiry":"",
             "sequence":"",
             "priceModel":"",
             "symbol_id":""
          },
          {
             "id":"NSE:INE0N5H01017",
             "weight":4,
             "tradingsymbol":"JIWANRAM-SM",
             "instrument_token":4750849,
             "segment":"NSE",
             "exchange":"NSE",
             "expiry":"",
             "sequence":"",
             "priceModel":"",
             "symbol_id":""
          },
          {
             "id":"NSE:INE399K01017",
             "weight":5,
             "tradingsymbol":"RTNPOWER-BE",
             "instrument_token":4486145,
             "segment":"NSE",
             "exchange":"NSE",
             "expiry":"",
             "sequence":"",
             "priceModel":"",
             "symbol_id":""
          },
          {
             "id":"NSE:256265",
             "weight":6,
             "tradingsymbol":"NIFTY 50",
             "instrument_token":256265,
             "segment":"INDICES",
             "exchange":"NSE",
             "expiry":"",
             "sequence":"",
             "priceModel":"",
             "symbol_id":""
          },
          {
            "id": "NSE:INE423Y01016",
            "weight": 8,
            "tradingsymbol": "SBFC",
            "instrument_token": 4614657,
            "segment": "NSE",
            "exchange": "NSE",
            "expiry":"",
             "sequence":"",
             "priceModel":"",
             "symbol_id":""
        },
        {
            "id": "BSE:50950916",
            "weight": 9,
            "tradingsymbol": "SBIGETSINAV",
            "instrument_token": 50950916,
            "segment": "BSE",
            "exchange": "BSE",
            "expiry":"",
             "sequence":"",
             "priceModel":"",
             "symbol_id":""
        },
        {
            "id": "NSE:INE850D01014",
            "weight": 10,
            "tradingsymbol": "GODREJAGRO",
            "instrument_token": 36865,
            "segment": "NSE",
            "exchange": "NSE",
            "expiry":"",
             "sequence":"",
             "priceModel":"",
             "symbol_id":""
        },
        {
            "id": "NSE:INE769A01020",
            "weight": 11,
            "tradingsymbol": "AARTIIND",
            "instrument_token": 1793,
            "segment": "NSE",
            "exchange": "NSE",
            "expiry":"",
             "sequence":"",
             "priceModel":"",
             "symbol_id":""
        },
        {
            "id": "NSE:INE423A01024",
            "weight": 12,
            "tradingsymbol": "ADANIENT",
            "instrument_token": 6401,
            "segment": "NSE",
            "exchange": "NSE",
            "expiry":"",
             "sequence":"",
             "priceModel":"",
             "symbol_id":""
        },
        {
            "id": "NSE:INE932X01018",
            "weight": 13,
            "tradingsymbol": "SHAREINDIA",
            "instrument_token": 26625,
            "segment": "NSE",
            "exchange": "NSE",
            "expiry":"",
            "sequence":"",
            "priceModel":"",
            "symbol_id":""
        },
        {
            "id": "NSE:INE610C01014",
            "weight": 14,
            "tradingsymbol": "ARENTERP",
            "instrument_token": 46337,
            "segment": "NSE",
            "exchange": "NSE",
            "expiry":"",
             "sequence":"",
             "priceModel":"",
             "symbol_id":""
        },
        {
            "id": "NSE:INE822C01015",
            "weight": 15,
            "tradingsymbol": "TCPLPACK",
            "instrument_token": 47105,
            "segment": "NSE",
            "exchange": "NSE",
            "expiry":"",
             "sequence":"",
             "priceModel":"",
             "symbol_id":""
        },
        {
            "id": "NSE:INE034A01011",
            "weight": 16,
            "tradingsymbol": "ARVIND",
            "instrument_token": 49409,
            "segment": "NSE",
            "exchange": "NSE",
            "expiry":"",
             "sequence":"",
             "priceModel":"",
             "symbol_id":""
        },
        {
            "id": "NSE:INE440A01010",
            "weight": 17,
            "tradingsymbol": "ASHIMASYN",
            "instrument_token": 52737,
            "segment": "NSE",
            "exchange": "NSE",
            "expiry":"",
             "sequence":"",
             "priceModel":"",
             "symbol_id":""
        }
       ],
       "pageNumber":1
    },
    {
       "id":2,
       "name":"2",
       "items":[
          {
             "id":"BSE:INE742F01042",
             "weight":0,
             "tradingsymbol":"ADANIPORTS",
             "instrument_token":136427780,
             "segment":"BSE",
             "exchange":"BSE",
             "expiry":"",
             "sequence":"",
             "priceModel":"",
             "symbol_id":""
          }
       ],
       "pageNumber":2
    },
    {
       "id":3,
       "name":"3",
       "items":[
          {
             "id":"NSE:INE012A01025",
             "weight":0,
             "tradingsymbol":"ACC",
             "instrument_token":5633,
             "segment":"NSE",
             "exchange":"NSE",
             "expiry":"",
             "sequence":"",
             "priceModel":"",
             "symbol_id":""
          }
       ],
       "pageNumber":3
    }
    
 ]

  constructor(
    private renderer: Renderer2,
    private _sharedService: SharedService,
    private _watchlistService: WatchlistService,
    // private quoteUpdateService: QuoteUpdateStompService,
    private _omsService: OmsService,
    private toastr: ToastrService,
  ) {
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
        console.log(orderData);
        this.modifyOrder(orderData.order_id);
      }
    );
    _sharedService.loaderEvent.subscribe(
      (res) => {
        this.loader = res;
      }
    );
  }


  ngOnInit() {
    this.watchListData = this.sampleData;
    this.checkDevice();
    this.loadWatchList();

    setTimeout(()=>{
      this.loader = false;
    }, 3000);
  }

  loadWatchList() {
    // this.loader = true;
    
    /*
    this._watchlistService.getWatchListItems().subscribe(
      response => {
        if (response) {
          this.watchListData = response.watch_lists;
          this._sharedService.watchListReloadEvent.emit(this.watchListData);
          this.subscribeSymbolsPriceUpdate(this.pageIndex);
        }
        this.loader = false;
      }, error => {
        this.toastr.error(error, 'Error', {timeOut: 3000, positionClass: 'toast-bottom-right'});
        this.loader = false;
        console.log(error);
      }
    );*/
  }

  unSubscribeSymbolsPriceUpdate(pageIndex: number) {
    if (this.watchListData && this.watchListData.length >= pageIndex) {
      let watchList = this.watchListData[pageIndex - 1];
      if (watchList.items) {
        watchList.items.forEach(wlItem => {
          // this.quoteUpdateService.unSubscribePriceUpdate(wlItem.symbol_id);
        });
      }
    }
  }

  subscribeSymbolsPriceUpdate(pageIndex: number) {
    if (this.watchListData && this.watchListData.length >= pageIndex) {
      let watchList = this.watchListData[pageIndex - 1];
      if (watchList.items) {
        watchList.items.forEach(wlItem => {
          console.log(wlItem)
          let callback = (data: any) => {
            this.updatePriceModel(wlItem, data);
          };
          // this.quoteUpdateService.subscribePriceUpdate(wlItem.symbol_id, callback);
        });
      }
    }
  }

  updatePriceModel(symbol: Watchlistsymbol, data: any) {
    if (!symbol.priceModel && data && data.body) {
      // symbol.priceModel = new PriceUpdateModel();
    }
    if (data && data.body) {
      let jsonResult = JSON.parse(data.body);
      if (jsonResult.price) {
        symbol.priceModel.price = jsonResult.price;
        symbol.priceModel.close = jsonResult.previousDayClose;
        symbol.priceModel.updateChangeProps();
      }
    }
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
    $event.transaction_type = 'BUY';
    this.createMargin($event);
    
  }

  sellOrders($event: any) {
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
          // this._sharedService.watchListCountEvent.emit();
        }
        this.showMobileContextMenu = false;
        this.loader = false;
        this.toastr.success('Order deleted successfully', 'Success', 
        {
          timeOut: 3000, 
          positionClass: 'toast-bottom-right',
        });
      }, error => {
        this.toastr.error(error, 'Error', {timeOut: 3000, positionClass: 'toast-bottom-right'});
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
        (symbol) => symbol.id === item.id
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
  }

  createMargin($event: any) {
    // this.loader = true;
    console.log($event);
    let tradingsymbol = $event.tradingsymbol ? $event.tradingsymbol : $event.code;
    const defaultOrderRequest = {
      exchange: "NSE",
      order_type: "MARKET",
      product: "MIS",
      quantity: 1,
      tradingsymbol: tradingsymbol,
      transaction_type: $event.transaction_type,
      variety: "regular"
    }
    this.showOrdersModal = true;
    /*this._omsService.getMargin(defaultOrderRequest).subscribe(response =>{
      this.marginsSource = response;
      this.showOrdersModal = true;
      this.orderToggle = true;
      if (response.transaction_type === 'BUY') {
        this.orderToggle = false;
      }
      this.showMobileContextMenu = false;
      this.loader = false;
    }, error =>{
      this.toastr.error(error.error, "Error", {timeOut: 3000, positionClass: 'toast-bottom-right'});
      this.loader = false;
    });*/
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
    this.loader = true;
    this._omsService.getEditOrderDetail(orderId).subscribe(response =>{
      if(response){
        this.marginsSource = response;
        console.log(this.marginsSource);
        this.showOrdersModal = true;
        this.orderToggle = true;
        if (response.transaction_type === 'BUY') {
          this.orderToggle = false;
        }
        this.loader = false;
      }
    }, error =>{
      this.toastr.error(error.error, "Error", {timeOut: 3000, positionClass: 'toast-bottom-right'});
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


}
