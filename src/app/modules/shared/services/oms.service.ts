import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OrderPurchasehistoryResponse, OrdersRequest, OrdersResponse, PlaceOrderRequest, PurchaseOrderResponse } from '../models/orders.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OmsService {

  constructor(private http: HttpClient) { }

  getMargin(orderRequest: OrdersRequest) : Observable<OrdersResponse>{
     const url = environment.apiUrl + "/v0/oms/margins/orders";
     return this.http.post<OrdersResponse>(url, orderRequest);
  }

  placeOrder(orderRequest: PlaceOrderRequest, orderType: string) : Observable<PurchaseOrderResponse>{
    console.log(orderRequest);
    const url = environment.apiUrl + "/v0/oms/orders/" + orderType;
    return this.http.post<PurchaseOrderResponse>(url, orderRequest);
  }
  
  getOpenOrders() : Observable<OrderPurchasehistoryResponse>{
    //TODO : make it dynamic if needed.
    const OPEN_ORDER_STATES = ['OPEN', 'IN_PROGRESS'];
    let data = {page_no: "0", page_size: 50, status_list: OPEN_ORDER_STATES.join(',')};
    return this.getOrders(data);
  }

  getExecutedOrders() : Observable<OrderPurchasehistoryResponse>{
    //TODO : make it dynamic if needed.
    const EXECUTED_ORDER_STATES = ['CANCELLED', 'COMPLETE', 'REJECTED', 'FAILED'];
    let data = {page_no: "0", page_size: 50, status_list: EXECUTED_ORDER_STATES.join(',')};
    return this.getOrders(data);
  }

  getOrders(data: any) : Observable<OrderPurchasehistoryResponse> {
    const url = environment.apiUrl + "/v0/portfolio/orders";
    return this.http.get<OrderPurchasehistoryResponse>(url, {params: data});
  }

  getEditOrderDetail(orderId: string) : Observable<OrdersResponse>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("orderId", orderId);
    const url = environment.apiUrl + "/v0/oms/margins/orders";
    return this.http.post<OrdersResponse>(url, null, {params:queryParams});
  }

  modifyOrder(orderId: string, orderRequest: PlaceOrderRequest) : Observable<PurchaseOrderResponse> {
    const url = environment.apiUrl + "/v0/oms/orders/" + orderId;
    return this.http.put<PurchaseOrderResponse>(url, orderRequest);
  }

  cancelOrder(orderId: string) : Observable<PurchaseOrderResponse> {
    const url = environment.apiUrl + "/v0/oms/orders/" + orderId;
    return this.http.delete<PurchaseOrderResponse>(url);
  }
}
