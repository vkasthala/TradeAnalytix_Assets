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
