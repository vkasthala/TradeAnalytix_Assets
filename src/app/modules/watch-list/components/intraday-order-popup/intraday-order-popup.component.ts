import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Margins } from 'src/app/modules/shared/models/margins.model';
import { OrderRuleCheckRequest, OrderRuleResponse } from 'src/app/modules/shared/models/orders.model';
import { OmsService } from 'src/app/modules/shared/services/oms.service';
import { SharedService } from 'src/app/modules/shared/services/shared.service';

@Component({
  selector: 'app-intraday-order-popup',
  templateUrl: './intraday-order-popup.component.html',
  styleUrls: ['./intraday-order-popup.component.scss']
})
export class IntradayOrderPopupComponent implements OnInit {
  @Input('orderToggle') orderToggle: boolean=false;
  @Input('margins') margins:any = Margins;
  data:OrderRuleCheckRequest;
  orderRules: OrderRuleResponse[];

  constructor(
    public dialogRef: MatDialogRef<IntradayOrderPopupComponent>,
    @Inject(MAT_DIALOG_DATA) data:any,
    private _orderService: OmsService,
    private _sharedService: SharedService,
    private toastr: ToastrService,
  ) {
    this.data = data;
  }

  ngOnInit() {
    console.log(this.data);
    this._orderService.checkRules(this.data).subscribe(response=>{
      if(response){
        this.orderRules = response;
        console.log("Check rules response "+response);
      }
    }, error => {
      console.log("Error "+error);
    });
  }

  ngAfterViewInit(): void {

  }

  closeModal() {
    this.dialogRef.close();
  }

  orderPlacement(order:any) {
    let orderIds = order.order_id;
    this.dialogRef.close(this.orderRules);
  }

  cancelAllOpenOrders() {
    this.dialogRef.close("Cancel All");
  }

}