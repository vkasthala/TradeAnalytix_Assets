import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MarginResponse, OrderPurchasehistory, OrderPurchasehistoryResponse, OrderRuleCheckRequest, OrderRuleDto, OrderRuleResponse, OrdersRequest, OrdersResponse, PlaceOrderRequest, PurchaseOrderResponse } from '../models/orders.model';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { TodayExecutedTrade } from '../../trade-plan/models/today-executed-trade.model';

@Injectable({
  providedIn: 'root'
})
export class OmsService {

  constructor(private http: HttpClient,
    private httpService: HttpService) { }

  private createHttpHeaders(): HttpHeaders {
    let httpHeaders: HttpHeaders = new HttpHeaders({
      Brokerage: 'FYERS',
      Authorization: 'Bearer ' + sessionStorage.getItem('token')
    });
    return httpHeaders;
  }

  getMargin(orderRequest: PlaceOrderRequest) : Observable<MarginResponse>{
    const url = environment.tradingServiceUri + "/orders/margins";
     return this.http.post<MarginResponse>(url, orderRequest, { headers: this.createHttpHeaders() });
  }

  placeOrder(orderRequest: PlaceOrderRequest) : Observable<PurchaseOrderResponse>{
    console.log(orderRequest);
    const url = environment.tradingServiceUri + "/orders/place";
    return this.http.post<PurchaseOrderResponse>(url, orderRequest, { headers: this.createHttpHeaders() });
  }

  subscribeToOrderUpdates(): Observable<String>{
    const url = environment.tradingServiceUri + "/orders/subscribe-order-updates";
    return this.http.post<String>(url, null, { headers: this.createHttpHeaders() });
  }

  unsubscribeOrderUpdates(brokerage: string): Observable<String>{
    let httpHeaders: HttpHeaders = this.createHttpHeaders();
    httpHeaders.set("Brokerage", brokerage);
    const url = environment.tradingServiceUri + "/orders/unsubscribe-order-updates";
    return this.http.post<String>(url, null, { headers:  httpHeaders});
  }

  getTodayExecutedTrades(day: string): Observable<TodayExecutedTrade[]> {
    const url = environment.tradingServiceUri + "/orders/executedTrades?day=";
    return this.http.get<TodayExecutedTrade[]>(url+day, { headers: this.createHttpHeaders() });
  }
  
  // getOpenOrders() : Observable<OrderPurchasehistoryResponse>{
  //   //TODO : make it dynamic if needed.
  //   const OPEN_ORDER_STATES = ['OPEN', 'IN_PROGRESS'];
  //   let data = {page_no: "0", page_size: 50, status_list: OPEN_ORDER_STATES.join(',')};
  //   return this.getOrders(data);
  // }

  // getExecutedOrders() : Observable<OrderPurchasehistoryResponse>{
  //   //TODO : make it dynamic if needed.
  //   const EXECUTED_ORDER_STATES = ['CANCELLED', 'COMPLETE', 'REJECTED', 'FAILED'];
  //   let data = {page_no: "0", page_size: 50, status_list: EXECUTED_ORDER_STATES.join(',')};
  //   return this.getOrders(data);
  // }

  getOrders() : Observable<OrderPurchasehistoryResponse> {
    const url = environment.tradingServiceUri + "/orders";
    return this.http.get<OrderPurchasehistoryResponse>(url, { headers: this.createHttpHeaders() });
  }

  getEditOrderDetail(orderId: string) : Observable<OrderPurchasehistory>{
    const url = environment.tradingServiceUri + "/orders/" + orderId;
    return this.http.get<OrderPurchasehistory>(url, { headers: this.createHttpHeaders() });
  }

  modifyOrder(orderId: string, orderRequest: PlaceOrderRequest) : Observable<String> {
    const url = environment.tradingServiceUri + "/orders/" + orderId;
    return this.http.put<String>(url, orderRequest, { headers: this.createHttpHeaders() });
  }

  cancelOrder(orderId: string) : Observable<String> {
    const url = environment.tradingServiceUri + "/orders/" + orderId;
    return this.http.delete<String>(url, { headers: this.createHttpHeaders() });
  }

  checkRules(data: OrderRuleCheckRequest) : Observable<OrderRuleDto> {
    const url = environment.apiUrl + "/order/coded-rule-check";
    return this.httpService.post<OrderRuleCheckRequest,OrderRuleDto>(url,data);
  }

  saveRules(orderRules: OrderRuleDto, orderId: string) :  Observable<string> {
    const url = environment.apiUrl + "/order/save-coded-rule/"+orderId;
    return this.httpService.post<OrderRuleDto,string>(url,orderRules);
  }

  deleteOrderRules(orderId: string) : Observable<string> {
    const url = environment.apiUrl + "/order/delete-coded-rule/"+orderId;
    return this.httpService.delete<string,string>(url);
  }

  updateRules(orderRules: OrderRuleDto, orderId: string) :  Observable<any> {
    const url = environment.apiUrl + "/order/update-coded-rule/"+orderId;
    return this.httpService.put<OrderRuleDto,string>(url,orderRules);
  }

  getExistingRules(orderId: string, data: OrderRuleCheckRequest) : Observable<OrderRuleDto>{
    const url = environment.apiUrl + "/order/coded-rule/"+orderId;
    return this.httpService.post<OrderRuleCheckRequest,OrderRuleDto>(url,data);
  }

  updateRulesForStrategy(orderRules: OrderRuleDto, orderId: string) :  Observable<any> {
    const url = environment.apiUrl + "/order/update-strategy/"+orderId;
    return this.httpService.put<OrderRuleDto,string>(url,orderRules);
  }
}
