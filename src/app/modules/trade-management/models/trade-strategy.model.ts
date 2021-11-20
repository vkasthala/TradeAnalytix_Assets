import { TradeThesis } from './trade-thesis.model';
import { StockEntry } from '../../shared/models/trade-management/stock-entry.model';
import { OptionEntry } from '../../shared/models/trade-management/option-entry.model';
import { EntryExitRule } from './entry-exit-rule.model';
import { TradeDirection } from '../../shared/models/trade-management/trade-direction.enum';
import { TradeTag } from '../../shared/models/trade-management/trade-tag.model';
import { RuleDto } from './rule-dto.model';

export class TradeStrategy {
    statusId: number;

    id: number;

    uid: string;

    openDate: string;

    closeDate: string;

    executed: boolean;

    executedDate: string;

    updateDateTime: string;

    createDateTime11: string;

    stockId: number;

    direction: TradeDirection;

    userId: number;

    strategyTypeId: number;

    tradeThesis: TradeThesis[];

    stockEntry: StockEntry[];

    stockOptions: OptionEntry[];

    rules: RuleDto[];

    tradeTag: TradeTag[];

    isEditTrade: boolean;
}
