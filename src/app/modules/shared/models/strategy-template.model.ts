import { StockEntry } from './trade-management/stock-entry.model';
import { OptionEntry } from './trade-management/option-entry.model';

export class StrategyTemplate {

    stockEntry: StockEntry;

    optionEntries: OptionEntry[] = [];

}
