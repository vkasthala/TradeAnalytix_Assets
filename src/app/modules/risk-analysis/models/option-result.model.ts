import { OptionType } from '../../shared/models/trade-management/option-type.enum';

export class OptionResult {

    heading: String;

    gainLoss: number;
    
    price: number;

    value: number;

    optionType: OptionType;

}
