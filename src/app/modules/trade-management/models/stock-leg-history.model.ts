import { ActionType } from '../../shared/models/trade-management/action-type.enum';

export class StockLegHistory {

    stockLegId: number;

    changeType: number;

    actionType: ActionType;

    quantity: number;

    entryPrice: number;

    exitPrice: number;

}
