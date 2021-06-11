import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpService } from '../../shared/services/http.service';
import { MarketStatus } from '../models/market-status.model';
import { PlannedTrade } from '../models/planned-trade.model';
import { TodayExecutedLeg } from '../models/today-executed-leg.model';
import { TradePlanGridRequest } from '../models/trade-plan-grid-request.model';
import { TradePlanGridResult } from '../models/trade-plan-grid-result.model';
import { TradePlanGridRow } from '../models/trade-plan-grid-row.model';
import { TradePlanStrategy } from '../models/trade-plan-strategy.model';
import { TradePlan } from '../models/trade-plan.model';
import { TradePlans } from '../models/trade-plans.model';
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

    createTradePlan(tradePlan: TradePlan): Observable<void> {
        return this.http.post<TradePlan, void>(this.apiUrl + '/trade-plan/create', tradePlan);
    }

    updateTradePlan(tradePlan: TradePlan): Observable<void> {
        return this.http.post<TradePlan, void>(this.apiUrl + '/trade-plan/update', tradePlan);
    }

    getTradePlansGridResult(gridRequest: TradePlanGridRequest): Observable<TradePlanGridResult> {
        return this.http.post<TradePlanGridRequest, TradePlanGridResult>(this.apiUrl + '/trade-plan/grid-result', gridRequest);
    }

    getTradePlanData(tradePlanId: number): Observable<TradePlan> {
        return this.http.get<TradePlan>(this.apiUrl + '/trade-plan/' + tradePlanId);
    }

    getLatestTradePlan(): Observable<TradePlanGridRow> {
        return this.http.get<TradePlanGridRow>(this.apiUrl + '/trade-plan/latest');
    }

    getTodayExecutedLegs(day: string): Observable<TodayExecutedLeg[]> {
        return this.http.get<TodayExecutedLeg[]>(this.apiUrl + '/trade-plan/executed/' + day);
    }


}