import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-getting-started',
  templateUrl: './getting-started.component.html',
  styleUrls: ['./getting-started.component.scss']
})

export class GettingStartedComponent implements OnInit {
  name = 'Cuetrade';
  GettingStartedHtml;
  headers
  constructor(
    private router: Router,
    private http:HttpClient,
    private sanitizer:DomSanitizer
  ) {
    
  }
  

  ngOnInit() {
    // this.headers= new HttpHeaders({'Content-Type': 'application/json'})
    // this.http.get('https://www.espncricinfo.com/', {headers: this.headers}).subscribe(response => {
    //   debugger;
    // this.GettingStartedHtml = response;
    // this.http.get('https://www.espncricinfo.com/',{responseType:'text'}).subscribe(res=>{
    //   this.GettingStartedHtml = this.sanitizer.bypassSecurityTrustHtml(res);
    // })
  //})
}

  

}
