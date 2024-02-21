import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared/services/shared.service';


@Component({
  selector: 'app-trading',
  templateUrl: './trading.component.html',
  styleUrls: ['./trading.component.scss']
})
export class TradingComponent implements OnInit {
  
  isMobileDevice: any;
  
  constructor(
    private router: Router,
    private _sharedService: SharedService,
    ) {

  }

  ngOnInit() {
   
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event: any) {
    console.log("Application closed..")
    
  }

  checkDevice() {
    setTimeout(() => {
      const agent = window.navigator.userAgent.toLowerCase();
      let regexp = /android|iphone|kindle|ipad/i;
      let deviceType = regexp.test(agent);
      if (deviceType) {
        this.isMobileDevice = true;
      } else {
        this.isMobileDevice = false;
      }
    }, 100)
  }

  onResize() {
    this.checkDevice()
  }

}
