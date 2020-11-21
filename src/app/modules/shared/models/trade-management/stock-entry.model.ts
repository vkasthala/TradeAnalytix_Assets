import {ActionType} from "./action-type.enum";

export class StockEntry {

    id: number;

    actionType: ActionType;
    
    price: number;

    closePrice: number;
    
    quantity: number;
    
    riskFreeRate: number = 6;
    
    lowerBound: number;
    
    upperBound: number;

}
