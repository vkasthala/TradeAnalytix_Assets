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
    exchange: string;
    order_type: string;
    product: string;
    quantity: number;
    tradingsymbol: string;
    transaction_type: string;
    variety: string;
    price: number;
    trigger_price : number;
    stop_loss_enabled: boolean;
    stop_loss_trigger_price: number;
}

export interface PurchaseOrderResponse {
    order_id: string
}

export interface OrderPurchasehistoryResponse{
    data?: OrderPurchasehistory[] | null;
}

export interface OrderPurchasehistory{
    id: number,
    order_id: string
    time: string
    type: string
    instrument: InstrumentResponse
    product: string
    quantity: number
    ltp: number
    price: number
    status: string;
    selected: boolean;
}

export interface InstrumentResponse{
    symbol: string
    exchange: string
    symbolId: number
}