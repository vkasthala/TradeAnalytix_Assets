import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../shared/services/http.service';
import { EntryExitRules } from'../models/entry-exit-rulesl.model';
@Injectable({
    providedIn:'root'
})
export class EntryExitRulesService{
    // private gridData:EntryExitRules[] = [];
    constructor(private http: HttpService) { }
    private _url = "./assets/settings.json";

    getEntryExitRules(){
       return this.http.get<EntryExitRules>(this._url)
    }

}