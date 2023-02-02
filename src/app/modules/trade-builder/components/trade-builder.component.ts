import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IMyDrpOptions, IMyDateRangeModel } from 'mydaterangepicker';
import { StrategyType } from '../../shared/models/trade-management/strategy-type.enum';
import { StrategyCreateService } from '../../shared/services/strategy-create.service';
import { TradeStatus } from '../../shared/models/trade-management/trade-status.enum';
import { TradeDirection } from '../../shared/models/trade-management/trade-direction.enum';
import { TradeSearchComponent } from '../../trade-management/components/add-trade/Steps/search-trade/trade-search.component';
import { FormGroup, FormControl } from '@angular/forms';
import { SummaryItem } from '../../shared/models/reports/summary-item.model';
import { SummaryRequest } from '../../shared/models/reports/summary-request.model';
import { ReportDataService } from '../../reports/services/report-data.service';
import { MatDialog } from '@angular/material';
import { DemoModeDetailsService } from '../../shared/services/demo-mode-details.service';
import { DraftTradesGrid } from '../../trade-strategies/components/draft-trades-grid/draft-trades-grid.component';

@Component({
   selector: 'app-trade-builder',
   templateUrl: './trade-builder.component.html',
   styleUrls: ['./trade-builder.component.scss']
})
export class TradeBuilderComponent implements OnInit {
   @ViewChild('draftTradesGrid') private draftTradesGrid: DraftTradesGrid;
   @ViewChild('tradeSearchComponent') private tradeSearchComponent: TradeSearchComponent;

  
   isOpenPositions: boolean = true;
   expandIndex: any;
   showDetailsIndex: any;
   strategyLabel: boolean = true;
   statusLabel: boolean = true;
   showFilters: boolean = false;
   showSearchFilter: boolean = false;


   summaryItems: SummaryItem[] = [];

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
   isDemoMode: boolean = false;
   constructor(
      private router: Router,
      private strategyCreateService: StrategyCreateService,
      private reportDataService: ReportDataService,
      private _dialog: MatDialog,
      private demoService: DemoModeDetailsService,
   ) { }

   ngOnInit() {
      this.isDemoMode = this.demoService.demoMode;
      this.loadSummary();
   }

   loadSummary() {
      let request: SummaryRequest = new SummaryRequest();
      request.summaryType = 'user_trade_summary';
      this.reportDataService.getReportSummary(request).subscribe(result => {
         if (result) {
            this.summaryItems = result;
         }
      });
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

   

   

   onOptionsSelected(event) {
      let value = event.target.value;
      if (value !== '') {
         if (event.target.name == 'strategy') {
            this.strategyLabel = false;
         } else {
            this.statusLabel = false;
         }
      }
   }

   ngAfterViewInit() {

   }

   selectionChange(event) {
      let stepLabel = event.selectedStep.label
      if (stepLabel === "Open Positions") {
         this.isOpenPositions = true
      } else {
         this.isOpenPositions = false
      }
   }

   getSummaryValue(item: SummaryItem) {
      let val: any = item.value;
      if (!val || val == '') {
         val = item.defaultValue;
      }
      if (typeof (val) === 'number') {
         var num: number = +val;
         return Math.round(num);
      }
      return val;
   }

   
}
