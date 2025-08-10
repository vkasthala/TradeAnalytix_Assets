import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { HttpService } from '../../shared/services/http.service';
import { JoinWaitlistComponent } from './join-waitlist/join-waitlist.component';
import { ImageService } from './image.service';
// import { AnimationOptions } from "ngx-lottie";
import { SlidesOutputData, OwlOptions } from 'ngx-owl-carousel-o';
import { AuthService } from '../../shared/services/auth/auth.service';
import { ContactUs } from './contact-us.model';
import { FormBuilder } from '@angular/forms';
import { ContactService } from './contact.service';

export class CarouselData {
  id?: string;
  text: string;
  dataMerge?: number;
  width?: number;
  dotContent?: string;
  src?: string;
  dataHash?: string;
}

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  startPosition: number = 0;
  activeSlides: any;
  title = 'ngSlick';
  // banner: AnimationOptions = {
  //   path: "../../../../assets/animations/hero-cuetrade-ani.json"
  // };
  // tradeplan: AnimationOptions = {
  //   path: "../../../../assets/animations/cuetrade-plan-ani.json"
  // };
  // tradejournal: AnimationOptions = {
  //   path: "../../../../assets/animations/cuetrade-journal-ani.json"
  // };
  // tradereview: AnimationOptions = {
  //   path: "../../../../assets/animations/cuetrade-review-ani.json"
  // };
  


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

  contactForm: ContactUs = new ContactUs();
  

  constructor(
    private router: Router,
    private _dialog: MatDialog,
    private httpService: HttpService,
    protected toastr: ToastrService,
    private _imageService: ImageService,
    private el: ElementRef,
    private authService: AuthService,
    private _contactService: ContactService
  ) {
   }

  ngOnInit() {
    // setInterval(() => {
    //   if (this.currentInd === 4) {
    //     this.currentInd = 0;
    //   } else {
    //     this.currentInd++;
    //   }
    // }, 3000);
    let token = sessionStorage.getItem('token');
    if(token != null){
    this.login('google');
    }
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

  menuToggle() {
    this.hamburgerMenu = !this.hamburgerMenu;
  }

  displayStyle = "none";
  videoType:string;
  openPopup(type) {
    this.videoType = "";
    this.videoType = type;
    this.displayStyle = "block";
  }

  closePopup() {
    this.videoType = "";
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

  carouselData: CarouselData[] = [];

  customOptions: OwlOptions = {
    loop: false,
    autoplay: true,
    autoplayHoverPause: true,
		autoplaySpeed: 600,
    dotsSpeed: 300,
    dotsData: true,
    smartSpeed: 500,
    dragEndSpeed: 200,
    rewind: true,
    // rtl: true,
    startPosition: 1,
    navText: [ '<', '>' ],
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      900: {
        items: 1
      }
    },
    nav: true
  }

  getPassedData(data: SlidesOutputData) {
    this.activeSlides = data;
    this.startPosition = this.activeSlides.startPosition;
    console.log(this.activeSlides);
  }

  submitContact() {
    if(this.contactForm.name === undefined || this.contactForm.email === undefined) {
      this.toastr.error('Please fill all fields.', 'Error');
      return;
    }
    
    this._contactService.contactData(this.contactForm).subscribe(data => {
      this.toastr.success('Your details submitted successfully', 'Success');
      this.contactUsModal = !this.contactUsModal;
    }, err => {
      this.toastr.error(err);
    });
    
  }

}


function BulkUpdateUiComponent(BulkUpdateUiComponent: any, arg1: { width: string; maxWidth: string; height: string; data: {}; }) {
  throw new Error('Function not implemented.');
}
