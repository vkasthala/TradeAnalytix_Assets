import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserDetails } from '../models/common/user-details.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl;

  constructor(private httpService: HttpService) { }

  getUserDetails(): Observable<UserDetails> {
    return this.httpService.get<UserDetails>(this.apiUrl + '/user/details');
  }

}
