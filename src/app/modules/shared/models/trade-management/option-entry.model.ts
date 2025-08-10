import {ActionType} from "./action-type.enum";
import {OptionType} from "./option-type.enum";
import { PartialLegChange } from './partial-leg-change.model';

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

    closePrice: number;

    statusId: number;

    expireDate: string;

    partialLegChange: PartialLegChange[];

    display: boolean;
}
