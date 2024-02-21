import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { WatchListRequest, Watchlist, Watchlists } from '../models/watchlist.model';
import { Observable } from 'rxjs';
// import { QuoteUpdateStompService } from './quote-update-stomp.service';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {

  selectedIndex : number = 1;

  constructor(private http: HttpClient, 
    // private quoteUpdateService: QuoteUpdateStompService
    ) { }

  getWatchListItems() : Observable<Watchlists>{
    const url = environment.apiUrl + "/v0/watchlist";
    return this.http.get<Watchlists>(url);
  }

  addSymbolToWatchList(watchListRequest : WatchListRequest) : Observable<Watchlist>{
    console.log(watchListRequest);
    const url = environment.apiUrl + "/v0/watchlist";
    return this.http.post<Watchlist>(url, watchListRequest);
  }

  deleteSymbolFromWatchList(watchListSymbolId : number) : Observable<Watchlist>{
    const url = environment.apiUrl + "/v0/watchlist/" + watchListSymbolId;
    return this.http.delete<Watchlist>(url);
  }

  public setSelectedIndex(currentIndex:number){
    this.selectedIndex = currentIndex;
  }

  public getSelectedIndex(){
    return this.selectedIndex;
  }
}
