import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpService } from '../../shared/services/http.service';
import { InvestmentGoals } from '../models/investment-goals.model';
@Injectable({
    providedIn: 'root'
})
export class GoalsService {
    constructor(private http: HttpService) { }
    private url = environment.apiUrl + '/metadata/investment-goal/';

    getInvestGoals() {
        return this.http.get<InvestmentGoals[]>(this.url);
    }

    saveInvestmentGoals(goals: InvestmentGoals) {
        return this.http.post(this.url, goals);
    }

    deleteInvestmentGoals(goal: InvestmentGoals) {
        return this.http.post(this.url + goal.id, null);
    }

    putInvestmentGoals(goal: InvestmentGoals) {
        return this.http.put(this.url, goal);
    }
}
