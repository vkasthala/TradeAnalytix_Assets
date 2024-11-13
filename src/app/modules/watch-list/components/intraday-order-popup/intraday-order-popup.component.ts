import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserTag } from 'src/app/modules/settings/models/user-tag.model';
import { UserTagService } from 'src/app/modules/settings/services/user-tag.service';
import { ConfirmDialogComponent } from 'src/app/modules/shared/components/modals/confirm-dialog/confirm-dialog.component';
import { Margins } from 'src/app/modules/shared/models/margins.model';
import { OrderRuleCheckRequest, OrderRuleDto, OrderRuleResponse } from 'src/app/modules/shared/models/orders.model';
import { TradeInputData } from 'src/app/modules/shared/models/trade-management/trade-input-data.model';
import { TradeTag } from 'src/app/modules/shared/models/trade-management/trade-tag.model';
import { OmsService } from 'src/app/modules/shared/services/oms.service';
import { SharedService } from 'src/app/modules/shared/services/shared.service';
import { UserStockStatsService } from 'src/app/modules/shared/services/user-stock-stats.service';
import { EditableSelectComponent } from 'src/app/modules/trade-management/components/add-trade/Steps/editable-select/editable-select.component';
import { TradeTagsComponent } from 'src/app/modules/trade-management/components/add-trade/Steps/trade-tags/trade-tags.component';
import { StockSummaryResult } from 'src/app/modules/trade-management/models/stock-summary-result.model';

@Component({
  selector: 'app-intraday-order-popup',
  templateUrl: './intraday-order-popup.component.html',
  styleUrls: ['./intraday-order-popup.component.scss']
})
export class IntradayOrderPopupComponent implements OnInit {
  @Input('orderToggle') orderToggle: boolean=false;
  @Input('margins') margins:any = Margins;
  @ViewChild('tradeTag', { static: false }) tradeTagsComponent: TradeTagsComponent;
  data:{'ruleCheckPayload':OrderRuleCheckRequest, 'margins':Margins, 'orderType':any};
  orderRuleDto: OrderRuleDto = new OrderRuleDto();
  stockSummaryResult: StockSummaryResult = new StockSummaryResult();
  tags: TradeTag[];
  registeredTags: any = [];
  @Input("inputState") inputState: TradeInputData;

  constructor(
    private _dialog: MatDialog,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<IntradayOrderPopupComponent>,
    @Inject(MAT_DIALOG_DATA) data:any,
    private _orderService: OmsService,
    private userStockStatsService: UserStockStatsService,
    protected userTagService: UserTagService
  ) {
    this.data = data;
    this.tags = data.tags;
    this.margins = data.margins;
  }

  ngOnInit() {
    console.log(this.data);
    if(this.data.orderType == 'closed'){
      this.loadExistingOrderRules();
    } else{
    this.loadRules();
    }
    this.loadSummary();
    if(this.tradeTagsComponent){
    this.tradeTagsComponent.tags = this.tags;
    }
  }

  loadRules(){
    // this.data.ruleCheckPayload.orderId = '24070800145772';
  this._orderService.checkRules(this.data.ruleCheckPayload).subscribe(response=>{
    if(response){
      this.orderRuleDto = response;
      this.tags = this.orderRuleDto.tags;
      if(this.tags){
      this.tradeTagsComponent.tags = this.tags;
      }
    }
  }, error => {
    console.log("Error "+error);
  });
}

loadExistingOrderRules(){
  // this.data.ruleCheckPayload.orderId = '24070800145772';
this._orderService.getExistingRules(this.data.ruleCheckPayload.orderId).subscribe(response=>{
  if(response){
    this.orderRuleDto = response;
    this.tags = this.orderRuleDto.tags;
    if(this.tags){
      this.tradeTagsComponent.tags = this.tags;
      }
  }
}, error => {
  console.log("Error "+error);
});
}

loadSummary() {
  this.userStockStatsService.getStockMetricsSummaryResult(Number(this.data.margins.instrument.symbolId)).subscribe(result => {
    if(result){
    this.stockSummaryResult = result;
    }
  }, error => {
    console.log("Error "+error);
  });
}

  closeModal() {
    this.dialogRef.close();
  }

  orderPlacement(order:any) {
    let orderIds = order.order_id;
    let tags = this.tradeTagsComponent.tags;
    this.orderRuleDto.tags = tags;
    this.dialogRef.close(this.orderRuleDto);
  }

  cancelAllOpenOrders() {
    this.dialogRef.close("Cancel All");
  }

  addTag() {
    this.registeredTags = this.userTagService.getTags();
    console.log('registeredTags', this.registeredTags);
    const dialogRef = this._dialog.open(EditableSelectComponent, {
      disableClose: true,
      width: 'auto',
      data: { title: 'Tag', list: this.registeredTags }
    });

    dialogRef.afterClosed().subscribe((res) => {
      let isTagExist = false;
      let userTag: UserTag = this.userTagService.getUserTagByName(res);
      if (userTag) {
        let tag: TradeTag = new TradeTag(userTag.id);
        if (res) {
          if (this.tags.length > 0) {
            this.tags.filter((x) => {
              if (tag.tagId === x.tagId) {
                isTagExist = true;
                this.toastr.error('This tag already exists', 'Error',
                  {
                    tapToDismiss: false,
                    closeButton: true,
                    disableTimeOut: true
                  });
                return false;
              }
            })
            !isTagExist ? this.tags.push(tag) : ''
          } else {
            this.tags.push(tag);
          }

        }
      } else {
        this.registeredTags.filter((x) => {
          console.log('item', x);
          let val = x !== undefined ? x.toLowerCase() : '';
          if (val === res.toLowerCase()) {
            this.toastr.error('This tag already exists', 'Error',
              {
                tapToDismiss: false,
                closeButton: true,
                disableTimeOut: true
              });
            return;
          }
        })

        this.userTagService.createTag(this.createUserTag(res, undefined)).subscribe(result => {
          this.userTagService.registerTag(result);
          let tag: TradeTag = new TradeTag(result.id);
          this.tags.push(tag);
        });
      }
    });
  }

  createUserTag(tagName: string, tagId: number): UserTag {
    let userTag: UserTag = new UserTag();
    if (tagId) {
      userTag.id = tagId;
    }
    userTag.tag = tagName;
    return userTag;
  }

  deleteTag(tag: TradeTag, ind: number) {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      width: 'auto',
      height: 'auto',
      data: { 'message': 'Are you sure you want to delete tag: ' + 
      // this.getTagName(tag.id) 
      + '?' }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        if (this.tags.length > ind) {
          this.tags.splice(ind, 1);
        }
      }
    });
  }

}