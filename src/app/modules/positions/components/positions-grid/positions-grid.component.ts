import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PositionsComponent } from '../../positions.component';
import { Margins } from 'src/app/modules/shared/models/margins.model';
import { SharedService } from 'src/app/modules/shared/services/shared.service';
import { OmsService } from 'src/app/modules/shared/services/oms.service';
import { UserService } from 'src/app/modules/shared/services/user.service';
import { PositionsWebsocketService } from 'src/app/modules/shared/services/websocket/positions-websocket.service';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-positions-grid',
  templateUrl: './positions-grid.component.html',
  styleUrls: ['./positions-grid.component.scss']
})
export class PositionsGridComponent implements OnInit {
  isMobileDevice: any;
  rowId:any=null;
  
  @Input() positionsData:any;

  showMobileContextMenu: boolean = false;

  orderToggle: boolean = true;
  marginsSource: Margins = new Margins();
  showOrdersModal: boolean | undefined;
  mobileRowData: any;
  isPositionsOrder:any;
  userId: number = undefined;

  constructor(
    private _omsService: OmsService,
    private _sharedService: SharedService,
    private toastr: ToastrService,
    private _userService: UserService,
    private positionsComponent: PositionsComponent,
    private postionsWSService: PositionsWebsocketService,
    private router: Router,
    private userService: UserService
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // Fire your event or perform any action here
        this.postionsWSService.unsubscribeAll();
      }
    });
   }

  ngOnInit(): void {
    this.checkDevice();
    this.loadUserDetails();
  }

  loadUserDetails() {
    this.userService.getUserDetails().subscribe(details => {
      if (details && details.userId) {
        this.userId = details.userId;
        this.subscribePositionUpdate(this.userId+'');
      }
    });
  }

  subscribePositionUpdate(userId: string) {
    let callback = (data: any) => {
      this.positionsComponent.updateChangeProps(data);
    };
    this.postionsWSService.subscribePositionsUpdate(userId, callback);
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
  // this.createMargin(payload)
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
  // this.createMargin(payload)
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

  // createMargin(payload:any) {
  //   this._sharedService.loaderEvent.emit(true);
  //   this._omsService.getMargin(payload).subscribe(response =>{
  //     this.marginsSource = response;
  //     this.showOrdersModal = true;
  //     this.isPositionsOrder = true;
  //     this.showMobileContextMenu = false;
  //     this._sharedService.loaderEvent.emit(false);
  //   }, error =>{
  //     this.toastr.error(error.error, "Error", {timeOut: 3000});
  //     this._sharedService.loaderEvent.emit(false);
  //   });
  //   return this.marginsSource;
  // }

  closeModal() {
    this.showOrdersModal = false;
  }

}
