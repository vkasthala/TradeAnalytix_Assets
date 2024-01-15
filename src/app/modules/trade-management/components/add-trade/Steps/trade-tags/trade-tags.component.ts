import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';


import { StockEntry } from 'src/app/modules/shared/models/trade-management/stock-entry.model';
import { StockSymbol } from 'src/app/modules/shared/models/trade-management/stock-symbol.model';

import { StrategyType } from 'src/app/modules/shared/models/trade-management/strategy-type.enum';

import { UserStockSummary } from 'src/app/modules/shared/models/trade-management/user-stock-summary.model';

import { UtilService } from 'src/app/modules/utilities/services/util.service';
import { of, Subject } from 'rxjs';
import { StockLegHistory } from 'src/app/modules/trade-management/models/stock-leg-history.model';
import { OptionLegHistory } from 'src/app/modules/trade-management/models/option-leg-history.model';
import { TradeTag } from 'src/app/modules/shared/models/trade-management/trade-tag.model';

import { UserTagService } from 'src/app/modules/settings/services/user-tag.service';
import { UserTag } from 'src/app/modules/settings/models/user-tag.model';
import { EditableSelectComponent } from '../editable-select/editable-select.component';
import { TradeInputData } from 'src/app/modules/shared/models/trade-management/trade-input-data.model';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogComponent } from 'src/app/modules/shared/components/modals/confirm-dialog/confirm-dialog.component';
import { SingleInputModalComponent } from 'src/app/modules/shared/components/modals/single-input-modal/single-input-modal.component';


@Component({
  selector: 'app-trade-tags',
  templateUrl: './trade-tags.component.html',
  styleUrls: ['./trade-tags.component.scss'],
})
export class TradeTagsComponent implements OnInit {

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  currentState: number = 1;

  stockAdded: boolean;

  strategies = StrategyType;

  @Input("inputState") inputState: TradeInputData;
  @Input('stockSummary') stockSummary: UserStockSummary;
  @Input("selectedStock") selectedStock: StockSymbol;
  @Input("StockPosition") StockPosition: any;

  @Input("addTrade") addTrade: boolean;
  @Input("editTrade") editTrade: boolean;
  @Input("closeTrade") closeTrade: boolean;
  @Input("viewTrade") viewTrade: boolean;
  @Input("strategyTypeChangeSubject") strategyTypeChangeSubject: Subject<number> = new Subject<number>();
  @Input("stockOrOptionAddedSubject") stockOrOptionAddedSubject: Subject<boolean> = new Subject<boolean>();
  @Input("localStockClosedSubject") localStockClosedSubject: Subject<StockLegHistory> = new Subject<StockLegHistory>();
  @Input("localOptionClosedSubject") localOptionClosedSubject: Subject<OptionLegHistory> = new Subject<OptionLegHistory>();


  tradeStatus: number;
  lastUpdatedDate: string;
  tags: TradeTag[] = [];
  previousReturn: number = 0;
  registeredTags: any = [];


  constructor(
    protected utilService: UtilService,
    protected userTagService: UserTagService,
    protected router: Router,
    protected _dialog: MatDialog,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit() {
    
  }

  ngAfterViewInit(): void {
    if (this.inputState) {
      this.tags = this.inputState.tradeStrategy.tradeTag ? this.inputState.tradeStrategy.tradeTag : [];
    }
  }

  ngAfterContentInit() {

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
                this.toastr.error('This tag already added', 'Error',
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
            this.toastr.error('This tag already exist', 'Error',
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

  editTag(tag: TradeTag) {
    const dialogRef = this._dialog.open(SingleInputModalComponent, {
      disableClose: true,
      width: 'auto',
      data: { title: 'Tag', value: this.getTagName(tag.tagId) }
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res && res.length > 0) {
        this.userTagService.updateTag(this.createUserTag(res, tag.id)).subscribe(result => {
          this.userTagService.registerTag(result);
          tag.tagId = result.id;
        });
      }
    });
  }

  deleteTag(tag: TradeTag, ind: number) {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      width: 'auto',
      height: 'auto',
      data: { 'message': 'Are you sure you want to delete tag: ' + this.getTagName(tag.id) + '?' }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        if (this.tags.length > ind) {
          this.tags.splice(ind, 1);
        }
      }
    });
  }

  getTagName(id: number): string {
    return this.userTagService.getTagNameById(id);
  }

  createUserTag(tagName: string, tagId: number): UserTag {
    let userTag: UserTag = new UserTag();
    if (tagId) {
      userTag.id = tagId;
    }
    userTag.tag = tagName;
    return userTag;
  }

  getCommaSeperatedTagNames() {
    let arr = [];
    this.tags.forEach( tag => {
      arr.push(this.getTagName(tag.tagId));
    })
    return arr.toString();
  }

  @Output() eventChange = new EventEmitter<Event>();

  onClick(event: Event) {
    this.eventChange.emit(event);
  }

}
