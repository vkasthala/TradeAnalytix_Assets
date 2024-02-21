import { PriceUpdateModel } from "./price-update-model";

export interface Watchlistsymbol {
    id : number,
    weight : number,
    tradingsymbol : String,
    instrument_token : String,
    segment : String,
    exchange : String,
    expiry : String,
    sequence : number,
    priceModel: PriceUpdateModel
    symbol_id: number;
}
