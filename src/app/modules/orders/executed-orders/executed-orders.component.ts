import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-executed-orders',
  templateUrl: './executed-orders.component.html',
  styleUrls: ['./executed-orders.component.scss']
})

export class ExecutedOrdersComponent implements OnInit {

  @Input() executedOrders:any;
  isMobileDevice: any;
  
  constructor() { }

  ngOnInit(): void {
    this.checkDevice();
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

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkDevice()
  }

  openIntradayOrder(order) {

  }

}
