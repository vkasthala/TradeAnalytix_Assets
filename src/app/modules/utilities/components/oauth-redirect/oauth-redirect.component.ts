import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SliderModalComponent } from 'src/app/modules/dashboard/components/slider-modal/slider-modal.component';
import { MatDialog } from '@angular/material/dialog';

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
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let token = params['token'];
      console.log('token: ', token);
      if (token) {
        sessionStorage.setItem('token', token);
        this.successLogin();
      } else {
        this.failureLogin();
      }
    });
  }

  successLogin() {
    this.router.navigate(['dashboard']);
    this.loadSliderModal();
  }

  failureLogin() {
    this.router.navigate(['landing']);
  }

  loadSliderModal() {
    const dialogRef = this._dialog.open(SliderModalComponent, {
      disableClose: true,
      width: 'auto',
    });

    dialogRef.afterClosed().subscribe((res) => {
    });
  }

}
