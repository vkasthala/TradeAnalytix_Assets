import { Component, Inject, OnInit, Output, EventEmitter, Input, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UploadFileService } from '../../import-trades/services/upload-file.service';
import { BrokerageService } from '../../shared/services/brokerage.service';
import { Brokerage } from '../models/brokerage.model';
import { PlaidService } from '../services/plaid.service';
import { ZerodhaPopupComponent } from '../zerodha-popup/zerodha-popup.component';

@Component({
  selector: 'app-auto-import',
  templateUrl: './auto-import-trade.component.html',
  styleUrls: ['./auto-import-trade.component.scss']
})
export class AutoImportTradeComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<string>();
  plaidToken: string = '';
  // @Input("plaidToken") plaidToken:any;
  
  brokerages: Brokerage[] = [];

  selectedFiles: FileList;
  selectedOptionFiles: FileList;
  currentFile: File;
  optionFile: File;
  selectedbroker: any = 1;
  processing: boolean = false;
  selectedBrokerage: Brokerage;

  constructor(
    private uploadService: UploadFileService,
    private brokerageService: BrokerageService,
    private plaidService: PlaidService,
    protected toastr: ToastrService,
    protected router: Router,
    // @Inject(MAT_DIALOG_DATA) data,
    private _dialog: MatDialog,
  ) {
    console.log('plaidToken',this.plaidToken);
    
  }


  ngOnInit() {
    this.plaidService.sendClickEvent.subscribe((res) => {
      this.plaidToken = res;
    });

    console.log('plaidToken',this.plaidToken)
    this.brokerageService.getAutoBrokerages().subscribe(result => {
      this.brokerages = result;
    });
  }

  importTrades() {
    console.log('selectedbroker------>', this.selectedBrokerage);
    this.processing = true;
    this.uploadService.getImportRedirectUrl(this.selectedBrokerage.uid).subscribe(result => {
      this.processing = false;
      console.log("url:", result);
      // this.zerodhaModal(result)
      window.open(result, "_blank");

    }, err => {
      this.processing = false;
      console.log("error:", err);
      window.open(err.error.text, "_blank");
    });
  }

  onBrokerageChange(val, index) {
    if (this.brokerages) {
      this.brokerages.filter(brokerage => (brokerage.id == this.selectedbroker)).forEach(brokerage => this.selectedBrokerage = brokerage);
    }
    console.log('brokerage::', this.selectedBrokerage);
  }


  zerodhaModal(result) {
    const dialogRef = this._dialog.open(ZerodhaPopupComponent, {
      disableClose: true,
      width: 'auto',
      data: result
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res === true) {
        //this.reload();
      }
    });
  }


  onPlaidSuccess(event) {
    let institutionId: string = '';
    if (event.metadata && event.metadata.institution && event.metadata.institution.institution_id) {
      institutionId = event.metadata.institution.institution_id;
    }
    this.plaidService.createAccessToken(event.token, institutionId).subscribe(result => {
      this.newItemEvent.emit();
      this.plaidService.initInvestmentsFetch(institutionId).subscribe(result => {
        console.log('Auto fetch completed');
      });
      this.toastr.info('Successfully linked your account', '');
    });
  }

  onPlaidExit(event) {
    // Get errors or exit reason.
  }

  onPlaidEvent(event) {
    // Log events so you can have insight into how your users are using plaid link.
  }

  onPlaidLoad(event) {
    // Do something when the iframe loads.
  }

  onPlaidClick(event) {
    // Do something when the button is clicked.
  }

  

}
