import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { HttpService } from '../../shared/services/http.service';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss']
})
export class TermsAndConditionsComponent implements OnInit {
  private createAcSec: boolean = false;
  private logonBodySec: boolean = true;
  GOOGLE_AUTH_URL: string = '/oauth2/authorize/google';
  FACEBOOK_AUTH_URL: string = '/oauth2/authorize/facebook';
  MICROSOFT_AUTH_URL: string = '/oauth2/authorize/microsoft';
  closeResult = '';


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



  openContactUsModal() {
    this.contactUsModal= !this.contactUsModal;
  }
  closeContactUsModal() {
    this.contactUsModal = !this.contactUsModal;
  }
}
