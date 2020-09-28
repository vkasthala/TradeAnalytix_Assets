import { UserStockSummary } from './user-stock-summary.model';
import { StockSymbol } from './stock-symbol.model';
import { StockEntry } from './stock-entry.model';
import { OptionEntry } from './option-entry.model';
import { TradeThesis } from 'src/app/modules/trade-management/models/trade-thesis.model';

export class TradeInputData {

    stockSummary: UserStockSummary;

    selectedStock: StockSymbol;

    stockEntry: StockEntry;

    stockOptions: OptionEntry[] = [];

    strategyType: number;

    tradeThesis?: TradeThesis;

}
