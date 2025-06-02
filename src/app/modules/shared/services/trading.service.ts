import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
    
@Injectable({
    providedIn: 'root'
  })
export class TradingService {
    
      private createHttpHeaders(): HttpHeaders {
        let httpHeaders: HttpHeaders = new HttpHeaders({
          Brokerage: 'US' == environment.country ? 'SNAPTRADE' : 'FYERS',
          Authorization: 'Bearer ' + sessionStorage.getItem('token')
        });
        return httpHeaders;
      }
    
      constructor(private http: HttpClient) { }

      importTrades(snapUserId: any,cuetradeId:string,startDate:string,endDate:string): Observable<any> {
        const url = environment.tradingServiceUri+`/portfolio/importTrades`;
        return this.http.post<any>(url, {"startDate":startDate, "endDate": endDate}, { headers: this.createHttpHeaders() });
    }

    getAutoImportHistory(): Observable<any> {
        const url = environment.tradingServiceUri+`/portfolio/autoImportHistory`;
        return this.http.get<any>(url, { headers: this.createHttpHeaders() });
      }

}
    