import { Component, HostListener, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Margins } from 'src/app/modules/shared/models/margins.model';
import { Holding, HoldingResponse } from 'src/app/modules/shared/models/portfolio.model';
import { HoldingService } from 'src/app/modules/shared/services/holding.service';
import { OmsService } from 'src/app/modules/shared/services/oms.service';
import { SharedService } from 'src/app/modules/shared/services/shared.service';

import { environment } from 'src/environments/environment';
import { PriceUpdateWebsocketService } from '../shared/services/websocket/price-update-websocket.service';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-holdings',
  templateUrl: './holdings.component.html',
  styleUrls: ['./holdings.component.scss']
})
export class HoldingsComponent implements OnInit {
  isMobileDevice: any;
  rowId:any=null;
  showMobileContextMenu: boolean = false;
  orderToggle: boolean = true;
  marginsSource: Margins = new Margins();
  showOrdersModal: boolean | undefined;
  isHoldingOrder:any;
  mobileRowData: any;

  holdingsResponse: HoldingResponse = {
    data:{
    data: [],
    total_p_and_l: 0
    }
  }
  holdingsCount: number = 0;
  environment = environment;

  constructor(private _holdingService: HoldingService,
    private _omsService: OmsService,
    private _sharedService: SharedService,
    private toastr: ToastrService,
    private instrumentPriceUpdateService: PriceUpdateWebsocketService,
    private router: Router
    ) {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
          this.instrumentPriceUpdateService.disconnectUser();
        }
      });
     }

  ngOnInit() {
    this.instrumentPriceUpdateService.establishConnection();
    this.checkDevice();
    this.loadHoldingData();
    // this.postionsWSService.unsubscribeAll();
    // this.ordersWebsocketService.unsubscribeAll();
  }

  loadHoldingData() {
    this._holdingService.getHoldings().subscribe(response=>{
      if(response){
        this.holdingsResponse.data = response.data;
        this.holdingsResponse.data.total_p_and_l = response.data.total_p_and_l;
        this.holdingsCount = this.holdingsResponse.data.data!.length;
        this.subscribeSymbolsPriceUpdate();
        console.log(this.holdingsResponse);
      }
    }, error => {
      console.log(error);
    })
  }

  subscribeSymbolsPriceUpdate() {
    if (this.holdingsResponse.data && this.holdingsResponse.data.data.length > 0) {
      this.instrumentPriceUpdateService.joinRoom(this.instrumentPriceUpdateService.userId);
      this.holdingsResponse.data.data.forEach(holding => {
          let callback = (data: any) => {
            this.updateChangeProps(this.holdingsResponse.data.data, data);
          };
          this.instrumentPriceUpdateService.initPriceUpdateSubscription(holding.instrument.symbol, [callback]);
          // this.quoteUpdateService.subscribePriceUpdate(holding.instrument.symbolId, callback);
        });
    }
  }

  updateChangeProps(holdings: Holding[], data: any) {
    holdings.forEach(holding => {
      if(holding.instrument.symbol === data.symbol){
                /**
         * Day change calculation
         */
        // let day_change = parseFloat((jsonResult.price - holding.ltp).toFixed(3));
        // holding.day_change = parseFloat(((day_change / holding.ltp) * 100).toFixed(2));

        /**
         * LTP update
         */
        holding.ltp = data.ltp;

        /**
         * P&L calculation
         */
        if(holding.action_type == 'BUY'){
          holding.p_and_l = (holding.ltp - holding.average)*holding.quantity;
        } else{
          holding.p_and_l = (holding.average - holding.ltp)*holding.quantity;
        }

        /**
         * Net change calculation
         */
        let net_change = parseFloat((holding.ltp - data.previousDayClose).toFixed(3));
        holding.net_change = parseFloat(((net_change / data.previousDayClose) * 100).toFixed(2));
      }
    })
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

  adminCreateHolding(){
    this._holdingService.adminCreateHoldings().subscribe(response=>{
      if(response){
        console.log(response);
      }
    }, error => {
      console.log(error);
    })
  }

  exit(rowData:any) {
    let payload = this.generatePayload(rowData);
    payload.transaction_type = rowData.quantity > 0 ? "SELL" : "BUY";
    this.orderToggle = false;
    if(rowData.action_type === "SELL") {
      this.orderToggle = false;
      payload.transaction_type = "BUY";
    } else {
      this.orderToggle = true;
      payload.quantity = Math.abs(rowData.quantity);
    }
    this.createMargin(payload)
  }
  
  add(rowData:any) {
    let payload = this.generatePayload(rowData)
    payload.transaction_type = rowData.quantity > 0 ? "BUY" : "SELL";
    this.orderToggle = true;
    if(rowData.action_type === "SELL") {
      this.orderToggle = true;
      payload.transaction_type = "SELL";
    }else {
      this.orderToggle = false;
      payload.quantity = Math.abs(rowData.quantity);
    }
    this.createMargin(payload)
  }
  
    generatePayload(rowData:any) {
      return {
        exchange:"NSE",
        order_type:"MARKET",
        product:rowData.type,
        quantity:rowData.quantity,
        tradingsymbol:rowData.instrument.symbol,
        transaction_type:'',
        variety:"regular"
      }
    }
  
  
    showPositionsActions(event: any, index: any) {
      // event.preventDefault();
      this.rowId = index;
    }
  
    hidePositionsActions(index: any) {
      if (this.rowId !== index) {
        this.rowId = null;
      }
    }

    createMargin(payload:any) {
      this._sharedService.loaderEvent.emit(true);
      this._omsService.getMargin(payload).subscribe(response =>{
        this.marginsSource.margin = response.margin;
        this.marginsSource.charges = response.charges;
        this.marginsSource.availableMargin = response.availableMargin;
        this.showOrdersModal = true;
        this.isHoldingOrder = true;
        this.showMobileContextMenu = false;
        this._sharedService.loaderEvent.emit(false);
      }, error =>{
        this.toastr.error(error.error, "Error", {timeOut: 3000});
        this._sharedService.loaderEvent.emit(false);
      });
      return this.marginsSource;
    }
  
    closeModal() {
      this.showOrdersModal = false;
    }

    openMobileActions(rowData: any) {
      this.showMobileContextMenu = true;
      this.mobileRowData = rowData;
    }

    closeMobileContextMenu(event: any) {
      let elClass = event.target.className;
      if (elClass === 'mobile-context-menu search-mobile-menu' || elClass === 'mobile-context-menu search-mobile-menu ng-star-inserted') {
        this.showMobileContextMenu = false;
      }
    }

}
