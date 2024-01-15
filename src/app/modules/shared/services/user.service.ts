import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReferralInfo } from '../../dashboard/models/referral-info.model';
import { RegistrationSource } from '../../dashboard/models/registration-source.model';
import { UserDetails } from '../models/common/user-details.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl;

  userDetails: UserDetails = new UserDetails();

  constructor(private httpService: HttpService) { }

  getUserDetails(): Observable<UserDetails> {
    return this.httpService.get<UserDetails>(this.apiUrl + '/user/details');
  }

  loadUserDetails() {
    this.httpService.get<UserDetails>(this.apiUrl + '/user/details').subscribe(result => {
      this.userDetails = this.userDetails;
    });
  }

  getRegistrationSources(): Observable<RegistrationSource[]> {
    return this.httpService.get<RegistrationSource[]>(this.apiUrl + '/registration-sources');
  }

  saveReferralInfo(referralDto: ReferralInfo): Observable<void> {
    return this.httpService.post<ReferralInfo, void>(this.apiUrl + '/user/referral-details', referralDto);
  }

}
