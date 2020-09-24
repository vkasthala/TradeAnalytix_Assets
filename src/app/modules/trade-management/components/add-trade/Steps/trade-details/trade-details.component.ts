import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ActionType } from 'src/app/modules/shared/models/trade-management/action-type.enum';
import { OptionEntry } from 'src/app/modules/shared/models/trade-management/option-entry.model';
import { OptionType } from 'src/app/modules/shared/models/trade-management/option-type.enum';
import { StockEntry } from 'src/app/modules/shared/models/trade-management/stock-entry.model';
import { StockSymbol } from 'src/app/modules/shared/models/trade-management/stock-symbol.model';
import { StrategyTemplate } from 'src/app/modules/shared/models/trade-management/strategy-template.model';
import { StrategyType } from 'src/app/modules/shared/models/trade-management/strategy-type.enum';
import { TradeInputData } from 'src/app/modules/shared/models/trade-management/trade-input-data.model';
import { UserStockSummary } from 'src/app/modules/shared/models/trade-management/user-stock-summary.model';
import { StrategyCreateServiceService } from 'src/app/modules/shared/services/strategy-create-service.service';
import { UtilService } from 'src/app/modules/utilities/services/util.service';


@Component({
  selector: 'app-trade-details',
  templateUrl: './trade-details.component.html',
  styleUrls: ['./trade-details.component.scss']
})
export class TradeDetailsComponent implements OnInit {

  addTrade: boolean = true;

  currentState: number = 1;
  stockAdded: boolean;

  strategies = StrategyType;
  strategyTypes: String[] = this.strategyCreateServiceService.getStrategies();

  @Output('nextStep') nextStep = new EventEmitter();
  @Output('activateRisk') activateRisk = new EventEmitter();

  @Input('stockSummary') stockSummary: UserStockSummary;
  @Input("selectedStock") selectedStock: StockSymbol;
  @Input("stockEntry") stockEntry: StockEntry;
  @Input("stockOptions") stockOptions: OptionEntry[];
  @Input("selectedStrategy") selectedStrategy: number;

  constructor(private utilService: UtilService,
    private strategyCreateServiceService: StrategyCreateServiceService,
    private router: Router) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {

  }

  enterSymbol() {
    this.currentState++;
  }

  addStock() {
    this.stockAdded = true;
    this.createStockEntry();
  }

  addOption() {
    if (this.stockOptions.length < 4) {
      this.stockOptions.push(this.createStockOptionEntry())
    }
  }

  next() {
    this.nextStep.emit()
  }

  deleteStock() {
    this.stockAdded = false;
  }

  deleteStockOption(index) {
    this.stockOptions.splice(index, 1);

  }

  onStrategyTypeChange(strategy: Number) {
    console.log('selected strategy:', strategy);
    let template: StrategyTemplate = this.strategyCreateServiceService.getStrategyTemplate(strategy);
    if (template) {
      this.stockEntry = template.stockEntry;
      this.stockAdded = template.stockEntry ? true : false;
      this.stockOptions = template.optionEntries;
    }
  }

  navigateToRiskAnalysis(): void {
    let extras: NavigationExtras = {};
    let input: TradeInputData = {
      stockEntry: this.stockEntry,
      stockOptions: this.stockOptions,
      stockSummary: this.stockSummary,
      selectedStock: this.selectedStock,
      strategyType: this.selectedStrategy
    };
    extras.state = input;
    this.router.navigate(['/risk-analysis'], extras);
  }

  createStockEntry() {
    this.stockEntry = new StockEntry();
    this.stockEntry.lowerBound = -10;
    this.stockEntry.upperBound = 10;
    this.stockEntry.riskFreeRate = 6;
    this.stockEntry.actionType = ActionType["Buy to Open"];
  }

  createStockOptionEntry(): OptionEntry {
    let option: OptionEntry = new OptionEntry();
    option.actionType = ActionType["Buy to Open"];
    option.optionType = OptionType.Call;
    return option;
  }

  preventNegatives(e, preventDecimal?: boolean) {
    if (preventDecimal) {
      if (!((e.keyCode > 95 && e.keyCode < 106)
        || (e.keyCode > 47 && e.keyCode < 58)
        || e.keyCode == 8 || e.keyCode == 17 || e.keyCode == 110)) {
        if (e.keyCode != 190 && e.keyCode != 46 && e.keyCode != 37 && e.keyCode != 39 && e.keyCode != 9) {
          return false;
        } else {
          return true;
        }
      }
    } else {
      if (!((e.keyCode > 95 && e.keyCode < 106)
        || (e.keyCode > 47 && e.keyCode < 58)
        || e.keyCode == 8)) {
        if (e.keyCode != 190 && e.keyCode != 46 && e.keyCode != 37 && e.keyCode != 39 && e.keyCode != 9) {
          return false;
        } else {
          return true;
        }
      }
    }
  }

}
