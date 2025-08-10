export interface PositionsResponse {
    data?:{
    data?: Position[] | null;
    total_day_p_and_l: number;
    total_p_and_l: number;
    }
}

export interface HoldingResponse {
    data?:{
    data?: Holding[] | null;
    total_p_and_l: number;
    }
}

export interface Position {
    type: string;
    instrument: InstrumentResponse;
    quantity: number
    buy_avg: number
    sell_avg: number
    ltp: number
    day_p_and_l: number
    net_p_and_l: number
    average_price: number
    action_type: string
    realized_return: any;
}

export interface Holding{
    instrument : InstrumentResponse;
    quantity : number;
    average : number;
    ltp : number;
    p_and_l : number;
    net_change : number;
    day_change : number;
    action_type : string;
    current_value : number;
}

export interface InstrumentResponse{
    symbolId: number
    symbol: string
    exchange: string;
    actualSymbol: string
}