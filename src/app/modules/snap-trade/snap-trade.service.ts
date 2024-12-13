import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SnapTradeService {


  private apiUrl = 'http://localhost:8080'; 
  constructor(private http: HttpClient) {}

   postData(snapUserId: any): Observable<any> {
    const payload = JSON.stringify({ "snapUserId": 'a8aaa888run1@test.com' });
    const url = `http://localhost:8080/api/users/registeruser`;
    
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
    const payload = JSON.stringify({ "snapUserId": 'arun1@test.com',"cuetradeId":"145" });
    const url = `http://localhost:8080/api/users/activites`;
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept':"application/json"
    });
    return this.http.post<any>(url, payload,{ 
      headers: headers,
    });
  
  }

  login(snapUserId: any,cuetradeId:string): Observable<any> {
    const payload = JSON.stringify({ "snapUserId": "arun1@test.com" ,"cuetradeId":"145"});
    const url = `http://localhost:8080/api/users/login`;
    
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
