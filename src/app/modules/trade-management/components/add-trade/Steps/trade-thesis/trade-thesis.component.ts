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
import { UserMetadataStoreService } from 'src/app/modules/shared/services/user-metadata-store.service';
import { TradeTag } from 'src/app/modules/shared/models/trade-management/trade-tag.model';
import { UserTagService } from 'src/app/modules/settings/services/user-tag.service';
import { EditableSelectComponent } from '../editable-select/editable-select.component';
import { UserTag } from 'src/app/modules/settings/models/user-tag.model';
import { ConfirmDialogComponent } from 'src/app/modules/shared/components/modals/confirm-dialog/confirm-dialog.component';
import { JournalPopupComponent } from './journal-popup/journal-popup.component';
import { StrategyCreateService } from 'src/app/modules/shared/services/strategy-create.service';
import { StrategyType } from 'src/app/modules/shared/models/trade-management/strategy-type.enum';
import { TradeTagsComponent } from '../trade-tags/trade-tags.component';

@Component({
  selector: 'app-trade-thesis',
  templateUrl: './trade-thesis.component.html',
  styleUrls: ['./trade-thesis.component.scss']
})
export class TradeThesisComponent implements OnInit, AfterViewInit {

  tradeChubFiles: TradeChubFile[] = [];
  tradeThesis: TradeThesis;
  entryThesisFields: DynamicFieldDto[] = [];
  exitThesisFields: DynamicFieldDto[] = [];

  @ViewChild('thesisTradingview', { static: false }) thesisTradingview: ElementRef;
  @ViewChild('tradeTag', { static: false }) tradeTagsComponent: TradeTagsComponent;
  
  @Output('nextStep') nextStep = new EventEmitter();
  @Output('prevStep') prevStep = new EventEmitter();
  @Output() dropdownItemAddedEvent = new EventEmitter();

  @Input("inputState") inputState: TradeInputData;
  @Input("addTrade") addTrade: boolean;
  @Input("editTrade") editTrade: boolean;
  @Input("closeTrade") closeTrade: boolean;
  @Input("viewTrade") viewTrade: boolean;
  @Input() selectedStock: StockSymbol;

  protected hideEntryThesis: boolean = false;
  protected hideClosingThesis: boolean = false;
  tradeStatus: number;
  strategies = StrategyType;
  tags: TradeTag[] = [];
  registeredTags: any = [];
  strategyTypes: String[];
  strategyTypeId: number;

  constructor(
    private _renderer2: Renderer2,
    private _dialog: MatDialog,
    private metadataService: UserMetadataService,
    private dataSetupService: DataSetupService,
    private chubUploadService: ChubUploadService,
    private toastr: ToastrService,
    private tradeStrategySevice: TradeStrategyService,
    private dynamicFieldsService: DynamicFieldsService,
    private userMetadataStoreService: UserMetadataStoreService,
    protected userTagService: UserTagService,
    private strategyCreateService: StrategyCreateService
  ) {

  }

  ngOnInit() {
    this.tradeThesis = new TradeThesis();
    this.tradeThesis.tradeType = 'planned';
    this.strategyTypes = this.strategyCreateService.getStrategies();
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
      this.tradeTagsComponent.tags = this.inputState.tradeStrategy.tradeTag ? this.inputState.tradeStrategy.tradeTag : [];
      this.strategyTypeId = this.inputState.tradeStrategy.strategyTypeId;
    }
  }

  previous() {
    this.prevStep.emit()
  }

  next() {
    this.nextStep.emit()
  }


  loadMindsets(field: DynamicFieldDto) {
    this.metadataService.getMindsetTypes().subscribe(result => {
      let mindsetTypes = [];
      mindsetTypes.push(new MindsetType());
      mindsetTypes = mindsetTypes.concat(result);
      if (!this.tradeThesis.mindsetId) {
        this.tradeThesis.mindsetId = mindsetTypes[0].id;
      }
      this.userMetadataStoreService.mindsets = mindsetTypes;
      if (field) {
        this.updateDropdownValues(field, mindsetTypes);
      }
    });
  }

  loadSourceTypes(field: DynamicFieldDto) {
    this.metadataService.getTradeSourceTypes().subscribe(result => {
      let sourceTypes: SourceType[] = [];
      sourceTypes.push(new SourceType());
      sourceTypes = sourceTypes.concat(result);
      if (!this.tradeThesis.sourceId) {
        this.tradeThesis.sourceId = sourceTypes[0].id;
      }
      this.userMetadataStoreService.sources = sourceTypes;
      if (field) {
        this.updateDropdownValues(field, sourceTypes);
      }
    });
  }

  loadSurroundingEvents(field: DynamicFieldDto) {
    this.metadataService.getSurroundingTypes().subscribe(result => {
      let surroundingTypes: SurroundingType[] = [];
      surroundingTypes.push(new SurroundingType());
      surroundingTypes = surroundingTypes.concat(result);

      if (!this.tradeThesis.surroundingEventId) {
        this.tradeThesis.surroundingEventId = surroundingTypes[0].id;
      }
      this.userMetadataStoreService.events = surroundingTypes;
      if (field) {
        this.updateDropdownValues(field, surroundingTypes);
      }
    });
  }

  loadTechnicalIndicators(field: DynamicFieldDto) {
    this.metadataService.getTechIndicators().subscribe(result => {
      let technicalIndicators: TechnicalIndicator[] = [];
      technicalIndicators.push(new TechnicalIndicator());
      technicalIndicators = technicalIndicators.concat(result);
      if (!this.tradeThesis.technicalIndicatorId) {
        this.tradeThesis.technicalIndicatorId = technicalIndicators[0].id;
      }
      this.userMetadataStoreService.technicalIndicators = technicalIndicators;
      if (field) {
        this.updateDropdownValues(field, technicalIndicators);
      }
    });
  }

  loadCloseTriggers(field: DynamicFieldDto) {
    this.dataSetupService.getCloseTriggers().subscribe(result => {
      let closeTriggers: EditableListItem[] = [];
      closeTriggers.push(new EditableListItem());
      closeTriggers = closeTriggers.concat(result);
      if (!this.tradeThesis.closeSourceId) {
        this.tradeThesis.closeSourceId = closeTriggers[0].id;
      }
      this.userMetadataStoreService.closeTriggers = closeTriggers;
      if (field) {
        this.updateDropdownValues(field, closeTriggers);
      }
    });
  }


  loadGainLossAttributes(field: DynamicFieldDto) {
    this.dataSetupService.getGainOrLossAttributes().subscribe(result => {
      let gainLossAttributes = [];
      gainLossAttributes.push(new EditableListItem());
      gainLossAttributes = gainLossAttributes.concat(result);
      if (!this.tradeThesis.closeSurroundingEventId) {
        this.tradeThesis.closeSurroundingEventId = gainLossAttributes[0].id;
      }
      this.userMetadataStoreService.gainLossAttributes = gainLossAttributes;
      if (field) {
        this.updateDropdownValues(field, gainLossAttributes);
      }
    });
  }

  loadTradeChubFiles(strategyId: number) {
    this.tradeStrategySevice.getTradeChubFiles(strategyId).subscribe(result => {
      this.tradeChubFiles = this.tradeChubFiles.concat(result);
      console.log('chub files: ', this.tradeChubFiles);
    });
  }

  addValue(value, field: DynamicFieldDto) {
    let title: string = value;
    if (field) {
      title = field.displayName;
    }

    const dialogRef = this._dialog.open(SingleInputModalComponent, {
      disableClose: true,
      width: 'auto',
      data: { title: title }
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (!res || res === '') {
        return;
      }
      if ('Source' === value || 'sourceId' === value) {
        this.addSource(res, field);
      } else if ('Technical Indicator' === value || 'technicalIndicatorId' === value) {
        this.addTechnicalIndicator(res, field);
      } else if ('Surrounding Type' === value || 'surroundingEventId' === value) {
        this.addSurroundingEvent(res, field);
      } else if ('Mindset' === value || 'mindsetId' === value) {
        this.addMindset(res, field);
      } else if ('Gain or loss attribute' === value || 'closeSurroundingEventId' === value) {
        this.addGainLossAttribute(res, field);
      } else if ('Trigger for close' === value || 'closeSourceId' === value) {
        this.addCloseTrigger(res, field);
      }
    });
  }

  addSource(value: string, field: DynamicFieldDto) {
    this.dataSetupService.createSourceType(this.createEditableItem(value)).subscribe(result => {
      this.loadSourceTypes(field);
      this.toastr.success('Added new value successfully', 'Success');
    });
  }

  addTechnicalIndicator(value: string, field: DynamicFieldDto) {
    this.dataSetupService.createTechnicalIndicatorType(this.createEditableItem(value)).subscribe(result => {
      this.loadTechnicalIndicators(field);
      this.toastr.success('Added new value successfully', 'Success');
    });
  }

  addSurroundingEvent(value: string, field: DynamicFieldDto) {
    this.dataSetupService.createSurrEventType(this.createEditableItem(value)).subscribe(result => {
      this.loadSurroundingEvents(field);
      this.toastr.success('Added new value successfully', 'Success');
    });
  }

  addMindset(value: string, field: DynamicFieldDto) {
    this.dataSetupService.createMindsetType(this.createEditableItem(value)).subscribe(resuly => {
      this.loadMindsets(field);
      this.toastr.success('Added new value successfully', 'Success');
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

  addCloseTrigger(value: string, field: DynamicFieldDto) {
    this.dataSetupService.createCloseTrigger(this.createEditableItem(value)).subscribe(result => {
      this.loadCloseTriggers(field);
      this.toastr.success('Added new value successfully', 'Success');
    });
  }

  addGainLossAttribute(value: string, field: DynamicFieldDto) {
    this.dataSetupService.createGainOrLossAttribute(this.createEditableItem(value)).subscribe(result => {
      this.loadGainLossAttributes(field);
      this.toastr.success('Added new value successfully', 'Success');
    });

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
    dialogRef.afterClosed().subscribe((res) => {
      this.loadEntryThesisUiFields();
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
    dialogRef.afterClosed().subscribe((res) => {
      this.loadExitThesisUiFields();
    });
  }

  loadEntryThesisUiFields() {
    this.dynamicFieldsService.getUserDynamicFields('EntryThesis').subscribe(result => {
      this.updateEntryThesisFields(result);
    });
  }

  loadExitThesisUiFields() {
    this.dynamicFieldsService.getUserDynamicFields('ExitThesis').subscribe(result => {
      this.updateExitThesisFields(result);
    });
  }

  updateEntryThesisFields(newFields: DynamicFieldDto[]) {
    let resultFields = [];
    newFields.filter(field => field.userFieldId && field.userFieldId > 0).forEach(newField => {
      let matchedFields = this.entryThesisFields.filter(field => field.name === newField.name);
      if (matchedFields.length > 0) {
        resultFields.push(matchedFields[0]);
      } else {
        newField.value = this.tradeThesis[newField.name] ? this.tradeThesis[newField.name] + '' : this.tradeThesis[newField.name];
        newField.changeEvent = this.dropdownItemAddedEvent;
        resultFields.push(newField);
      }
    });
    this.entryThesisFields = resultFields;
  }

  updateExitThesisFields(newFields: DynamicFieldDto[]) {
    let resultFields = [];
    newFields.filter(field => field.userFieldId && field.userFieldId > 0).forEach(newField => {
      let matchedFields = this.exitThesisFields.filter(field => field.name === newField.name);
      if (matchedFields.length > 0) {
        resultFields.push(matchedFields[0]);
      } else {
        newField.value = this.tradeThesis[newField.name] ? this.tradeThesis[newField.name] + '' : this.tradeThesis[newField.name];
        newField.changeEvent = this.dropdownItemAddedEvent;
        resultFields.push(newField);
      }
    });
    this.exitThesisFields = resultFields;
  }

  updateTradeThesisData() {
    this.updateEntryThesisData();
    this.updateExitThesisData();
  }

  updateEntryThesisData() {
    this.entryThesisFields.forEach(field => {
      this.tradeThesis[field.name] = field.value;
    });
  }

  updateExitThesisData() {
    this.exitThesisFields.forEach(field => {
      this.tradeThesis[field.name] = field.value;
    });
  }

  addFieldValue(field: DynamicFieldDto) {
    this.addValue(field.name, field);
  }

  loadDynamicDropdownValues(field: DynamicFieldDto) {
    if ('sourceId' === field.name) {
      this.loadSourceTypes(field);
    } else if ('technicalIndicatorId' === field.name) {
      this.loadTechnicalIndicators(field);
    } else if ('surroundingEventId' === field.name) {
      this.loadSurroundingEvents(field);
    } else if ('mindsetId' === field.name) {
      this.loadMindsets(field);
    } else if ('closeSourceId' === field.name) {
      this.loadCloseTriggers(field);
    } else if ('closeSurroundingEventId' === field.name) {
      this.loadGainLossAttributes(field);
    } else if ('contrarian' === field.name) {
      this.userMetadataStoreService.initContrarians();
      this.updateDropdownValues(field, this.userMetadataStoreService.contrarian);
    } else if ('direction' === field.name) {
      this.userMetadataStoreService.initDirections();
      this.updateDropdownValues(field, this.userMetadataStoreService.directions);
    } else if ('tradeType' === field.name) {
      this.userMetadataStoreService.initTradeTypes();
      this.updateDropdownValues(field, this.userMetadataStoreService.tradeTypes);
    }
  }

  updateDropdownValues(field: DynamicFieldDto, values: any[]) {
    this.dropdownItemAddedEvent.emit(field);
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

  openJournalModal() {
    const dialogRef = this._dialog.open(JournalPopupComponent, {
      disableClose: true,
      width: 'auto',
      data: {
        title: 'Journal',
        category: 'EntryThesis',
        strategyTypeId: this.strategyTypeId,
        tradeThesis: this.tradeThesis,
        tags: this.tradeTagsComponent.tags,
        tradeChubFiles: this.tradeChubFiles
      }
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.strategyTypeId = res.strategyTypeId;
      this.tradeThesis = res.tradeThesis;
      this.tradeTagsComponent.tags = res.tags;
      this.tradeChubFiles = res.tradeChubFiles;
    });
  }

}
