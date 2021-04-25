import {Injectable} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from '../../shared/services/http.service';
import { EntryExitRule } from'../models/entry-exit-rules.model';
import { environment } from '../../../../environments/environment';
import { SettingsService } from './settings.service';
@Injectable({
    providedIn:'root'
})
export class EntryExitRulesService{
    // private gridData:EntryExitRules[] = [];
    totalCount: number = 0;
    private entryExitSubject = new BehaviorSubject<EntryExitRule[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    constructor(
        private http: HttpService,
        private settingsService: SettingsService
        ) { }
    //private _url = "./assets/settings.json";
    private apiUrl = environment.apiUrl + "/settings";
    // getEntryExitRules(){
    //    return this.http.get<EntryExitRule[]>(this._url)
    // }

    public getEntryExitRules(): Observable<EntryExitRule> {
        return this.http.get<EntryExitRule>(this.apiUrl + '/rules');
    }
}