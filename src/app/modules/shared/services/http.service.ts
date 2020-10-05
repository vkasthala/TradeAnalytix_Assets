import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  public get<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  public getWithParams<T>(url: string, requestParamsMap: Map<string, string>, headersMap: Map<string, string>): Observable<T> {
    return this.http.get<T>(url, {
      headers: this.createHttpHeaders(headersMap),
      params: this.createHttpParms(requestParamsMap)
    });
  }

  public post<S, T>(url: string, body: S): Observable<T> {
    return this.http.post<T>(url, body);
  }

  public postWithHeaders<S, T>(url: string, body: S, headersMap: Map<string, string>): Observable<T> {
    return this.http.post<T>(url, body, {
      headers: this.createHttpHeaders(headersMap)
    });
  }

  public delete(url: string): Observable<void> {
    return this.http.delete<void>(url);
  }

  private createHttpParms(requestParams: Map<string, string>) {
    let httpParams: HttpParams = new HttpParams();
    let paramText: string = '';
    for (let key of requestParams.keys()) {
      httpParams.set(key, requestParams.get(key));
    }
    return httpParams;
  }

  private createHttpHeaders(headersMap: Map<string, string>) {
    let httpHeaders: HttpHeaders = new HttpHeaders;
    for (let key in headersMap.keys()) {
      httpHeaders.set(key, headersMap.get(key));
    }
    return httpHeaders;
  }

}
