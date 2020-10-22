import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import {
    debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { StockSymbol } from 'src/app/modules/shared/models/trade-management/stock-symbol.model';
import { StockSymbolService } from 'src/app/modules/shared/services/stock-symbol.service';
import { UtilService } from 'src/app/modules/utilities/services/util.service';

@Component({
    selector: 'app-trade-search',
    templateUrl: './trade-search.component.html',
    styleUrls: ['./auto-search.css']
})
export class TradeSearchComponent implements OnInit {
    serarchResult = false;
    TradeList = [];
    tradeItem = '';
    searchData: StockSymbol[] = [];

    @Output() symbolSelectEvent = new EventEmitter<StockSymbol>();

    constructor(private utilService: UtilService, private stockSymbolService: StockSymbolService) { }

    search(term: string): void {
        this.searchTrade(term)
    }

    ngOnInit(): void {
        //Load all stock symbols on load
        this.stockSymbolService.getStockSymbols().subscribe(result => {
            console.log("stock symbol result:", result);
            this.searchData = result;
        });
    }

    clearSelection(){
        this.tradeItem = null;
    }

    /* GET search terms */
    searchTrade(term: string) {
        this.TradeList = [];
        if (!term.trim()) {
            this.serarchResult = false;
            return;
        }
        for (var i = 0; i < this.searchData.length; i++) {
            var str = this.searchData[i].name;
            var code = this.searchData[i].code;
            var value = term.toLowerCase();
            if (str.toLowerCase().startsWith(value) || code.toLowerCase() === value) {
                this.TradeList.push(this.searchData[i]);
            }
        }
        this.serarchResult = true;
        console.log('TradeList', this.TradeList)
    }
    
    selectedTrade(item) {
        this.tradeItem = item.name;
        this.TradeList = [];
        this.serarchResult = false;
        console.log('tradeItem', this.tradeItem);
        this.symbolSelectEvent.emit(item);
    }

}

