import { ActionType } from './action-type.enum';

export class PartialLegChange {
    
    changeCount: number;

    closePrice: number;

    openPrice: number;

    executedDate: string;

    notes: string;

    actionType: ActionType;

}
