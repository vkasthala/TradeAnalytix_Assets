import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OrderPurchasehistoryResponse, OrdersRequest, OrdersResponse, PlaceOrderRequest, PurchaseOrderResponse } from '../models/orders.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OmsService {

  constructor(private http: HttpClient) { }

  private createHttpHeaders(): HttpHeaders {
    let httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: environment.clientCode + ':' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcGkuZnllcnMuaW4iLCJpYXQiOjE3MTA2NTA5MDYsImV4cCI6MTcxMDcyMTgyNiwibmJmIjoxNzEwNjUwOTA2LCJhdWQiOlsieDowIiwieDoxIiwieDoyIiwiZDoxIiwiZDoyIl0sInN1YiI6ImFjY2Vzc190b2tlbiIsImF0X2hhc2giOiJnQUFBQUFCbDluWWFBanBCbmZscEZ1WHY4VjRYZDR3bWh3MHdOUUZJVFZYVW8teFg3ajdYQUpVSzJCMjlKRHpacjRnVHFqY1FiY2ktaHY5aGNGbnNKSDBIVVNmcWk1OFh2RG41cWd1ZVRJT1ZlTDB1SG1HMmNVTT0iLCJkaXNwbGF5X25hbWUiOiJOSVRISU4gQkFMQUtSSVNITkEgTkFZQUsiLCJvbXMiOiJLMSIsImhzbV9rZXkiOiJjMGFkOTA4MTc2NmY5NDk1NjFlNGVjNDhhMjczZjBjMjc2NGY5NWMwMDFiMTdkZGY1ZGYyM2ViYSIsImZ5X2lkIjoiWU4wMjA0NyIsImFwcFR5cGUiOjEwMiwicG9hX2ZsYWciOiJOIn0.5Vcf9gc87nVQZJY6-BwrSadYehuJzdqaoaW2QdgoKuA',
      Brokerage: 'FYERS'
    });
    console.log('http heades:', httpHeaders);
    return httpHeaders;
  }

  getMargin(orderRequest: OrdersRequest) : Observable<OrdersResponse>{
     const url = environment.apiUrl + "/v0/oms/margins/orders";
     return this.http.post<OrdersResponse>(url, orderRequest);
  }

  placeOrder(orderRequest: PlaceOrderRequest, orderType: string) : Observable<PurchaseOrderResponse>{
    console.log(orderRequest);
    const url = environment.tradingApiUrl + "/orders/place";
    return this.http.post<PurchaseOrderResponse>(url, orderRequest, { headers: this.createHttpHeaders() });
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
