import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { OmsService } from 'src/app/modules/shared/services/oms.service';
import { SharedService } from 'src/app/modules/shared/services/shared.service';

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
    private _orderService: OmsService,
    private _sharedService: SharedService,
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

  cancelSingleOrder(order:any, index:number) {
    let orderIds = order.order_id;
    this._orderService.cancelOrder(orderIds).subscribe(
      response => {
        this.toastr.success('Success', 'Order Cancelled successfully', {timeOut: 3000, positionClass: 'toast-bottom-right'});
        this.data.splice(index, 1);
        if(this.data.length === 0) {
          this.dialogRef.close(order);
        }
      }, error => {
        this.toastr.error('Error', 'Error whike cancelling orders', {timeOut: 3000, positionClass: 'toast-bottom-right'});
      }
    )
  }

  cancelAllOpenOrders() {
    this.dialogRef.close("Cancel All");
  }

}