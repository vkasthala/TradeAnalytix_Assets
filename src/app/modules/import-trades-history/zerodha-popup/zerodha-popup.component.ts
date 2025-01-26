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
    this.safeUrl = '';  // Venkat commented on 1/26/2025
  }

  
  closeModal() {
    this.dialogRef.close();
  }

}
