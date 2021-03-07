import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../shared/services/http.service';
import { TradePlans } from '../models/trade-plans.model';
import { MarketStatus } from '../models/market-status.model';
import { environment } from 'src/environments/environment';
import { TradePlanStrategy } from '../models/trade-plan-strategy.model';
import { TradePlan } from '../models/trade-plan.model';
import { PlannedTrade } from '../models/planned-trade.model';
@Injectable({
    providedIn: 'root'
})
export class TradePlansService {
    // private gridData:EntryExitRules[] = [];

    private apiUrl = environment.apiUrl;

    constructor(private http: HttpService) { }
    private _url = "./assets/settings.json";

    getTradePlans() {
        return this.http.get<TradePlans[]>(this._url);
    }

    getMarketStatusValues(): Observable<MarketStatus[]> {
        return this.http.get<MarketStatus[]>(this.apiUrl + '/trade-plan/market-status-values');
    }

    getOpenStrategies(): Observable<TradePlanStrategy[]> {
        return this.http.get<TradePlanStrategy[]>(this.apiUrl + '/trade-plan/open-strategies');
    }

    getTradePlanStrategies(tradePlanId: number): Observable<TradePlanStrategy[]> {
        return this.http.get<TradePlanStrategy[]>(this.apiUrl + '/trade-plan/strategies/' + tradePlanId);
    }

    getPlannedTrades(tradePlanId: number): Observable<PlannedTrade[]> {
        return this.http.get<PlannedTrade[]>(this.apiUrl + '/trade-plan/planned-trades/' + tradePlanId);
    }

    createTradePlan(tradePlan: TradePlan): Observable<void>{
        return this.http.post<TradePlan, void>(this.apiUrl + '/trade-plan/create', tradePlan);
    }

    updateTradePlan(tradePlan: TradePlan): Observable<void>{
        return this.http.post<TradePlan, void>(this.apiUrl + '/trade-plan/update', tradePlan);
    }

}