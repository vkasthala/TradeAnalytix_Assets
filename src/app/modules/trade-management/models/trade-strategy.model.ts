import { TradeThesis } from './trade-thesis.model';
import { StockEntry } from '../../shared/models/trade-management/stock-entry.model';
import { OptionEntry } from '../../shared/models/trade-management/option-entry.model';

export class TradeStrategy {

    openDate: string;

    closeDate: string;

    executed: boolean;

    executedDate: string;

    stockId: number;

    userId: number;

    strategyTypeId: number;

    tradeThesis: TradeThesis;

    stockEntry: StockEntry;

    stockOptions: OptionEntry[];

}
