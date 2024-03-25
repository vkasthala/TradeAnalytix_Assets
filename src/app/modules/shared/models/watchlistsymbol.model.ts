import { PriceUpdateModel } from "./price-update-model";

export interface Watchlistsymbol {
    id: number,
    exchange: string,
    expiry: string,
    segment: string,
    sequence: number,
    instrument_token: string,
    trading_symbol: string
    priceModel: PriceUpdateModel,
    symbol_id: number;
}
