import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-oauth-redirect',
  templateUrl: './oauth-redirect.component.html',
  styleUrls: ['./oauth-redirect.component.scss']
})
export class OauthRedirectComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let token = params['token'];
      console.log('token: ', token);
      if (token) {
        sessionStorage.setItem('token', token);
        this.successLogin();
      } else {
        this.failureLogin();
      }
    });
  }

  successLogin() {
    this.router.navigate(['dashboard']);
  }

  failureLogin() {
    this.router.navigate(['landing']);
  }

}
