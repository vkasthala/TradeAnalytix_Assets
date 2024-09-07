import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MarginResponse, OrderPurchasehistory, OrderPurchasehistoryResponse, OrderRuleCheckRequest, OrderRuleResponse, OrdersRequest, OrdersResponse, PlaceOrderRequest, PurchaseOrderResponse } from '../models/orders.model';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

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
     return this.http.post<MarginResponse>(url, orderRequest, {  });
  }

  placeOrder(orderRequest: PlaceOrderRequest) : Observable<PurchaseOrderResponse>{
    console.log(orderRequest);
    const url = environment.tradingServiceUri + "/orders/place";
    return this.http.post<PurchaseOrderResponse>(url, orderRequest, { headers: this.createHttpHeaders() });
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

  checkRules(data: OrderRuleCheckRequest) : Observable<OrderRuleResponse[]> {
    const url = environment.apiUrl + "/order/coded-rule-check";
    return this.httpService.post<OrderRuleCheckRequest,OrderRuleResponse[]>(url,data);
  }

  saveRules(orderRules: OrderRuleResponse, orderId: string) :  Observable<string> {
    const url = environment.apiUrl + "/order/save-coded-rule/"+orderId;
    return this.httpService.post<OrderRuleResponse,string>(url,orderRules);
  }

  deleteOrderRules(orderId: string) : Observable<string> {
    const url = environment.apiUrl + "/order/delete-coded-rule/"+orderId;
    return this.httpService.delete<string,string>(url);
  }

  updateRules(orderRules: OrderRuleResponse, orderId: string) :  Observable<any> {
    const url = environment.apiUrl + "/order/update-coded-rule/"+orderId;
    return this.httpService.put<OrderRuleResponse,string>(url,orderRules);
  }

  getExistingRules(orderId: string) : Observable<OrderRuleResponse[]>{
    const url = environment.apiUrl + "/order/coded-rule/"+orderId;
    return this.httpService.get<OrderRuleResponse[]>(url);
  }
}
