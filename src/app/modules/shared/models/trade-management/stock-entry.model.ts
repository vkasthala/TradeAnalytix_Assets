import {ActionType} from "./action-type.enum";

export class StockEntry {

    actionType: ActionType;
    
    price: number;
    
    quantity: number;
    
    riskFreeRate: number;
    
    lowerBound: number;
    
    upperBound: number;

}
