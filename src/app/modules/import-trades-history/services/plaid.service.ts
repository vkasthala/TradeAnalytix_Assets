import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpService } from '../../shared/services/http.service';
import { LinkTokenResp } from '../models/plaid/link-token-resp';

@Injectable({
  providedIn: 'root'
})
export class PlaidService {
  sendClickEvent: EventEmitter<any> = new EventEmitter();
  constructor(private httpService: HttpService) { }

  createLinkToken(): Observable<LinkTokenResp> {
    return null;
    // return this.httpService.get<LinkTokenResp>(environment.apiUrl + '/plaid/link-token/create');  // Venkat commented on 1/26/2025
  }

  createAccessToken(publicToken: string, institutionId: string): Observable<void> {
    return null;
    // let requestMap: Map<string, string> = new Map();  // Venkat commented on 1/26/2025
    // requestMap.set('publicToken', publicToken);
    // requestMap.set('brokerId', institutionId);
    // return this.httpService.getWithParams<void>(environment.apiUrl + '/plaid/access-token/create', requestMap, new Map());
  }

  initInvestmentsFetch(institutionId: string){
    return null;
    // let requestMap: Map<string, string> = new Map();  // Venkat commented on 1/26/2025
    // requestMap.set('brokerId', institutionId);
    // return this.httpService.getWithParams<void>(environment.apiUrl + '/plaid/init-investments-fetch', requestMap, new Map());
  }

}
