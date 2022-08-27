import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SliderModalComponent } from 'src/app/modules/dashboard/components/slider-modal/slider-modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { StockSymbolService } from 'src/app/modules/shared/services/stock-symbol.service';
import { ReferralModalComponent } from 'src/app/modules/dashboard/components/referral-modal/referral-modal.component';
import { GettingStartedVideoComponent } from 'src/app/modules/dashboard/components/getting-started-modal/getting-started-video.component';
import { ImportTradeBookComponent } from 'src/app/modules/dashboard/components/import-tradebook/import-tradebook.component';
import { ImportTradePopupComponent } from 'src/app/modules/import-trades-history/import-trade-popup/import-trade-popup.component';
import { UserMetadataService } from 'src/app/modules/trade-management/services/user-metadata.service';
import { UserMetadataStoreService } from 'src/app/modules/shared/services/user-metadata-store.service';

@Component({
  selector: 'app-oauth-redirect',
  templateUrl: './oauth-redirect.component.html',
  styleUrls: ['./oauth-redirect.component.scss']
})
export class OauthRedirectComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _dialog: MatDialog,
    private stockSymbolService: StockSymbolService,
    private metdataStoreService: UserMetadataStoreService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let token = params['token'];
      if (token) {
        sessionStorage.setItem('token', token);
        let country = params['country'];
        if (country) {
          sessionStorage.setItem('country', country);
        }

        let setReferralInfo = params['setReferralInfo'];
        if (!setReferralInfo) {
          setReferralInfo = "1";
        }
        sessionStorage.setItem('setReferralInfo', setReferralInfo);

        this.successLogin();
      } else {
        this.failureLogin();
      }
    });
  }

  successLogin() {
    this.router.navigate(['dashboard']);
    this.ImportTradeBookModal();
    this.stockSymbolService.getStockSymbols();
    this.metdataStoreService.load();
  }

  failureLogin() {
    this.router.navigate(['landing']);
  }

  loadSliderModal() {
    const dialogRef = this._dialog.open(SliderModalComponent, {
      disableClose: true,
      panelClass: 'guided-tour-panel',
      backdropClass: 'guided-tour-modal'
    });

    dialogRef.afterClosed().subscribe((res) => {
    });
  }

  loadReferralModal() {
    let setRefellInfo: string = sessionStorage.getItem("setReferralInfo");
    if ("1" === setRefellInfo) {
      const dialogRef = this._dialog.open(ReferralModalComponent, {
        disableClose: true
      });
      dialogRef.afterClosed().subscribe((res) => {
        this.openGettingStartedVideo();
      });
    } else {
      this.openGettingStartedVideo()
    }
  }

  openGettingStartedVideo() {
    let dialogData = {
      title: 'Quick Intro to CueTrade',
      videoType: "QuickIntro",
    };
    const dialogRef = this._dialog.open(GettingStartedVideoComponent, {
      panelClass: 'guided-tour-panel',
      backdropClass: 'guided-tour-modal',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe((res) => {
      this.ImportTradeBookModal();
    });
  }

  ImportTradeBookModal() {
    let dialogData = {
      title: 'Add Trades in Bulk',
    };
    const dialogRef = this._dialog.open(ImportTradeBookComponent, {
      disableClose: true,
      width: 'auto',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res === true) {
        this.importTradesPopup();
      }
    });
  }

  importTradesPopup() {
    const dialogRef = this._dialog.open(ImportTradePopupComponent, {
      disableClose: true,
      width: 'auto',
      //data: dialogData
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res === true) {
        // this.reload();
      }
    });
  }

}
