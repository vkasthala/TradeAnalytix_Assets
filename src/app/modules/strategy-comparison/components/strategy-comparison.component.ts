import { Component, Input, OnInit } from '@angular/core';
// import { UpdateStockPricePopupComponent } from './update-stock-price-popup/update-stock-price-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EditStrategyComponent } from 'src/app/modules/shared/components/modals/edit-strategy/edit-strategy.component';
import { StrategyDetailsComponent } from 'src/app/modules/shared/components/modals/strategy-details/strategy-details.component';
import { StrategyInput } from '../../compare-strategies/models/strategy-input.model';
import { CompareStrategiesService } from '../../compare-strategies/services/compare-strategies.service';
import { StockSymbol } from '../../shared/models/trade-management/stock-symbol.model';
import { UserStockSummary } from '../../shared/models/trade-management/user-stock-summary.model';
import { UserStockStatsService } from '../../shared/services/user-stock-stats.service';


@Component({
  selector: 'app-strategy-comparison',
  templateUrl: './strategy-comparison.component.html',
  styleUrls: ['./strategy-comparison.component.scss']
})


export class StrategyComparison implements OnInit {
  @Input('matTooltipShowDelay') showDelay: number;
  @Input('matTooltipHideDelay') hideDelay: number;

  currentState: number = 1;

  selectedStock: StockSymbol = new StockSymbol();
  stockSummary: UserStockSummary = new UserStockSummary();

  step = 0;
  panelOpenState = false;
  panelDisabled = true;
  panel3Disabled = true;
  panelExpand = false;
  detailSummaryLoaded: boolean = false;

  userStrategies: StrategyInput[] = [];
  strategiesList: StrategyInput[] = [];

  constructor(
    private userStockStatsService: UserStockStatsService,
    private compareStrategyService: CompareStrategiesService,
    private toastr: ToastrService,
    private _dialog: MatDialog) {
  }

  ngOnInit() {

  }

  enterSymbol() {
    if (!this.selectedStock || !this.selectedStock.code) {
      this.toastr.error('Please enter a valid symbol to proceed', '');
      return false;
    }
    this.currentState++;
  }

  symbolSelectEventHandler($event: any) {
    this.selectedStock = $event;
    this.loadStockBriefSummary();
    this.loadUserStrategies();
  }

  loadUserStrategies() {
    //Load strategies
    this.compareStrategyService.getStrategiesList(this.selectedStock.id).subscribe(result => {
      this.userStrategies = result;
      /*if (result.length > 0) {
        this.strategiesList[0] = result[0];
      }
      if (result.length > 1) {
        this.strategiesList[1] = result[1];
      }*/
    })
  }

  addStrategy() {
    if (this.strategiesList.length < 5) {
      if (this.userStrategies.length > 0) {
        this.strategiesList.push(this.userStrategies[0]);
      }
    }
  }

  loadMoreStatsHandler($event: any) {
    console.log('load more stats:', $event);
    this.loadStockDetailSummary();
  }

  loadStockBriefSummary() {
    this.userStockStatsService.getUserStockBriefSummary(this.selectedStock.id, 1).subscribe(result => {
      this.stockSummary = result;
    });
  }

  loadStockDetailSummary() {
    this.userStockStatsService.getUserStockDetailSummary(this.selectedStock.id, 1).subscribe(result => {
      this.detailSummaryLoaded = true;
      this.stockSummary = result;
    });
  }

  checkForDecimalValidation(event) {
    event.target.value = parseFloat(event.target.value).toFixed(2);
  }

  deleteStrategyItem(index: number) {
    this.strategiesList.splice(index, 1);
  }

  enforceMaxLength($event, min, max) {
    let t = $event.target;
    if (t.value < min || t.value > max) {
      return false;
    }
  }


  setStep(index: number) {
    // this.step = index;
  }

  afterPanelClosed(event) {
    if (event == 1) {
      this.panelOpenState = false;
    }

    this.panelExpand = false;
  }

  afterPanelOpened() {
    console.log("Panel opened!");
  }

  editStrategyItem(index) {
    const dialogRef = this._dialog.open(EditStrategyComponent, {
      disableClose: false,
      width: 'auto',
      // data: dialogData
    });
    dialogRef.afterClosed().subscribe((res) => {
      console.log('here...', res);
    });
  }

  StrategyDetailsModal(index) {
    const dialogRef = this._dialog.open(StrategyDetailsComponent, {
      disableClose: false,
      width: 'auto',
      // data: dialogData
    });
    dialogRef.afterClosed().subscribe((res) => {
      console.log('here...', res);
    });
  }

}

