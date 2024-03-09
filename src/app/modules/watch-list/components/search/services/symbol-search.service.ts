import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/modules/shared/services/http.service';

import { environment } from 'src/environments/environment';
import { SymbolSearchModel } from '../models/symbol-search-model';

@Injectable({
  providedIn: 'root'
})
export class SymbolSearchService {

  constructor(private httpService: HttpService) { }

  searchSymbols(input: string): Observable<SymbolSearchModel[]> {
    return this.httpService.get<SymbolSearchModel[]>(environment.apiUrl + '/symbol/search/' + input);
  }

};
