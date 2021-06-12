import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  private createAcSec: boolean = false;
  private logonBodySec: boolean = true;
  GOOGLE_AUTH_URL: string = '/oauth2/authorize/google';
  FACEBOOK_AUTH_URL: string = '/oauth2/authorize/facebook';
  MICROSOFT_AUTH_URL: string = '/oauth2/authorize/microsoft';
  closeResult = '';

  protected loginModalOpen: boolean = false;
  constructor(
    private router: Router
    ) { }

  ngOnInit() {
  }

  login(authProvider: string) {
    let url: string;
    if ('google' === authProvider) {
      url = this.GOOGLE_AUTH_URL;
    } else if ("facebook" === authProvider) {
      url = this.FACEBOOK_AUTH_URL;
    } else if ("microsoft" === authProvider) {
      url = this.MICROSOFT_AUTH_URL;
    } else if ("local" === authProvider) {
      
    }
    if (url) {
      let authUrl = environment.apiUrl + url + '?redirect_uri=' + environment.redirectUri;
      window.location.href = authUrl;
    }
  }

  
  openLoginModal() {
    this.createAcSec = false;
    this.logonBodySec = true;
    this.loginModalOpen = !this.loginModalOpen;
  }
  closeLoginModal() {
    this.loginModalOpen = !this.loginModalOpen;
  }
  openCreateAcModal() {
    this.logonBodySec = !this.logonBodySec;
    this.createAcSec = !this.createAcSec;
  }

}
