import { UserStockSummary } from './user-stock-summary.model';
import { StockSymbol } from './stock-symbol.model';
import { StockEntry } from './stock-entry.model';
import { OptionEntry } from './option-entry.model';
import { TradeThesis } from 'src/app/modules/trade-management/models/trade-thesis.model';
import { EntryExitRule } from 'src/app/modules/trade-management/models/entry-exit-rule.model';
import { TradeStrategy } from 'src/app/modules/trade-management/models/trade-strategy.model';

export class TradeInputData {

    tradeStrategy: TradeStrategy;

    stockSummary: UserStockSummary;

    selectedStock: StockSymbol;

}
