import { Injectable } from '@angular/core';
import { ActionType } from '../models/trade-management/action-type.enum';
import { OptionEntry } from '../models/trade-management/option-entry.model';
import { OptionType } from '../models/trade-management/option-type.enum';
import { StockEntry } from '../models/trade-management/stock-entry.model';
import { StrategyTemplate } from '../models/trade-management/strategy-template.model';
import { StrategyType } from '../models/trade-management/strategy-type.enum';
import { TradeStatus } from '../models/trade-management/trade-status.enum';
import { TradeDirection } from '../models/trade-management/trade-direction.enum';

@Injectable({
  providedIn: 'root'
})
export class StrategyCreateService {

  constructor() { }

  public getStrategies(): String[] {
    let names: String[] = [];
    for (let strategy in StrategyType) {
      if (typeof StrategyType[strategy] === 'string')
        names.push(strategy);
    }
    return names;
  }

  public getTradeStatuses(): String[] {
    let statuses: String[] = [];
    for (let status in TradeStatus) {
      if (typeof TradeStatus[status] === 'string')
        statuses.push(status);
    }
    return statuses;
  }

  public getTradeDirections(): String[] {
    let directions: String[] = [];
    for (let direction in TradeDirection) {
      if (typeof TradeDirection[direction] === 'string')
        directions.push(direction);
    }
    return directions;
  }

  public getStrategyTemplate(strategyId: Number): StrategyTemplate {
    let template: StrategyTemplate = new StrategyTemplate();
    if (StrategyType['Stock'] == strategyId) {
      template.stockEntry = this.createStockEntry(ActionType["Buy to Open"], 10);
      template.direction = TradeDirection.Long;
    } else if (StrategyType['Long Call'] == strategyId) {
      template.optionEntries.push(this.createOptionEntry(ActionType["Buy to Open"], OptionType.Call, 1));
      template.direction = TradeDirection.Long;
    } else if (StrategyType['Short Call'] == strategyId) {
      template.optionEntries.push(this.createOptionEntry(ActionType["Sell to Open"], OptionType.Call, 1));
      template.direction = TradeDirection.Short;
    } else if (StrategyType['Long Put'] == strategyId) {
      template.optionEntries.push(this.createOptionEntry(ActionType["Buy to Open"], OptionType.Put, 1));
      template.direction = TradeDirection.Long;
    } else if (StrategyType['Short Put'] == strategyId) {
      template.optionEntries.push(this.createOptionEntry(ActionType["Sell to Open"], OptionType.Put, 1));
      template.direction = TradeDirection.Short;
    } else if (StrategyType['Call Spread'] == strategyId) {
      template.optionEntries.push(this.createOptionEntry(ActionType["Buy to Open"], OptionType.Call, 1));
      template.optionEntries.push(this.createOptionEntry(ActionType["Sell to Open"], OptionType.Call, 1));
      template.direction = TradeDirection.Long;
    } else if (StrategyType['Put Spread'] == strategyId) {
      template.optionEntries.push(this.createOptionEntry(ActionType["Buy to Open"], OptionType.Put, 1));
      template.optionEntries.push(this.createOptionEntry(ActionType["Sell to Open"], OptionType.Put, 1));
      template.direction = TradeDirection.Short;
    } else if (StrategyType['Covered Call'] == strategyId) {
      template.stockEntry = this.createStockEntry(ActionType["Buy to Open"], 1);
      template.optionEntries.push(this.createOptionEntry(ActionType["Sell to Open"], OptionType.Call, 1));
      template.direction = TradeDirection.Long;
    } else if (StrategyType['Married Put'] == strategyId) {
      template.stockEntry = this.createStockEntry(ActionType["Buy to Open"], 1);
      template.optionEntries.push(this.createOptionEntry(ActionType["Buy to Open"], OptionType.Put, 1));
      template.direction = TradeDirection.Long;
    } else if (StrategyType['Collars'] == strategyId) {
      template.stockEntry = this.createStockEntry(ActionType["Buy to Open"], 10);
      template.optionEntries.push(this.createOptionEntry(ActionType["Sell to Open"], OptionType.Call, 1));
      template.optionEntries.push(this.createOptionEntry(ActionType["Buy to Open"], OptionType.Put, 1));
      template.direction = TradeDirection.Long;
    } else if (StrategyType['Straddle'] == strategyId) {
      template.optionEntries.push(this.createOptionEntry(ActionType["Buy to Open"], OptionType.Call, 1));
      template.optionEntries.push(this.createOptionEntry(ActionType["Buy to Open"], OptionType.Put, 1));
      template.direction = TradeDirection.Neutral;
    } else if (StrategyType['Strangle'] == strategyId) {
      template.optionEntries.push(this.createOptionEntry(ActionType["Sell to Open"], OptionType.Call, 1));
      template.optionEntries.push(this.createOptionEntry(ActionType["Sell to Open"], OptionType.Put, 1));
      template.direction = TradeDirection.Neutral;
    } else if (StrategyType['Iron Condor'] == strategyId) {
      template.optionEntries.push(this.createOptionEntry(ActionType["Buy to Open"], OptionType.Call, 1));
      template.optionEntries.push(this.createOptionEntry(ActionType["Sell to Open"], OptionType.Call, 1));
      template.optionEntries.push(this.createOptionEntry(ActionType["Buy to Open"], OptionType.Put, 1));
      template.optionEntries.push(this.createOptionEntry(ActionType["Sell to Open"], OptionType.Put, 1));
      template.direction = TradeDirection.Neutral;
    } else if (StrategyType['Iron Butterfly'] == strategyId) {
      template.optionEntries.push(this.createOptionEntry(ActionType["Buy to Open"], OptionType.Call, 1));
      template.optionEntries.push(this.createOptionEntry(ActionType["Sell to Open"], OptionType.Call, 1));
      template.optionEntries.push(this.createOptionEntry(ActionType["Buy to Open"], OptionType.Put, 1));
      template.optionEntries.push(this.createOptionEntry(ActionType["Sell to Open"], OptionType.Put, 1));
      template.direction = TradeDirection.Neutral;
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
