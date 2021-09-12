import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IMyDrpOptions, IMyDateRangeModel } from 'mydaterangepicker';
import { StrategyType } from '../../shared/models/trade-management/strategy-type.enum';
import { StrategyCreateService } from '../../shared/services/strategy-create.service';
import { StrategiesGridFilter } from '../models/strategies-grid-filter.model';
import { StrategiesGridPage } from '../models/strategies-grid-page.model';
import { StrategiesGridSort } from '../models/strategies-grid-sort.model';
import { TradeStrategiesGrid } from './trade-strategies-grid/trade-strategies-grid';
import { PortfolioGrid } from './portfolio-grid/portfolio-grid.component';
import { DraftTradesGrid } from './draft-trades-grid/draft-trades-grid.component';
import { HistoryGrid } from './history-grid/history-grid.component';
import { TradeStatus } from '../../shared/models/trade-management/trade-status.enum';
import { TradeDirection } from '../../shared/models/trade-management/trade-direction.enum';
import { TradeSearchComponent } from '../../trade-management/components/add-trade/Steps/search-trade/trade-search.component';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
   selector: 'app-trade-strategies',
   templateUrl: './trade-strategies.component.html',
   styleUrls: ['./trade-strategies.component.scss']
})
export class TradeStrategiesComponent implements OnInit {
   @ViewChild('tradeStrategiesGrid', { static: false }) private tradeStrategiesGrid: TradeStrategiesGrid;
   @ViewChild('portfolioGrid', { static: false }) private portfolioGrid: PortfolioGrid;
   @ViewChild('draftTradesGrid', { static: false }) private draftTradesGrid: DraftTradesGrid;
   @ViewChild('historyGrid', { static: false }) private historyGrid: HistoryGrid;
   @ViewChild('tradeSearchComponent', { static: false }) private tradeSearchComponent: TradeSearchComponent;

   strategiesGridFilter: StrategiesGridFilter = new StrategiesGridFilter();
   strategiesGridPage: StrategiesGridPage = new StrategiesGridPage();
   strategiesGridSort: StrategiesGridSort = new StrategiesGridSort();


   expandIndex: any;
   showDetailsIndex: any;
   strategyLabel: boolean=true;
   statusLabel: boolean=true;
   showFilters: boolean=false;
   showSearchFilter: boolean=false;

   myDateRangePickerOptions: IMyDrpOptions = {
      dateFormat: 'mm-dd-yyyy',
      editableDateRangeField: false,
      ariaLabelInputField: 'Date'
   };

   range = new FormGroup({
      start: new FormControl(),
      end: new FormControl()
    });
   strategies = StrategyType;
   strategyTypes: String[] = this.strategyCreateService.getStrategies();

   tradeStatues = TradeStatus;
   tradeStatusNames: String[] = this.strategyCreateService.getTradeStatuses();

   tradeDirections = TradeDirection;
   tradeDirectionNames: String[] = this.strategyCreateService.getTradeDirections();

   constructor(private router: Router, private strategyCreateService: StrategyCreateService) { }

   ngOnInit() {

   }

   closeTrade(strategyId) {
      this.router.navigate(['dashboard/close-trade/' + strategyId]);
   }

   editTrade(strategyId) {
      this.router.navigate(['dashboard/edit-trade/' + strategyId]);
   }
   viewTrade(strategyId) {
      this.router.navigate(['dashboard/view-trade/' + strategyId]);
   }

   deleteTrade() {

   }

   expandRowOptions(index) {
      this.expandIndex = index;
   }

   closeActionBox() {
      this.expandIndex = null
   }

   expandShowDetails(index) {
      this.showDetailsIndex = this.showDetailsIndex == index ? null : index;
   }

   symbolSelectEventHandler($event) {
      this.strategiesGridFilter.stockCode = $event.code;
   }

   applyFilters() {
      let tradeStrategyGridRequest = this.tradeStrategiesGrid.tradeStrategyGridRequest;
      tradeStrategyGridRequest.filters = this.strategiesGridFilter;
      this.portfolioGrid.reload(tradeStrategyGridRequest.filters);
      this.historyGrid.reload(tradeStrategyGridRequest.filters);
      this.draftTradesGrid.reload(tradeStrategyGridRequest.filters);
   }

   onDateRangeChanged(event: IMyDateRangeModel) {
      if (event.beginJsDate && event.endJsDate) {
         this.strategiesGridFilter.fromDate = event.beginDate.year + '-' + event.beginDate.month + '-' + event.beginDate.day;
         this.strategiesGridFilter.toDate = event.endDate.year + '-' + event.endDate.month + '-' + event.endDate.day;
      } else {
         this.strategiesGridFilter.fromDate = undefined;
         this.strategiesGridFilter.toDate = undefined;
      }
      console.log('trade strategies filter after date range: ', this.strategiesGridFilter);
   }

   clearFilters() {
      let tradeStrategyGridRequest = this.tradeStrategiesGrid.tradeStrategyGridRequest;
      this.tradeSearchComponent.clearSelection();
      tradeStrategyGridRequest.filters = new StrategiesGridFilter();
      this.strategiesGridFilter = new StrategiesGridFilter();
      this.portfolioGrid.reload(this.strategiesGridFilter);
      this.historyGrid.reload(this.strategiesGridFilter);
      this.draftTradesGrid.reload(this.strategiesGridFilter);
   }

   onOptionsSelected(event){
      let value = event.target.value;
      if(value !== ''){
         if(event.target.name == 'strategy'){
            this.strategyLabel = false;
         }else{
            this.statusLabel = false;
         }
      }
   }

   strategiesFilter(){
      this.showFilters = !this.showFilters;
   }
   searchFilter(){
      this.showSearchFilter = !this.showSearchFilter;
   }
  
}
