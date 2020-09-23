import {ActionType} from "./action-type.enum";

export class StockEntry {

    actionType: ActionType;
    
    price: number;
    
    quantity: number;
    
    riskFreeRate: number = 6;
    
    lowerBound: number;
    
    upperBound: number;

}
