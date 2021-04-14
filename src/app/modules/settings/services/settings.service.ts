import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpService } from '../../shared/services/http.service';
import { EntryExitRulesResult } from '../models/entry-exit-rules-result.model';
import { EntryExitRulesGridRequest } from '../models/entry-exit-rules-grid-request.model';
@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private apiUrl = environment.apiUrl + "/settings";

  constructor(private httpService: HttpService) { }

  getUserEntryExitRules(gridRequest: EntryExitRulesGridRequest): Observable<EntryExitRulesResult> {
    return this.httpService.post<EntryExitRulesGridRequest, EntryExitRulesResult>(this.apiUrl + '/rules', gridRequest);
}
}
