export class SymbolSearchModel {

    code: string | undefined;

    symbolId: number | undefined;

    name: string | undefined;

    type: string | undefined;

    exchange: string | undefined;

    addedToWatchList: boolean = false;
    id: number;
    token: string;
    symbol: string;
    symbolShort: string;
    symbolFull: string;
    tickSize: number | undefined;
    lotSize: number | undefined;
    optionType: string | undefined;
    expiryDate: string | undefined;
    segment: string | undefined;
    strike: number | undefined;
    lot_size: number | undefined;
    wlSymbol: string | undefined;
}
