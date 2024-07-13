import { PriceUpdateModel } from "./price-update-model";

export class Watchlistsymbol {
    id: number;
    exchange: string;
    expiry: string;
    segment: string;
    sequence: number;
    instrument_token: string;
    trading_symbol: string;
    tradingSymbolShort: string;
    priceModel: PriceUpdateModel;
    symbol_id: number;
    instrumentType: number;

    //TODO : Remove this once the price update listener is fixed.
    price: number | undefined;
    ltp: number | undefined;
    change: number | undefined;
    changePercent: number | undefined;
    winFlag: boolean | undefined;

    updateChangeProps() {
        if (!this.price) {
            return;
        }
        if (!this.ltp) {
            this.ltp = this.price;
        }
        this.change = parseFloat((this.price - this.ltp).toFixed(3));
        this.changePercent = parseFloat(((this.change / this.ltp) * 100).toFixed(2));
        this.winFlag = (this.change >= 0);
    }
}
