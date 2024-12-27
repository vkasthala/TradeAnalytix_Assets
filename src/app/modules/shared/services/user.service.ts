import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReferralInfo } from '../../dashboard/models/referral-info.model';
import { RegistrationSource } from '../../dashboard/models/registration-source.model';
import { UserDetails } from '../models/common/user-details.model';
import { HttpService } from './http.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { WebsocketUserDetails } from '../models/common/websocket-user-details.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl;

  userDetails: UserDetails = new UserDetails();

  constructor(private httpService: HttpService,
    private http: HttpClient
  ) { }

  getUserDetails(): Observable<UserDetails> {
    return this.httpService.get<UserDetails>(this.apiUrl + '/user/details');
  }

  checkIfBrokerageActive(): Observable<Boolean>{
      const url = environment.tradingServiceUri + "/user/checkIfBrokerageActive";
      return this.httpService.get<Boolean>(url);
  }

  getUserInfoForWs(): Observable<WebsocketUserDetails>{
    const url = environment.tradingServiceUri + "/user/userInfoForWs";
    return this.httpService.get<WebsocketUserDetails>(url);
}

  loadUserDetails() {
    this.httpService.get<UserDetails>(this.apiUrl + '/user/details').subscribe(result => {
      this.userDetails = this.userDetails;
      return this.userDetails;
    });
  }

  getRegistrationSources(): Observable<RegistrationSource[]> {
    return this.httpService.get<RegistrationSource[]>(this.apiUrl + '/registration-sources');
  }

  saveReferralInfo(referralDto: ReferralInfo): Observable<void> {
    return this.httpService.post<ReferralInfo, void>(this.apiUrl + '/user/referral-details', referralDto);
  }

  fyersLogin(): Observable<HttpResponse<string>>{
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json'
    // });
    // // const options = {
    // //   headers: headers,
    // //   observe: 'response' as 'body'  
    // // };
    return this.httpService.get<any>(this.apiUrl+ '/v0/brokerage/login/fyers?env='+environment.env);
  }

  logoutFromBrokerage(brokerage: string): Observable<HttpResponse<string>>{
    return this.httpService.post<any, any>(this.apiUrl+ '/v0/brokerage/logout/'+brokerage, {});
  }
}
