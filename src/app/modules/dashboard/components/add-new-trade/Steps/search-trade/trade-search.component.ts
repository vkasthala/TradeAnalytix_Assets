import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

@Component({
  selector: 'app-trade-search',
  templateUrl: './trade-search.component.html',
  styleUrls: [ './auto-search.css' ]
})
export class TradeSearchComponent implements OnInit {
    serarchResult = false;
    TradeList = [];
    tradeItem = '';
    searchData  = [
        { id: 11, name: 'Netflix Inc' },
        { id: 12, name: 'Prime' },
        { id: 13, name: 'Hotstar' },
        { id: 14, name: 'Sunnxt' },
        { id: 15, name: 'Sonyliv' },
        { id: 16, name: 'Youtube' },
        { id: 17, name: 'Fancode' },
      ];
    

    constructor(private utilService: UtilService) {
        
     }
    search(term: string): void {
        this.searchTrade(term)
    }

    ngOnInit(): void {
        
    }

    /* GET search terms */
    searchTrade(term: string) {
        this.TradeList = [];
        if (!term.trim()) {
            this.serarchResult = false;
        return;
        }
        for(var i=0; i < this.searchData.length; i++ ){
            var str = this.searchData[i].name;
            var value = term.toLowerCase();
            if(str.toLowerCase().includes(value)){
                this.TradeList.push(this.searchData[i].name);
            }
        }
        this.serarchResult = true;
        console.log('TradeList', this.TradeList)
    }
    selectedTrade(item) {
        this.tradeItem = item;
        this.TradeList = [];
        this.serarchResult = false;
        console.log('tradeItem', this.tradeItem)
    }
   

   


 
}

