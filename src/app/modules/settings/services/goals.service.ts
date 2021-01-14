import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../shared/services/http.service';
import { InvestmentGoals } from'../models/investment-goals.model';
@Injectable({
    providedIn:'root'
})
export class GoalsService{
    private goals:InvestmentGoals[] = [];
    constructor(private http: HttpService) { }
    private _url = "./assets/settings.json";

    getInvestGoals(){
       return this.http.get<InvestmentGoals[]>(this._url)
    }
}