import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserTagService } from 'src/app/modules/settings/services/user-tag.service';
import { StrategyCreateService } from 'src/app/modules/shared/services/strategy-create.service';
import { UtilService } from 'src/app/modules/utilities/services/util.service';
import { TradeDetailsComponent } from '../../trade-details/trade-details.component';

@Component({
  selector: 'app-mobile-trade-details',
  templateUrl: './mobile-trade-details.component.html',
  styleUrls: ['./mobile-trade-details.component.scss']
})
export class MobileTradeDetailsComponent extends TradeDetailsComponent implements OnInit {

  currentState: number = 1;
  @Output('nextStep') nextStep = new EventEmitter();
  @Input('stockOptions') stockOptions: any[];
  @Input('stockAdded') stockAdded: boolean;
  @Output('updateStockAdded') updateStockAdded = new EventEmitter();
  quantity: number = 10;

  constructor(utilService: UtilService,
    strategyCreateServiceService: StrategyCreateService,
    userTagService: UserTagService,
    router: Router,
    dialog: MatDialog,
    toastr: ToastrService) {
    super(utilService, strategyCreateServiceService, userTagService, router, dialog, toastr);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
  }

  enterSymbol() {
    this.currentState++;
  }

  addStock() {
    super.addMobileStock();
  }

  removeStock() {
    this.stockAdded = false;
    super.deleteStock();
    this.updateStockAdded.emit(false);
  }

  addOption() {
    super.addOption();
  }

  deleteStockOption(index) {
    super.deleteStockOption(index);
  }

  next() {
    this.nextStep.emit()
  }

  increaseStockOptionQuantity(index) {
    let stock = this.stockOptions[index];
    if (stock.quantity >= 0 && stock.quantity < 731) {
      stock.quantity++;
    }
  }

  decreaseStockOptionQuantity(index) {
    let stock = this.stockOptions[index];
    if (stock.quantity >= 0 && stock.quantity < 731) {
      stock.quantity++;
    }
  }

  //Code for handling Mouse Hold event
  name: number = 0;
  timeoutHandler;

  public mouseup() {
    if (this.timeoutHandler) {
      clearInterval(this.timeoutHandler);
      this.name = 0;
      this.timeoutHandler = null;
    }
  }

  /*
  * @mousedown 'Requires operation field which is the operation to be performed on mouse hold'
  */
  public mousedown(operations, index?) {
    this.timeoutHandler = setInterval(() => {
      switch (operations) {
        case 'increaseQuantity': this.increaseQuantity(); break;
        case 'decreaseQuantity': this.decreaseQuantity(); break;
        case 'increaseStockOptionQuantity': this.increaseStockOptionQuantity(index); break;
        case 'decreaseStockOptionQuantity': this.decreaseStockOptionQuantity(index); break;
      }
      this.name += 1;
    }, 100);
  }

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity == 0) return;

    this.quantity--;
  }

  preventNegatives(e, preventDecimal?: boolean) {

    if (preventDecimal) {
      if (!((e.keyCode > 95 && e.keyCode < 106)
        || (e.keyCode > 47 && e.keyCode < 58)
        || e.keyCode == 8 || e.keyCode == 17 || e.keyCode == 110)) {
        if (e.keyCode != 190) {
          return false;
        } else {
          return true;
        }
      }
    } else {
      if (!((e.keyCode > 95 && e.keyCode < 106)
        || (e.keyCode > 47 && e.keyCode < 58)
        || e.keyCode == 8)) {
        if (e.keyCode != 190) {
          return false;
        } else {
          return true;
        }
      }
    }
  }

  checkForDecimalValidation(event) {
    event.target.value = parseFloat(event.target.value).toFixed(2);
  }

}
