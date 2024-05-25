import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
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

  //TODO : Make it dynamic
  getWatchListItems() : Observable<Watchlists>{
    const url = environment.tradingServiceUri + "/v0/watchlist";
    let headers = this.getHeaders();
    return this.http.get<Watchlists>(url, {headers});
  }

  addSymbolToWatchList(watchListRequest : WatchListRequest) : Observable<Watchlist>{
    console.log(watchListRequest);
    let headers = this.getHeaders();
    const url = environment.tradingServiceUri + "/v0/watchlist";
    return this.http.post<Watchlist>(url, watchListRequest, {headers});
  }

  deleteSymbolFromWatchList(watchListSymbolId : number) : Observable<Watchlist>{
    const url = environment.tradingServiceUri + "/v0/watchlist/symbols/" + watchListSymbolId;
    let headers = this.getHeaders();
    return this.http.delete<Watchlist>(url, {headers});
  }

  registerinstrumentPriceUpdateListner() : Observable<string>{
    const url = environment.tradingServiceUri + "/v0/cuetrade/system/listener/price-update/register";
    let headers = this.getHeaders();
    return this.http.post<string>(url, {headers});
  }

  public setSelectedIndex(currentIndex:number){
    this.selectedIndex = currentIndex;
  }

  public getSelectedIndex(){
    return this.selectedIndex;
  }

  private getHeaders(): HttpHeaders{
    let headers = new HttpHeaders({
      'X-BROKER-ID':  'fyers',
      'X-USER-ID': '1',
      'Authorization': 'xyz'
    });
    return headers;
  }
}
