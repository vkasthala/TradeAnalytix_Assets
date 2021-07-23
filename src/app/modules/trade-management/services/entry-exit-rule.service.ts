import { Injectable } from '@angular/core';
import { EntryExitRule } from '../models/entry-exit-rule.model';
import { EntryExitRulesGridRequest } from '../../settings/models/entry-exit-rules-grid-request.model';
import { EntryExitRulesGridPage } from '../../settings/models/entry-exit-rules-grid-page.model';
import { SettingsService } from '../../settings/services/settings.service';
import { HttpService } from '../../shared/services/http.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { RuleDto } from '../models/rule-dto.model';

@Injectable({
  providedIn: 'root'
})
export class EntryExitRuleService {

  constructor(private httpService: HttpService) { }

  private apiUrl = environment.apiUrl;

  getUserEntryExitRules(id, type): Observable<EntryExitRule[]> {
    return this.httpService.get<EntryExitRule[]>(this.apiUrl + '/trade-strategy/entryexitrules/' + id + '/' + type);
  }

  getEntryRules(): Observable<RuleDto[]> {
    return this.httpService.get<RuleDto[]>(this.apiUrl + '/trade-strategy/user-entry-rules');
  }

  getExitRules(): Observable<RuleDto[]> {
    return this.httpService.get<RuleDto[]>(this.apiUrl + '/trade-strategy/user-exit-rules');
  }

  getTradeEntryRules(strategyId: number): Observable<RuleDto[]> {
    return this.httpService.get<RuleDto[]>(this.apiUrl + '/trade-strategy/trade-entry-rules/' + strategyId);
  }

  getTradeExitRules(strategyId: number): Observable<RuleDto[]> {
    return this.httpService.get<RuleDto[]>(this.apiUrl + '/trade-strategy/trade-exit-rules/' + strategyId);
  }

  getInitialRequest(): EntryExitRulesGridRequest {
    let request: EntryExitRulesGridRequest = new EntryExitRulesGridRequest();
    let pageRequest: EntryExitRulesGridPage = new EntryExitRulesGridPage();
    pageRequest.pageNumber = 0;
    pageRequest.pageSize = 200;
    request.page = pageRequest;
    return request;
  }

}
