import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient) {
  }

  outSideSidebarEvent: EventEmitter<any> = new EventEmitter();
  addItemEvent: EventEmitter<any> = new EventEmitter();
  transactionsEvent: EventEmitter<any> = new EventEmitter();
  searchDataReloadEvent: EventEmitter<any> = new EventEmitter();
  orderToggleStatus: EventEmitter<any> = new EventEmitter();
  outMobileContextEvent: EventEmitter<any> = new EventEmitter();
  watchListReloadEvent: EventEmitter<any> = new EventEmitter();
  orderModifyEvent: EventEmitter<any> = new EventEmitter();
  ordersReloadEvent: EventEmitter<boolean> = new EventEmitter();
  watchListCountEvent: EventEmitter<any> = new EventEmitter();

  pagiNationEvent: EventEmitter<any> = new EventEmitter();
  loaderEvent: EventEmitter<any> = new EventEmitter();
  sessionActiveEvent: EventEmitter<any> = new EventEmitter();
  connectBrokerageEvent: EventEmitter<any> = new EventEmitter();
  clickChartIconEvent: EventEmitter<any> = new EventEmitter();
}
