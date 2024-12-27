import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SnapTradeService {


  private snaptradeurl = environment.snaptradeurl;
  constructor(private http: HttpClient) {}
   
  suffixCuteTrade(snapUserId:any){
    var noSpaces = snapUserId.replace(/\s+/g, ''); 
    var suffix = '-cuetrade';
    return noSpaces+suffix;
  }

   registerUser(snapUserId: string,cuetradeId:string): Observable<any> {
    snapUserId = this.suffixCuteTrade(snapUserId);
    const payload = JSON.stringify({ "snapUserId":snapUserId,"cuetradeId":cuetradeId });
    const url = this.snaptradeurl+`/api/users/registeruser`;
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept':"application/text"
    });
    return this.http.post<any>(url, payload,{ 
      headers: headers,
      responseType: 'text' as 'json', // Ensure Angular treats the response as plain text
    });
  
  }

  getActivities(snapUserId: any,cuetradeId:string): Observable<any> {
    snapUserId = this.suffixCuteTrade(snapUserId);
    const payload = JSON.stringify({ "snapUserId":snapUserId,"cuetradeId":cuetradeId });
    const url = this.snaptradeurl+'/api/users/activites';
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept':"application/json"
    });
    return this.http.post<any>(url, payload,{ 
      headers: headers,
    });
  
  }


  getActivitiesByDate(snapUserId: any,cuetradeId:string,startDate:string,endDate:string): Observable<any> {
    snapUserId = this.suffixCuteTrade(snapUserId);
    const payload = JSON.stringify({ "snapUserId":snapUserId,"cuetradeId":cuetradeId,"startDate":startDate,"endDate":endDate});
    const url = this.snaptradeurl+`/api/users/activites`;
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept':"application/json"
    });
    return this.http.post<any>(url, payload,{ 
      headers: headers,
    });
  
  }

  login(snapUserId: any,cuetradeId:string): Observable<any> {
    snapUserId = this.suffixCuteTrade(snapUserId);
    const payload = JSON.stringify({ "snapUserId": snapUserId ,"cuetradeId":cuetradeId});
    const url =this.snaptradeurl+`/api/users/login`;
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept':"application/text"
    });
    return this.http.post<any>(url, payload,{ 
      headers: headers,
      responseType: 'text' as 'json'
    });
  
  }
}
