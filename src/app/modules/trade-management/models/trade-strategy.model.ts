import { TradeThesis } from './trade-thesis.model';
import { StockEntry } from '../../shared/models/trade-management/stock-entry.model';
import { OptionEntry } from '../../shared/models/trade-management/option-entry.model';
import { EntryExitRule } from './entry-exit-rule.model';

export class TradeStrategy {

    id: number;

    openDate: string;

    closeDate: string;

    executed: boolean;

    executedDate: string;

    createDateTime: string;

    stockId: number;

    userId: number;

    strategyTypeId: number;

    tradeThesis: TradeThesis[];

    stockEntry: StockEntry[];

    stockOptions: OptionEntry[];

    entryRules: EntryExitRule[];

}
