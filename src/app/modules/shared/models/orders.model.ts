import { TradeTag } from "./trade-management/trade-tag.model";

export interface OrdersResponse {
    id: number;
    exchange: string;
    tradingsymbol: string;
    transaction_type: string;
    variety: string;
    product: string;
    order_type: string;
    quantity: number;
    price: number;
    trigger_price : number;
    order_id: string | undefined;
    ltp: number | undefined;
    expiry: string | undefined;
    tradeType: string | undefined;
}

export interface MarginResponse {
    margin: number;
    charges: number;
    availableMargin: number;
}

export interface OrdersRequest {
    exchange: string;
    order_type: string;
    product: string,
    quantity: number;
    tradingsymbol: string;
    transaction_type: string;
    variety: string;
}

export interface PlaceOrderRequest {
    symbol: String;
    quantity: number;
    orderType: String;
    transactionType: string;
    productType: String;
    limitPrice: Number;
    stopPrice : Number;
    validity: String;
    stopLossTriggerPrice: Number;
}

export interface OrderRuleCheckRequest extends PlaceOrderRequest {
    orderId: string;
    tradeType: string;
    expiryDate: string;
    marketPrice: Number;
}

export interface PurchaseOrderResponse {
    data: {orderId: string}
}

export class OrderRuleDto {
    notes: string;
    tags: TradeTag[];
    orderRules: OrderRuleResponse[]
}

export class OrderRuleResponse {
    msg: string;
    ruleId: number;
    aligned: boolean;
    type: string;
    ruleParamId: number;
}

export interface OrderPurchasehistoryResponse{
    data?: OrderPurchasehistory[] | null;
}

export interface OrderPurchasehistory{
    transaction_type: string;
    id: number;
    orderId: string;
    time: string;
    type: string;
    instrument: InstrumentResponse;
    product: string;
    quantity: any;
    ltp: number;
    price: number;
    status: string;
    journal: string;
    selected: boolean;

    expiry: string;
    tradeType: string;
    order_type: String;
    trigger_price: number;
    qty: number | undefined;
    placedQty: number | undefined;
    instrumenType: number | undefined;
    symbolId: string | undefined;
    variety: string | undefined;
}

export interface InstrumentResponse{
    symbol: string;
    actualSymbol: string;
    exchange: string;
    symbolId: string;
}