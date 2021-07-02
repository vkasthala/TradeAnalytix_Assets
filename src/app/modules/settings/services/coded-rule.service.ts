import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpService } from '../../shared/services/http.service';
import { UserCodedRule } from '../models/user-coded-rule.model';

@Injectable({
  providedIn: 'root'
})
export class CodedRuleService {

  private apiUrl = environment.apiUrl;

  constructor(private httpService: HttpService) { }

  public getUserCodedRules(): Observable<UserCodedRule[]> {
    return this.httpService.get<UserCodedRule[]>(this.apiUrl + '/coded-rule/user-rules');
  }

  public createCodedRule(item: UserCodedRule): Observable<void> {
    return this.httpService.post<UserCodedRule, void>(this.apiUrl + '/coded-rule/create', item);
  }

  public updateCodedRule(item: UserCodedRule): Observable<void> {
    return this.httpService.put<UserCodedRule, void>(this.apiUrl + '/coded-rule/update', item);
  }

  public deleteCodedRule(itemId: number): Observable<void> {
    return this.httpService.post<void, void>(this.apiUrl + '/coded-rule/delete' + itemId, null);
  }
  
}
