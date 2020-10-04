import {ActionType} from "./action-type.enum";
import {OptionType} from "./option-type.enum";

export class OptionEntry {

    id: number;

    actionType: ActionType;

    optionType: OptionType;

    daysLeft: number;

    strikePrice: number;

    impliedVolatility: number;

    initialImpliedVolatility: number;

    contracts: number;

    creditOrDebit: number;

    price: number;

    expireDate: string;

}
