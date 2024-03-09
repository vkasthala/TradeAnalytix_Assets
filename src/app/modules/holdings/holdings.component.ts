import { Component, HostListener, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-holdings',
  templateUrl: './holdings.component.html',
  styleUrls: ['./holdings.component.scss']
})
export class HoldingsComponent implements OnInit {
  isMobileDevice: any;
  rowId:any=null;
  showMobileContextMenu: boolean = false;
  orderToggle: boolean = true;
  showOrdersModal: boolean | undefined;
  isHoldingOrder:any;
  mobileRowData: any;

  holdingsCount: number = 0;
  environment = environment;

  constructor(
    private toastr: ToastrService
    ) { }

  ngOnInit() {

  }



}
