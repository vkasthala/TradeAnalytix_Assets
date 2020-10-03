import { Injectable } from '@angular/core';
import { EntryExitRule } from '../models/entry-exit-rule.model';

@Injectable({
  providedIn: 'root'
})
export class EntryExitRuleService {

  constructor() { }

  public getEntryRules(): EntryExitRule[]{
    let entryRules:EntryExitRule[] = [];

    let rule1 = new EntryExitRule();
    rule1.entryExitRuleId = 1;
    rule1.aligned = false;
    entryRules.push(rule1);

    let rule2 = new EntryExitRule();
    rule2.entryExitRuleId = 2;
    rule2.aligned = false;
    entryRules.push(rule2);

    let rule3 = new EntryExitRule();
    rule3.entryExitRuleId = 3;
    rule3.aligned = false;
    entryRules.push(rule3);

    let rule4 = new EntryExitRule();
    rule4.entryExitRuleId = 4;
    rule4.aligned = false;
    entryRules.push(rule4);

    let rule5 = new EntryExitRule();
    rule5.entryExitRuleId = 5;
    rule5.aligned = false;
    entryRules.push(rule5);

    let rule6 = new EntryExitRule();
    rule6.entryExitRuleId = 6;
    rule6.aligned = false;
    entryRules.push(rule6);

    return entryRules;
  }
}
