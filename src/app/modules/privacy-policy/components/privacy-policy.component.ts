import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
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
    protected toastr: ToastrService
  ) { }

  ngOnInit() {

  }


  menuToggle() {
    this.hamburgerMenu = !this.hamburgerMenu 
  }
  displayStyle = "none";
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }


  priviousSlide() {
    if (this.currentInd === 0) {
      this.currentInd = 0;
    } else {
      this.currentInd--;
    }
  }

  nextSlide() {
    if (this.currentInd === 4) {
      return;
    } else {
      this.currentInd++;
    }
  }

  openContactUsModal() {
    this.contactUsModal= !this.contactUsModal;
  }
  closeContactUsModal() {
    this.contactUsModal = !this.contactUsModal;
  }
}
