import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../shared/services/http.service';
import { TradePlans } from'../models/trade-plans.model';
@Injectable({
    providedIn:'root'
})
export class TradePlansService{
    // private gridData:EntryExitRules[] = [];
    constructor(private http: HttpService) { }
    private _url = "./assets/settings.json";

    getTradePlans(){
       return this.http.get<TradePlans[]>(this._url)
    }

}