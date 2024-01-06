import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../shared/services/auth/auth.service';
import { HttpService } from '../../shared/services/http.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {
  private createAcSec: boolean = false;
  private logonBodySec: boolean = true;
  GOOGLE_AUTH_URL: string = '/oauth2/authorize/google';
  FACEBOOK_AUTH_URL: string = '/oauth2/authorize/facebook';
  MICROSOFT_AUTH_URL: string = '/oauth2/authorize/microsoft';
  closeResult = '';
  features: string[] = ['Learning from your trade history', 'Aligning with self-set rules', 'Journaling your trades', 'Analyzing risk of trades', 'Picking the right strategies'];
  currentInd: number = 0;

  protected loginModalOpen: boolean = false;
  hamburgerMenu: boolean = false;
  contactUsModal: boolean = false;

  constructor(
    private router: Router,
    private _dialog: MatDialog,
    private httpService: HttpService,
    protected toastr: ToastrService,
    private authService: AuthService
  ) { }

  ngOnInit() {

  }


  menuToggle() {
    this.hamburgerMenu = !this.hamburgerMenu 
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
      let authUrl = environment.apiUrl + url + '?redirect_uri=' + environment.redirectUri+'?navigateUrl='+this.authService.getRedirectUrl();
      window.location.href = authUrl;
    }
  }

  openContactUsModal() {
    this.contactUsModal= !this.contactUsModal;
  }
  
  closeContactUsModal() {
    this.contactUsModal = !this.contactUsModal;
  }

 
}
