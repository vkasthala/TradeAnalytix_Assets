import { Injectable } from '@angular/core';
import { EntryExitRule } from '../models/entry-exit-rule.model';
import { EntryExitRulesGridRequest } from '../../settings/models/entry-exit-rules-grid-request.model';
import { EntryExitRulesGridPage } from '../../settings/models/entry-exit-rules-grid-page.model';
import { SettingsService } from '../../settings/services/settings.service';
import { HttpService } from '../../shared/services/http.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntryExitRuleService {

  constructor(private settingsService: SettingsService,
    private httpService: HttpService) { }
    
  private apiUrl = environment.apiUrl;
  
  public getEntryRules1(): EntryExitRule[]{
    let entryRules:EntryExitRule[] = [];

    let rule1 = new EntryExitRule();
    rule1.entryExitRuleId = 1;
    rule1.aligned = false;
    rule1.type = 1;
    entryRules.push(rule1);

    let rule2 = new EntryExitRule();
    rule2.entryExitRuleId = 2;
    rule2.aligned = false;
    rule2.type = 1;
    entryRules.push(rule2);

    let rule3 = new EntryExitRule();
    rule3.entryExitRuleId = 3;
    rule3.aligned = false;
    rule3.type = 1;
    entryRules.push(rule3);

    let rule4 = new EntryExitRule();
    rule4.entryExitRuleId = 4;
    rule4.aligned = false;
    rule4.type = 1;
    entryRules.push(rule4);

    let rule5 = new EntryExitRule();
    rule5.entryExitRuleId = 5;
    rule5.aligned = false;
    rule5.type = 1;
    entryRules.push(rule5);

    let rule6 = new EntryExitRule();
    rule6.entryExitRuleId = 6;
    rule6.aligned = false;
    rule6.type = 1;
    entryRules.push(rule6);

    return entryRules;
  }


  getEntryRules2(id): EntryExitRule[] {
    let entryRules:EntryExitRule[] = [];
    let type = 'Entry';
    this.getUserEntryExitRules(id, type).subscribe(result => {
      return result;
    });
    return entryRules;
  }

  getUserEntryExitRules(id, type): Observable<EntryExitRule[]> {
    return this.httpService.get<EntryExitRule[]>(this.apiUrl + '/trade-strategy/entryexitrules/'+ id + '/' +type);
  }

  getInitialRequest(): EntryExitRulesGridRequest {
    let request: EntryExitRulesGridRequest = new EntryExitRulesGridRequest();
    let pageRequest: EntryExitRulesGridPage = new EntryExitRulesGridPage();
    pageRequest.pageNumber = 0;
    pageRequest.pageSize = 200;
    request.page = pageRequest;
    return request;
  }

  public getExitRules(): EntryExitRule[]{
    let entryRules:EntryExitRule[] = [];

    let rule1 = new EntryExitRule();
    rule1.entryExitRuleId = 7;
    rule1.aligned = false;
    rule1.type = 2;
    entryRules.push(rule1);

    let rule2 = new EntryExitRule();
    rule2.entryExitRuleId = 8;
    rule2.aligned = false;
    rule2.type = 2;
    entryRules.push(rule2);

    let rule3 = new EntryExitRule();
    rule3.entryExitRuleId = 9;
    rule3.aligned = false;
    rule3.type = 2;
    entryRules.push(rule3);

    let rule4 = new EntryExitRule();
    rule4.entryExitRuleId = 10;
    rule4.aligned = false;
    rule4.type = 2;
    entryRules.push(rule4);

    let rule5 = new EntryExitRule();
    rule5.entryExitRuleId = 11;
    rule5.aligned = false;
    rule5.type = 2;
    entryRules.push(rule5);

    let rule6 = new EntryExitRule();
    rule6.entryExitRuleId = 12;
    rule6.aligned = false;
    rule6.type = 2;
    entryRules.push(rule6);

    return entryRules;
  }
}
