import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DemoModeDetailsService } from './demo-mode-details.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, private demoService: DemoModeDetailsService) { }

  public get<T>(url: string): Observable<T> {
    return this.getWithParams(url, new Map(), new Map())
  }

  getWIthReponseType(url: string, requestParamsMap: Map<string, string>, headersMap: Map<string, string>): Observable<any> {
    const options = {
      headers: this.createHttpHeaders(headersMap),
      params: this.createHttpParms(requestParamsMap),
      responseType: 'arraybuffer' as 'text'
    };
    return this.http.get(url, options);
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

  public delete<S, T>(url: string,): Observable<T> {
    return this.deleteWithHeaders(url,new Map());
  }

  public put<S, T>(url: string, body: S): Observable<T> {
    return this.putWithHeaders(url, body, new Map());
  }

  public postWithHeaders<S, T>(url: string, body: S, headersMap: Map<string, string>): Observable<T> {
    return this.http.post<T>(url, body, {
      headers: this.createHttpHeaders(headersMap)
    });
  }

  public deleteWithHeaders<S, T>(url: string, headersMap: Map<string, string>): Observable<T> {
    return this.http.delete<T>(url, {
      headers: this.createHttpHeaders(headersMap)
    });
  }

  public putWithHeaders<S, T>(url: string, body: S, headersMap: Map<string, string>): Observable<T> {
    return this.http.put<T>(url, body, {
      headers: this.createHttpHeaders(headersMap)
    });
  }

  private createHttpParms(requestParams: Map<string, string>): HttpParams {
    let httpParams: HttpParams = new HttpParams();
    let paramText: string = '';
    for (let key of requestParams.keys()) {
      httpParams = httpParams.set(key, requestParams.get(key));
    }
    return httpParams;
  }

  private createHttpHeaders(headersMap: Map<string, string>): HttpHeaders {
    let httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      'demo-mode': this.demoService.demoMode === true ? "1" : "0",
      country: sessionStorage.getItem('country')
    });
    for (let key in headersMap.keys()) {
      httpHeaders.append(key, headersMap.get(key));
    }
    console.log('http heades:', httpHeaders);
    return httpHeaders;
  }

  public postWithForm<S, T>(url: string, formData: FormData): Observable<T> {
    return this.postWithHeaders(url, formData, new Map());
  }

}
