import { Watchlistsymbol } from "./watchlistsymbol.model";

export interface Watchlist {
    id: number,
    name: String,
    items: Watchlistsymbol[],
    pageNumber: number
}

export interface Watchlists {
    watch_lists: Watchlist[]
}

export interface WatchListRequest {
    symbolId: number,
    watchListName?: String,
    pageNumber: number
}
