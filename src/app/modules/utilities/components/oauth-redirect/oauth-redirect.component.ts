import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SliderModalComponent } from 'src/app/modules/dashboard/components/slider-modal/slider-modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { StockSymbolService } from 'src/app/modules/shared/services/stock-symbol.service';
import { ReferralModalComponent } from 'src/app/modules/dashboard/components/referral-modal/referral-modal.component';

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
    private stockSymbolService: StockSymbolService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let token = params['token'];
      console.log('token: ', token);
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
    this.loadReferralModal();
    this.stockSymbolService.getStockSymbols();
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
        this.loadSliderModal();
      });
    } else {
      this.loadSliderModal()
    }
  }

}
