import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../shared/services/http.service';
import { DepositWithdrawal } from'../models/deposit-withdrawal.model';
@Injectable({
    providedIn:'root'
})
export class DepositService{
    private deposits:DepositWithdrawal[] = [];
    constructor(private http: HttpService) { }
    private _url = "./assets/settings.json";

    getDeposits(){
       return this.http.get<DepositWithdrawal[]>(this._url)
    }

    // getDeposits(){
    //     let staticDeposits:DepositWithdrawal[] =[];
    //     let deposit: DepositWithdrawal = new DepositWithdrawal();
    //     deposit.id = 1;
    //     deposit.entrydate = "1/19/2021";
    //     deposit.targetdate = "2021-01-19 - 2021-01-29";
    //     deposit.profit = 200;
    //     staticDeposits.push(deposit);
        
    //    return Observable.of(staticDeposits);
    // }
}