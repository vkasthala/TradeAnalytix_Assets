import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../shared/services/http.service';
import { InvestmentGoals } from'../models/investment-goals.model';
@Injectable({
    providedIn:'root'
})
export class GoalsService{
    constructor(private http: HttpService) { }
    private _url = "./assets/settings.json";

    getInvestGoals(){
       return this.http.get<InvestmentGoals[]>(this._url)
    }

    // getInvestGoals(){
    //     let staticGoals:InvestmentGoals[] =[];
    //     let goal: InvestmentGoals = new InvestmentGoals();
    //     goal.id = 1;
    //     goal.entrydate = "1/19/2021";
    //     goal.targetdate = "2021-01-19 - 2021-01-29";
    //     goal.profit = 200;
    //     staticGoals.push(goal);
        
    //    return Observable.of(staticGoals);
    // }
}