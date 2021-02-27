import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../shared/services/http.service';
import { TradePlans } from '../models/trade-plans.model';
import { MarketStatus } from '../models/market-status.model';
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root'
})
export class TradePlansService {
    // private gridData:EntryExitRules[] = [];

    private apiUrl = environment.apiUrl;

    constructor(private http: HttpService) { }
    private _url = "./assets/settings.json";

    getTradePlans() {
        return this.http.get<TradePlans[]>(this._url)
    }

    getMarketStatusValues(): Observable<MarketStatus[]> {
        return this.http.get<MarketStatus[]>(this.apiUrl + '/trade-plan/market-status-values');
    }

}