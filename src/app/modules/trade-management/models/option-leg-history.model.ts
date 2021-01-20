import { ActionType } from '../../shared/models/trade-management/action-type.enum';
import { OptionType } from '../../shared/models/trade-management/option-type.enum';

export class OptionLegHistory {

    optionLegId: number;

    changeType: number;

    actionType: ActionType;

    optionType: OptionType;

    contracts: number;

    entryPrice: number;

    exitPrice: number;

    expireDate: string;

    strikePrice: number;
}
