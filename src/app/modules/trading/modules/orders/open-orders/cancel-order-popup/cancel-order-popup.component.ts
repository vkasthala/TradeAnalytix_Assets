import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cancel-order-popup',
  templateUrl: './cancel-order-popup.component.html',
  styleUrls: ['./cancel-order-popup.component.scss']
})
export class CancelOrderPopupComponent implements OnInit {

  data:any;

  constructor(
    public dialogRef: MatDialogRef<CancelOrderPopupComponent>,
    @Inject(MAT_DIALOG_DATA) data:any,
    // private _orderService: OmsService,
    // private _sharedService: SharedService,
    private toastr: ToastrService,
  ) {
    this.data = data;
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {

  }

  closeModal() {
    this.dialogRef.close();
  }


  cancelAllOpenOrders() {
    this.dialogRef.close("Cancel All");
  }

}