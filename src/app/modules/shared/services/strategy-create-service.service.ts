import { Injectable } from '@angular/core';
import { StrategyType } from '../models/strategy-type.enum';
import { StrategyTemplate } from '../models/strategy-template.model';
import { StockEntry } from '../models/trade-management/stock-entry.model';
import { OptionEntry } from '../models/trade-management/option-entry.model';
import { ActionType } from '../models/trade-management/action-type.enum';
import { OptionType } from '../models/trade-management/option-type.enum';

@Injectable({
  providedIn: 'root'
})
export class StrategyCreateServiceService {

  constructor() { }

  public getStrategies(): String[] {
    let names: String[] = [];
    for (let strategy in StrategyType) {
      if (typeof StrategyType[strategy] === 'string')
        names.push(strategy);
    }
    return names;
  }

  public getStrategyTemplate(strategyId: Number): StrategyTemplate {
    let template: StrategyTemplate = new StrategyTemplate();
    if (StrategyType['Stock'] == strategyId) {
      template.stockEntry = this.createStockEntry(ActionType["Buy to Open"], 10);
    } else if (StrategyType['Long Call'] == strategyId) {
      template.optionEntries.push(this.createOptionEntry(ActionType["Buy to Open"], OptionType.Call, 1));
    } else if (StrategyType['Short Call'] == strategyId) {
      template.optionEntries.push(this.createOptionEntry(ActionType["Sell to Open"], OptionType.Call, 1));
    } else if (StrategyType['Long Put'] == strategyId) {
      template.optionEntries.push(this.createOptionEntry(ActionType["Buy to Open"], OptionType.Put, 1));
    } else if (StrategyType['Short Put'] == strategyId) {
      template.optionEntries.push(this.createOptionEntry(ActionType["Sell to Open"], OptionType.Put, 1));
    } else if (StrategyType['Call Spread'] == strategyId) {
      template.optionEntries.push(this.createOptionEntry(ActionType["Buy to Open"], OptionType.Call, 1));
      template.optionEntries.push(this.createOptionEntry(ActionType["Sell to Open"], OptionType.Call, 1));
    } else if (StrategyType['Put Spread'] == strategyId) {
      template.optionEntries.push(this.createOptionEntry(ActionType["Buy to Open"], OptionType.Put, 1));
      template.optionEntries.push(this.createOptionEntry(ActionType["Sell to Open"], OptionType.Put, 1));
    } else if (StrategyType['Covered Call'] == strategyId) {
      template.stockEntry = this.createStockEntry(ActionType["Buy to Open"], 1);
      template.optionEntries.push(this.createOptionEntry(ActionType["Sell to Open"], OptionType.Call, 1));
    } else if (StrategyType['Married Put'] == strategyId) {
      template.stockEntry = this.createStockEntry(ActionType["Buy to Open"], 1);
      template.optionEntries.push(this.createOptionEntry(ActionType["Buy to Open"], OptionType.Put, 1));
    } else if (StrategyType['Collars'] == strategyId) {
      template.stockEntry = this.createStockEntry(ActionType["Buy to Open"], 10);
      template.optionEntries.push(this.createOptionEntry(ActionType["Sell to Open"], OptionType.Call, 1));
      template.optionEntries.push(this.createOptionEntry(ActionType["Buy to Open"], OptionType.Put, 1));
    } else if (StrategyType['Straddle'] == strategyId) {
      template.optionEntries.push(this.createOptionEntry(ActionType["Buy to Open"], OptionType.Call, 1));
      template.optionEntries.push(this.createOptionEntry(ActionType["Buy to Open"], OptionType.Put, 1));
    } else if (StrategyType['Strangle'] == strategyId) {
      template.optionEntries.push(this.createOptionEntry(ActionType["Sell to Open"], OptionType.Call, 1));
      template.optionEntries.push(this.createOptionEntry(ActionType["Sell to Open"], OptionType.Put, 1));
    } else if (StrategyType['Iron Condor'] == strategyId) {
      template.optionEntries.push(this.createOptionEntry(ActionType["Buy to Open"], OptionType.Call, 1));
      template.optionEntries.push(this.createOptionEntry(ActionType["Sell to Open"], OptionType.Call, 1));
      template.optionEntries.push(this.createOptionEntry(ActionType["Buy to Open"], OptionType.Put, 1));
      template.optionEntries.push(this.createOptionEntry(ActionType["Sell to Open"], OptionType.Put, 1));
    } else if (StrategyType['Iron Butterfly'] == strategyId) {
      template.optionEntries.push(this.createOptionEntry(ActionType["Buy to Open"], OptionType.Call, 1));
      template.optionEntries.push(this.createOptionEntry(ActionType["Sell to Open"], OptionType.Call, 1));
      template.optionEntries.push(this.createOptionEntry(ActionType["Buy to Open"], OptionType.Put, 1));
      template.optionEntries.push(this.createOptionEntry(ActionType["Sell to Open"], OptionType.Put, 1));
    }
    return template;
  }

  private createStockEntry(actionType: ActionType, quantity: number): StockEntry {
    let stockEntry: StockEntry = new StockEntry();
    stockEntry.actionType = actionType;
    stockEntry.quantity = quantity;
    stockEntry.lowerBound = -10;
    stockEntry.upperBound = 10;
    return stockEntry;
  }

  private createOptionEntry(actionType: ActionType, optionType: OptionType, contracts: number): OptionEntry {
    let optionEntry: OptionEntry = new OptionEntry();
    optionEntry.actionType = actionType;
    optionEntry.optionType = optionType;
    optionEntry.contracts = contracts;
    return optionEntry;
  }

}
