import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-zerodha-popup',
  templateUrl: './zerodha-popup.component.html',
  styleUrls: ['./zerodha-popup.component.scss']
})
export class ZerodhaPopupComponent implements OnInit {

  safeUrl

  constructor(
    protected toastr: ToastrService,
    protected router: Router,
    public dialogRef: MatDialogRef<ZerodhaPopupComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) { }


  ngOnInit() {
    debugger;
    this.safeUrl = 'https://www.youtube.com/watch?v=1Fm-tdceB-8';
  }

  
  closeModal() {
    this.dialogRef.close();
  }

}
