import { InstrumentResponse } from "./orders.model";

export class Margins {
    // id: number | undefined;
    // exchange: String | undefined;
    // tradingsymbol: String | undefined;
    // transaction_type: String | undefined;
    variety: string | undefined;
    // product: String | undefined;
    // quantity: number | undefined;
    // price: number | undefined;
    // order_id: string | undefined;
    // ltp: number | undefined;

    order_type: String | undefined;
    expiry: string | undefined;
    tradeType: string | undefined;
    trigger_price: number | undefined;

    id: number | undefined;
    orderId: string | undefined;
    time: string | undefined;
    type: string | undefined;
    instrument: InstrumentResponse;
    product: string | undefined;
    quantity: number | undefined;
    ltp: number | undefined;
    price: any | undefined;
    status: string | undefined;
    journal: string | undefined;
    selected: boolean | undefined;
    symbolId: string | undefined;
}
