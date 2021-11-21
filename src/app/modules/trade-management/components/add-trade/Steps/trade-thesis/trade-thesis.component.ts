import { Component, EventEmitter, OnInit, ElementRef, Output, Input, Renderer2, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SingleInputModalComponent } from 'src/app/modules/shared/components/modals/single-input-modal/single-input-modal.component';
import { MindsetType } from 'src/app/modules/trade-management/models/mindset-type.model';
import { SourceType } from 'src/app/modules/trade-management/models/source-type.model';
import { SurroundingType } from 'src/app/modules/trade-management/models/surrounding-type.model';
import { TechnicalIndicator } from 'src/app/modules/trade-management/models/technical-indicator.model';
import { UserMetadataService } from 'src/app/modules/trade-management/services/user-metadata.service';
import { TradeThesis } from 'src/app/modules/trade-management/models/trade-thesis.model';
import { TradeInputData } from 'src/app/modules/shared/models/trade-management/trade-input-data.model';
import { StockSymbol } from 'src/app/modules/shared/models/trade-management/stock-symbol.model';

import { GenerateChartPopupComponent } from './generate-chart-popup/generate-chart-popup.component';
import { DataSetupService } from 'src/app/modules/settings/services/data-setup.service';
import { EditableListItem } from 'src/app/modules/shared/models/common/editable-list-item.model';
@Component({
  selector: 'app-trade-thesis',
  templateUrl: './trade-thesis.component.html',
  styleUrls: ['./trade-thesis.component.scss']
})
export class TradeThesisComponent implements OnInit, AfterViewInit {

  mindsetTypes: MindsetType[];
  sourceTypes: SourceType[];
  technicalIndicators: TechnicalIndicator[];
  surroundingTypes: SurroundingType[];

  tradeThesis: TradeThesis;
  @ViewChild('thesisTradingview', { static: false }) thesisTradingview: ElementRef;
  @Output('nextStep') nextStep = new EventEmitter();
  @Output('prevStep') prevStep = new EventEmitter();

  @Input("inputState") inputState: TradeInputData;
  @Input("addTrade") addTrade: boolean;
  @Input("editTrade") editTrade: boolean;
  @Input("closeTrade") closeTrade: boolean;
  @Input("viewTrade") viewTrade: boolean;
  @Input() selectedStock: StockSymbol;

  protected hideEntryThesis: boolean = false;
  protected hideClosingThesis: boolean = false;
  constructor(
    private _renderer2: Renderer2,
    private _dialog: MatDialog,
    private metadataService: UserMetadataService,
    private dataSetupService: DataSetupService
  ) {

  }

  ngOnInit() {
    this.tradeThesis = new TradeThesis();
    this.tradeThesis.tradeType = 'planned';
    this.loadMindsets();
    this.loadSourceTypes();
    this.loadSurroundingEvents();
    this.loadTechnicalIndicators();
  }

  ngAfterViewInit(): void {
    console.log('trade thesis child view init:', this.inputState);
    if (this.inputState && this.inputState.tradeStrategy && this.inputState.tradeStrategy.tradeThesis && this.inputState.tradeStrategy.tradeThesis.length > 0) {
      this.tradeThesis = this.inputState.tradeStrategy.tradeThesis[0];
      if (!this.tradeThesis) {
        this.tradeThesis = new TradeThesis();
      }
      if (!this.tradeThesis.tradeType) {
        this.tradeThesis.tradeType = 'planned';
      }
    }
  }

  previous() {
    this.prevStep.emit()
  }

  next() {
    this.nextStep.emit()
  }


  loadMindsets() {
    this.metadataService.getMindsetTypes().subscribe(result => {
      this.mindsetTypes = [];
      this.mindsetTypes.push(new MindsetType());
      this.mindsetTypes = this.mindsetTypes.concat(result);
      if (this.mindsetTypes && this.mindsetTypes.length) {
        if (!this.tradeThesis.mindsetId) {
          this.tradeThesis.mindsetId = this.mindsetTypes[0].id;
        }
      }
    });
  }

  loadSourceTypes() {
    this.metadataService.getTradeSourceTypes().subscribe(result => {
      this.sourceTypes = [];
      this.sourceTypes.push(new SourceType());
      this.sourceTypes = this.sourceTypes.concat(result);
      if (this.sourceTypes && this.sourceTypes.length) {
        if (!this.tradeThesis.sourceId) {
          this.tradeThesis.sourceId = this.sourceTypes[0].id;
        }
      }
    });
  }

  loadSurroundingEvents() {
    this.metadataService.getSurroundingTypes().subscribe(result => {
      this.surroundingTypes = [];
      this.surroundingTypes.push(new SurroundingType());
      this.surroundingTypes = this.surroundingTypes.concat(result);
      if (this.surroundingTypes && this.surroundingTypes.length) {
        if (!this.tradeThesis.surroundingEventId) {
          this.tradeThesis.surroundingEventId = this.surroundingTypes[0].id;
        }
      }
    });
  }

  loadTechnicalIndicators() {
    this.metadataService.getTechIndicators().subscribe(result => {
      this.technicalIndicators = [];
      this.technicalIndicators.push(new TechnicalIndicator());
      this.technicalIndicators = this.technicalIndicators.concat(result);
      if (this.technicalIndicators && this.technicalIndicators.length) {
        if (!this.tradeThesis.technicalIndicatorId) {
          this.tradeThesis.technicalIndicatorId = this.technicalIndicators[0].id;
        }
      }
    });
  }

  addValue(value) {
    const dialogRef = this._dialog.open(SingleInputModalComponent, {
      disableClose: true,
      width: 'auto',
      data: { title: value }
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (!res || res === '') {
        return;
      }
      if ('Source' === value) {
        this.addSource(res);
      } else if ('Technical Indicator' === value) {
        this.addTechnicalIndicator(res);
      } else if ('Surrounding Type' === value) {
        this.addSurroundingEvent(res);
      } else if ('Mindset' === value) {
        this.addMindset(res);
      }
    });
  }

  addSource(value: string) {
    this.dataSetupService.createSourceType(this.createEditableItem(value)).subscribe(result => {
      this.loadSourceTypes();
    });
  }

  addTechnicalIndicator(value: string) {
    this.dataSetupService.createTechnicalIndicatorType(this.createEditableItem(value)).subscribe(result => {
      this.loadTechnicalIndicators();
    });
  }

  addSurroundingEvent(value: string) {
    this.dataSetupService.createSurrEventType(this.createEditableItem(value)).subscribe(result => {
      this.loadSurroundingEvents();
    });
  }

  addMindset(value: string) {
    this.dataSetupService.createMindsetType(this.createEditableItem(value)).subscribe(resuly => {
      this.loadMindsets();
    });
  }

  createEditableItem(value: string): EditableListItem {
    const itm: EditableListItem = new EditableListItem();
    itm.name = value;
    itm.editable = 1;
    return itm;
  }

  showEntryThesis() {
    this.hideEntryThesis = !this.hideEntryThesis;
  }

  showClosingThesis() {
    this.hideClosingThesis = !this.hideClosingThesis;
  }

  generateChart() {
    const dialogRef = this._dialog.open(GenerateChartPopupComponent, {
      disableClose: true,
      width: 'auto',
      data: {
        title: 'Generate Chart',
        selectedStock: this.selectedStock
      }
    });
  }
  addEvent(input: any, event: any, index: number) {
    this.tradeThesis['holdingPeriod'] = event.value._d;
  }

}
