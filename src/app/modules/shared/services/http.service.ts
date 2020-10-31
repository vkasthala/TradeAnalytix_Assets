import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  public get<T>(url: string): Observable<T> {
    return this.getWithParams(url, new Map(), new Map())
  }

  public getWithParams<T>(url: string, requestParamsMap: Map<string, string>, headersMap: Map<string, string>): Observable<T> {
    return this.http.get<T>(url, {
      headers: this.createHttpHeaders(headersMap),
      params: this.createHttpParms(requestParamsMap)
    });
  }

  public post<S, T>(url: string, body: S): Observable<T> {
    return this.postWithHeaders(url, body, new Map());
  }

  public postWithHeaders<S, T>(url: string, body: S, headersMap: Map<string, string>): Observable<T> {
    return this.http.post<T>(url, body, {
      headers: this.createHttpHeaders(headersMap)
    });
  }

  public delete(url: string): Observable<void> {
    return this.http.delete<void>(url);
  }

  private createHttpParms(requestParams: Map<string, string>): HttpParams {
    let httpParams: HttpParams = new HttpParams();
    let paramText: string = '';
    for (let key of requestParams.keys()) {
      httpParams.set(key, requestParams.get(key));
    }
    return httpParams;
  }

  private createHttpHeaders(headersMap: Map<string, string>): HttpHeaders {
    let httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + sessionStorage.getItem('token')
    });
    for (let key in headersMap.keys()) {
      httpHeaders.append(key, headersMap.get(key));
    }
    console.log('http heades:', httpHeaders);
    return httpHeaders;
  }

}
