import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpService } from '../../shared/services/http.service';
import { LinkTokenResp } from '../models/plaid/link-token-resp';

@Injectable({
  providedIn: 'root'
})
export class PlaidService {

  constructor(private httpService: HttpService) { }
  
  createLinkToken(): Observable<LinkTokenResp> {
    return this.httpService.get<LinkTokenResp>(environment.apiUrl + '/plaid/link-token/create');
  }

  createAccessToken(publicToken: string): Observable<void> {
    return this.httpService.get<void>(environment.apiUrl + '/plaid/access-token/create/' + publicToken);
  }

}
