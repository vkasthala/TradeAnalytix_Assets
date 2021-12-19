import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { HttpService } from '../../shared/services/http.service';
import { JoinWaitlistComponent } from './join-waitlist/join-waitlist.component';

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
  features: string[] = ['Learning from your trade history', 'Aligning with self-set rules', 'Journaling your trades', 'Analyzing risk of trades', 'Picking the right strategies'];
  currentInd: number = 0;

  protected loginModalOpen: boolean = false;
  constructor(
    private router: Router,
    private _dialog: MatDialog,
    private httpService: HttpService,
    protected toastr: ToastrService
  ) { }

  ngOnInit() {
    setInterval(() => {
      if (this.currentInd === (this.features.length - 1)) {
        this.currentInd = 0;
      } else {
        this.currentInd++;
      }
    }, 3000);
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

  joinWaitlist() {
    let dialogData = {
      title: 'Join the Waitlist',
    };
    const dialogRef = this._dialog.open(JoinWaitlistComponent, {
      disableClose: true,
      width: 'auto',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.httpService.post(environment.apiUrl + '/wait-list-user/create', res).subscribe(resp => {
          this.toastr.success('Successfully added to waitlist. The activation details will be sent via email in 24 hours.', 'Success')
        }, err => {
          this.toastr.error('Provide valid name and email address to join the waitlist.', 'Error', 
          { 
            tapToDismiss:false,
            closeButton:true,
            disableTimeOut: true
          });
        });
      }
    });
  }
}
