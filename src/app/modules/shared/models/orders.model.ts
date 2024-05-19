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
    symbol: string;
    quantity: number;
    orderType: string;
    transactionType: string;
    productType: string;
    limitPrice: number;
    stopPrice : number;
    validity: string;
    stopLossTriggerPrice: number;
}

export interface OrderRuleCheckRequest extends PlaceOrderRequest {
    tradeType: string;
    expiryDate: string;
}

export interface PurchaseOrderResponse {
    order_id: string
}

export interface OrderRuleResponse {
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
    id: number;
    orderId: string;
    time: string;
    type: string;
    instrument: InstrumentResponse;
    product: string;
    quantity: number;
    ltp: number;
    price: number;
    status: string;
    journal: string;
    selected: boolean;
}

export interface InstrumentResponse{
    symbol: string;
    exchange: string;
    symbolId: number;
}