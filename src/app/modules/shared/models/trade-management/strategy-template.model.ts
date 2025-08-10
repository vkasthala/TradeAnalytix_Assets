import { StockEntry } from './stock-entry.model';
import { OptionEntry } from './option-entry.model';
import { TradeDirection } from './trade-direction.enum';

export class StrategyTemplate {

    stockEntry: StockEntry;

    optionEntries: OptionEntry[] = [];

    direction: TradeDirection = TradeDirection.Custom;

}
