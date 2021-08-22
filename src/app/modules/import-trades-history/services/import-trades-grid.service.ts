import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from '../../shared/services/http.service';
import { ImportTradesGridRequest } from '../models/import-trades-grid-request.model';
import { Observable } from 'rxjs';
import { ImportTradesGridRow } from '../models/import-trades-grid-row.model';
import { ImportTradesGridResult } from '../models/import-trade-grid-result.model';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})

export class ImportTradesGridService {

  private apiUrl = environment.apiUrl;

  constructor(private httpService: HttpService,
    private http: HttpClient) { }

  public loadImportTrades(importTradesGridRequest: ImportTradesGridRequest): Observable<ImportTradesGridResult> {
    let url = this.apiUrl + '/trades/page';
    return this.httpService.post<ImportTradesGridRequest, ImportTradesGridResult>(url, importTradesGridRequest);
  }

  public downloadFailedImportTrades(id: number){
    let url = this.apiUrl + '/trades/download/';
    return this.httpService.getWIthReponseType(`${this.apiUrl}/trades/download/${id}`,new Map(), new Map());
  }

}
