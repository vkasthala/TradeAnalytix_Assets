import { Component, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { SymbolSearchModel } from './models/symbol-search-model';
import { SymbolSearchService } from './services/symbol-search.service';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/modules/shared/services/shared.service';
import { WatchlistService } from 'src/app/modules/shared/services/watchlist.service';
import { WatchListRequest } from 'src/app/modules/shared/models/watchlist.model';
import { Margins } from 'src/app/modules/shared/models/margins.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input("pageIndex") pageIndex!: number;
  @Input("watchListData") watchListData: any;
  @Input("isMobileDevice") isMobileDevice: any;

  orderToggle: boolean = false;
  marginsSource: Margins = new Margins();
  showOrdersModal: boolean | undefined;
  searchListIndex: any = null;

  searchResult: SymbolSearchModel[] = [];
  currentWatchListSize: number = 0;
  showMobileContextMenu: boolean = false;
  selectedSymbol: any;

  searchData:SymbolSearchModel[] = [];

  niftyList = ['NIFTY 50','NIFTY NEXT 50','NIFTY 100','NIFTY 200','NIFTY 500','NIFTY MIDCAP 50','NIFTY MIDCAP 100','NIFTY SMALLCAP 100','INDIA VIX','NIFTY MIDCAP 150','NIFTY SMALLCAP 50','NIFTY SMALLCAP 250','NIFTY MIDSMALLCAP 400','NIFTY500 MULTICAP 50:25:25','NIFTY LARGEMIDCAP 250','NIFTY MIDCAP SELECT','NIFTY TOTAL MARKET','NIFTY MICROCAP 250','NIFTY BANK','NIFTY AUTO','NIFTY FINANCIAL SERVICES','NIFTY FINANCIAL SERVICES 25/50','NIFTY FMCG','NIFTY IT','NIFTY MEDIA','NIFTY METAL','NIFTY PHARMA','NIFTY PSU BANK','NIFTY PRIVATE BANK','NIFTY REALTY','NIFTY HEALTHCARE INDEX',  'NIFTY CONSUMER DURABLES','NIFTY OIL & GAS'];

  constructor(
    private renderer: Renderer2,
    private _sharedService: SharedService,
    private _watchListService: WatchlistService,
    private _symbolSearchService: SymbolSearchService,
    private toastr: ToastrService
  ) {
    _sharedService.outSideSidebarEvent.subscribe(
      (res) => {
        if (res && this.searchResult.length > 0) {
          this.searchResult = [];
          (document.getElementById('search-box') as HTMLInputElement).value = '';
          console.log('res', res)
        }
      }
    );

    _sharedService.searchDataReloadEvent.subscribe(
      (res) => {
        this.compareData(res);
        this.currentWatchListSize = this.watchListData[res - 1].items.length;
      });

    _sharedService.watchListReloadEvent.subscribe((res) => {
      this.watchListData = res;
      this.currentWatchListSize = this.watchListData[this.pageIndex - 1].items.length;
    });
    _sharedService.watchListCountEvent.subscribe((res) => {
      this.currentWatchListSize = this.watchListData[this.pageIndex - 1].items.length;
    });
  }

  ngOnInit() {
  }

  search(term: string): void {
    this._symbolSearchService.searchSymbols(term).subscribe(result => {
      this.searchResult = result;
      this.compareData(this.pageIndex)
    });
  }

  showSearchActions(event: any, index: any) {
    event.preventDefault();
    this.searchListIndex = index;
  }

  @HostListener('mouseleave') mouseleave(i: any) {
    if (this.searchListIndex !== i) {
      this.searchListIndex = null;
    }
  }

  fadeOutActions(index: any) {
    if (this.searchListIndex !== index) {
      this.searchListIndex = null;
    }
  }

  buyOrders($event: any) {
    $event.transaction_type = 'BUY';
    this._sharedService.transactionsEvent.emit($event);
    this.searchResult = [];
    (document.getElementById('search-box') as HTMLInputElement).value = '';
    this.showMobileContextMenu = false;
  }

  sellOrders($event: any) {
    $event.transaction_type = 'SELL';
    this._sharedService.transactionsEvent.emit($event);
    this.searchResult = [];
    (document.getElementById('search-box') as HTMLInputElement).value = '';
    this.showMobileContextMenu = false;
  }

  cancelOrders() {
    this.showOrdersModal = false;
  }

  addToWatchList(item: SymbolSearchModel) {
    console.log("Added to watchlist");
    if (!item || !item.symbolId) {
      return;
    }
    if (!this.isMobileDevice) {
      const request: WatchListRequest = {
        symbolId: item.symbolId ? item.symbolId : 0,
        pageNumber: this._watchListService.getSelectedIndex()
      };
      this._watchListService.addSymbolToWatchList(request).subscribe(
        response => {
          console.log(response);
          this._sharedService.addItemEvent.emit(item);
        }, error => {
          console.log(error);
        }
      );
      this.searchResult = [];
      (document.getElementById('search-box') as HTMLInputElement).value = '';
    } else {
      this.openMobileActions(item);
    }
  }

  addNewItem(item: SymbolSearchModel) {
    console.log(item);
    if (!item || !item.symbol) {
      return;
    }
    const request: WatchListRequest = {
      symbolId: item.id,
      pageNumber: this._watchListService.getSelectedIndex()
    };
    this._watchListService.addSymbolToWatchList(request).subscribe(
      response => {
        if (response) {
          this._sharedService.addItemEvent.emit(item);
        }
      }, error => {
        this.toastr.error(error.message, "Error");
        console.log(error);
      }
    );
    setTimeout(() => {
      this.compareData(this.pageIndex);
    }, 100);

    if (this.isMobileDevice) {
      this.searchResult = [];
      (document.getElementById('search-box') as HTMLInputElement).value = '';
    }
  }

  closePanel() {
    this.searchResult = [];
    (document.getElementById('search-box') as HTMLInputElement).value = '';
  }

  compareData(index: any) {
    console.log(this.searchResult);
    let wlItems = this.watchListData[index - 1].items;
    this.searchResult.forEach(searchItem => {
      wlItems.forEach((wlItem: { tradingsymbol: string | undefined; }) => {
        if (searchItem.symbol === wlItem.tradingsymbol) {
          searchItem.addedToWatchList = true;
          this.currentWatchListSize = this.watchListData[this.pageIndex].items.length;
        }
      })
    })
  }

  openMobileActions(symbol: any) {
    this.showMobileContextMenu = true;
    this.selectedSymbol = symbol;
  }

  closeMobileContextMenu(event: any) {
    let elClass = event.target.className;
    if (elClass === 'mobile-context-menu search-mobile-menu' || elClass === 'mobile-context-menu search-mobile-menu ng-star-inserted') {
      this.showMobileContextMenu = false;
    }
  }

  isNiftyStock(item:any) {
    return this.niftyList.includes(item.code);
  }
}
