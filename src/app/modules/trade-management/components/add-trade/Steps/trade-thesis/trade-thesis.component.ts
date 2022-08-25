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
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ChubUploadService } from 'src/app/modules/shared/services/chub-upload.service';
import { TradeStrategyService } from 'src/app/modules/trade-management/services/trade-strategy.service';
import { TradeChubFile } from 'src/app/modules/trade-management/models/trade-chub-file.model';
import { ConfigureFieldsPopupComponent } from 'src/app/modules/shared/components/widgets/configure-fields-popup/configure-fields-popup.component';
import { DynamicFieldDto } from 'src/app/modules/settings/models/dynamic-field-dto.model';
import { DynamicFieldsService } from 'src/app/modules/settings/services/dynamic-fields.service';

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
  closeTriggers: EditableListItem[];
  gainLossAttributes: EditableListItem[];
  tradeChubFiles: TradeChubFile[] = [];
  tradeThesis: TradeThesis;
  entryThesisFields: DynamicFieldDto[] = [];
  exitThesisFields: DynamicFieldDto[] = [];

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
  tradeStatus: number;

  constructor(
    private _renderer2: Renderer2,
    private _dialog: MatDialog,
    private metadataService: UserMetadataService,
    private dataSetupService: DataSetupService,
    private chubUploadService: ChubUploadService,
    private toastr: ToastrService,
    private tradeStrategySevice: TradeStrategyService,
    private dynamicFieldsService: DynamicFieldsService
  ) {

  }

  ngOnInit() {
    this.tradeThesis = new TradeThesis();
    this.tradeThesis.tradeType = 'planned';
    this.loadMindsets();
    this.loadSourceTypes();
    this.loadSurroundingEvents();
    this.loadTechnicalIndicators();
    this.loadCloseTriggers();
    this.loadGainLossAttributes();
    this.loadEntryThesisUiFields();
    this.loadExitThesisUiFields();
  }

  ngAfterViewInit(): void {
    console.log('trade thesis child view init:', this.inputState);
    if (this.inputState && this.inputState.tradeStrategy && this.inputState.tradeStrategy.tradeThesis && this.inputState.tradeStrategy.tradeThesis.length > 0) {
      this.tradeThesis = this.inputState.tradeStrategy.tradeThesis[0];
      this.tradeStatus = this.inputState.tradeStrategy.statusId;
      if (!this.tradeThesis) {
        this.tradeThesis = new TradeThesis();
      }
      if (!this.tradeThesis.tradeType) {
        this.tradeThesis.tradeType = 'planned';
      }
      this.tradeThesis.direction = this.inputState.tradeStrategy.direction;
      if (this.inputState.tradeStrategy.id) {
        this.loadTradeChubFiles(this.inputState.tradeStrategy.id);
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

  loadCloseTriggers() {
    this.dataSetupService.getCloseTriggers().subscribe(result => {
      this.closeTriggers = [];
      this.closeTriggers.push(new EditableListItem());
      this.closeTriggers = this.closeTriggers.concat(result);
      if (this.closeTriggers && this.closeTriggers.length) {
        if (!this.tradeThesis.closeSourceId) {
          this.tradeThesis.closeSourceId = this.closeTriggers[0].id;
        }
      }
    });
  }


  loadGainLossAttributes() {
    this.dataSetupService.getGainOrLossAttributes().subscribe(result => {
      this.gainLossAttributes = [];
      this.gainLossAttributes.push(new EditableListItem());
      this.gainLossAttributes = this.gainLossAttributes.concat(result);
      if (this.gainLossAttributes && this.gainLossAttributes.length) {
        if (!this.tradeThesis.closeSurroundingEventId) {
          this.tradeThesis.closeSurroundingEventId = this.gainLossAttributes[0].id;
        }
      }
    });
  }

  loadTradeChubFiles(strategyId: number) {
    this.tradeStrategySevice.getTradeChubFiles(strategyId).subscribe(result => {
      this.tradeChubFiles = this.tradeChubFiles.concat(result);
      console.log('chub files: ', this.tradeChubFiles);
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
      } else if ('Gain or loss attribute' === value) {
        this.addGainLossAttribute(res);
      } else if ('Trigger for close' === value) {
        this.addCloseTrigger(res);
      }
    });
  }

  addSource(value: string) {
    let isValueExist = false;
    this.sourceTypes.filter((x) => {
      if (value === x.name) {
        isValueExist = true;
        this.toastr.error('Duplicate value. Please provide a new value', 'Error',
          {
            tapToDismiss: false,
            closeButton: true,
            disableTimeOut: true
          });
        return;
      }
    })
    if (!isValueExist) {
      this.dataSetupService.createSourceType(this.createEditableItem(value)).subscribe(result => {
        this.loadSourceTypes();
        this.toastr.success('Added new value successfully', 'Success');
      });
    }
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
    let isValueExist = false;
    this.mindsetTypes.filter((x) => {
      if (value === x.name) {
        isValueExist = true;
        this.toastr.error('Duplicate value. Please provide a new value', 'Error',
          {
            tapToDismiss: false,
            closeButton: true,
            disableTimeOut: true
          });
        return;
      }
    })
    if (!isValueExist) {
      this.dataSetupService.createMindsetType(this.createEditableItem(value)).subscribe(resuly => {
        this.loadMindsets();
        this.toastr.success('Added new value successfully', 'Success');
      });
    }
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

  addCloseTrigger(value: string) {
    let isValueExist = false;
    this.closeTriggers.filter((x) => {
      if (value === x.name) {
        isValueExist = true;
        this.toastr.error('Duplicate value. Please provide a new value', 'Error',
          {
            tapToDismiss: false,
            closeButton: true,
            disableTimeOut: true
          });
        return;
      }
    })
    if (!isValueExist) {
      this.dataSetupService.createCloseTrigger(this.createEditableItem(value)).subscribe(result => {
        this.loadCloseTriggers();
        this.toastr.success('Added new value successfully', 'Success');
      });
    }
  }

  addGainLossAttribute(value: string) {
    let isValueExist = false;
    this.gainLossAttributes.filter((x) => {
      if (value === x.name) {
        isValueExist = true;
        this.toastr.error('Duplicate value. Please provide a new value', 'Error',
          {
            tapToDismiss: false,
            closeButton: true,
            disableTimeOut: true
          });
        return;
      }
    })
    if (!isValueExist) {
      this.dataSetupService.createGainOrLossAttribute(this.createEditableItem(value)).subscribe(result => {
        this.loadGainLossAttributes();
        this.toastr.success('Added new value successfully', 'Success');
      });
    }
  }

  selectFile(event) {
    var selectedFiles: FileList = event.target.files;
    if (selectedFiles) {
      for (var ind = 0; ind < selectedFiles.length; ind++) {
        if (!this.isValidFile(selectedFiles.item(ind))) {
          event.target.value = null;
          break;
        }
        this.chubUploadService.uploadFile(selectedFiles.item(ind)).subscribe(result => {
          var chubFile: TradeChubFile = this.createTradeChubFile(result);
          if (chubFile) {
            this.tradeChubFiles.push(chubFile);
            event.target.value = null;
            console.log('chub files after: ', this.tradeChubFiles);
          }
        });
      }
    }
  }

  isValidFile(file: File): boolean {
    var valid: boolean = true;
    if (!file.name.toLocaleLowerCase().endsWith('.pdf')
      && !file.name.toLocaleLowerCase().endsWith('.png')
      && !file.name.toLocaleLowerCase().endsWith('.jpg')
      && !file.name.toLocaleLowerCase().endsWith('.jpeg')
      && !file.name.toLocaleLowerCase().endsWith('.bmp')
      && !file.name.toLocaleLowerCase().endsWith('.doc')
      && !file.name.toLocaleLowerCase().endsWith('.docx')
      && !file.name.toLocaleLowerCase().endsWith('.xls')
      && !file.name.toLocaleLowerCase().endsWith('.xlsx')
      && !file.name.toLocaleLowerCase().endsWith('.ppt')
      && !file.name.toLocaleLowerCase().endsWith('.pptx')) {
      valid = false;
      this.toastr.error('Please select valid file', 'Invalid File',
        {
          tapToDismiss: false,
          closeButton: true,
          disableTimeOut: true
        });
      return valid;
    }

    if (file.size > 1048576) {
      this.toastr.error('Please select file with size less than 1MB', 'File size exceeded',
        {
          tapToDismiss: false,
          closeButton: true,
          disableTimeOut: true
        });
      valid = false;
    }
    return valid;
  }

  createTradeChubFile(result: any): TradeChubFile {
    if (result.id) {
      var tradeChubFile: TradeChubFile = new TradeChubFile();
      tradeChubFile.chubFileId = result.id;
      tradeChubFile.fileName = result.name;
      return tradeChubFile;
    }
    return undefined;
  }

  deleteFileName(index: number) {
    if (index < this.tradeChubFiles.length) {
      var chubFile: TradeChubFile = this.tradeChubFiles[index];
      if (chubFile) {
        this.deleteChubFile(chubFile, index);
      }
    }
  }

  deleteChubFile(chubFile: TradeChubFile, ind: number) {
    this.chubUploadService.deleteFile(chubFile.chubFileId).subscribe(result => {
      this.tradeChubFiles.splice(ind, 1);
    });
  }

  downloadFile(index: number) {
    if (index < this.tradeChubFiles.length) {
      var chubFile: TradeChubFile = this.tradeChubFiles[index];
      if (chubFile) {
        this.chubUploadService.downloadFile(chubFile.chubFileId, chubFile.fileName);
      }
    }
  }

  openEntryQuestions() {
    const dialogRef = this._dialog.open(ConfigureFieldsPopupComponent, {
      disableClose: true,
      width: 'auto',
      data: {
        title: 'Configure Entry Questions',
        category: 'EntryThesis'
      }
    });
  }

  openExitQuestions() {
    const dialogRef = this._dialog.open(ConfigureFieldsPopupComponent, {
      disableClose: true,
      width: 'auto',
      data: {
        title: 'Configure Exit Questions',
        category: 'ExitThesis'
      }
    });
  }

  loadEntryThesisUiFields() {
    this.dynamicFieldsService.getUserDynamicFields('EntryThesis').subscribe(result => {
      let validFields = [];
      result.forEach(field => {
        if (field.userFieldId && field.userFieldId > 0) {
          validFields.push(field);
        }
      });
      this.entryThesisFields = validFields;
    });
  }

  loadExitThesisUiFields() {
    this.dynamicFieldsService.getUserDynamicFields('ExitThesis').subscribe(result => {
      let validFields = [];
      result.forEach(field => {
        if (field.userFieldId && field.userFieldId > 0) {
          validFields.push(field);
        }
      });
      this.exitThesisFields = validFields;
    });
  }

}
