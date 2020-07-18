import { StockLeg } from './StockLeg';


export class TradeStrategy {

    stockCode: string;
        type: string;
        direction: string;
        status: any;
        maxGain: number;
        maxLoss: any;
        netGain: any;
        openDate: number;
        closeDate: number;
        entryDate: number;
        stockLeg: StockLeg;
        optionLeg: any;
        entryRulesList: any;
        exitRulesList: any;

    constructor(strategyId: number,
        stockCode: string,
        type: string,
        direction: string,
        status: any,
        maxGain: number,
        maxLoss: any,
        netGain: any,
        openDate: number,
        closeDate: number,
        entryDate: number,
        stockLeg: StockLeg,
        optionLeg: any,
        entryRulesList: any,
        exitRulesList: any  ){


            this.stockCode = stockCode;
            this.type = type;
            this.stockLeg = stockLeg;

        

    }

    

   
}

