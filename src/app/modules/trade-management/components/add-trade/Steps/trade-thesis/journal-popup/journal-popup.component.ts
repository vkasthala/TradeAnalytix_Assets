import { AfterViewInit, Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { DynamicFieldDto } from 'src/app/modules/settings/models/dynamic-field-dto.model';
import { DataSetupService } from 'src/app/modules/settings/services/data-setup.service';
import { DynamicFieldsService } from 'src/app/modules/settings/services/dynamic-fields.service';
import { UserTagService } from 'src/app/modules/settings/services/user-tag.service';
import { SingleInputModalComponent } from 'src/app/modules/shared/components/modals/single-input-modal/single-input-modal.component';
import { EditableListItem } from 'src/app/modules/shared/models/common/editable-list-item.model';
import { StrategyType } from 'src/app/modules/shared/models/trade-management/strategy-type.enum';
import { TradeTag } from 'src/app/modules/shared/models/trade-management/trade-tag.model';
import { ChubUploadService } from 'src/app/modules/shared/services/chub-upload.service';
import { StrategyCreateService } from 'src/app/modules/shared/services/strategy-create.service';
import { UserMetadataStoreService } from 'src/app/modules/shared/services/user-metadata-store.service';
import { MindsetType } from 'src/app/modules/trade-management/models/mindset-type.model';
import { SourceType } from 'src/app/modules/trade-management/models/source-type.model';
import { SurroundingType } from 'src/app/modules/trade-management/models/surrounding-type.model';
import { TechnicalIndicator } from 'src/app/modules/trade-management/models/technical-indicator.model';
import { TradeChubFile } from 'src/app/modules/trade-management/models/trade-chub-file.model';
import { TradeThesis } from 'src/app/modules/trade-management/models/trade-thesis.model';
import { TradeStrategyService } from 'src/app/modules/trade-management/services/trade-strategy.service';
import { UserMetadataService } from 'src/app/modules/trade-management/services/user-metadata.service';
import { TradeTagsComponent } from '../../trade-tags/trade-tags.component';
import { GenerateChartPopupComponent } from '../generate-chart-popup/generate-chart-popup.component';
import { UploadFilesComponent } from '../upload-files/upload-files.component';

@Component({
  selector: 'app-journal-popup',
  templateUrl: './journal-popup.component.html',
  styleUrls: ['./journal-popup.component.scss']
})
export class JournalPopupComponent implements OnInit, AfterViewInit {

  @ViewChild('tradeTags', { static: false }) tradeTagsComponent: TradeTagsComponent;
  @ViewChild('uploadFiles', { static: false }) uploadFilesComponent: UploadFilesComponent;

  @Output() dropdownItemAddedEvent = new EventEmitter();

  category: string;
  title: string;
  strategies = StrategyType;
  tags: TradeTag[];
  tradeChubFiles: TradeChubFile[] = [];

  tradeThesis: TradeThesis;

  strategyTypes: String[];
  strategyTypeId: number;
  addTrade: boolean;
  tradeStatus: number;

  constructor(
    public dialogRef: MatDialogRef<JournalPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private strategyCreateService: StrategyCreateService,
    private userMetadataStoreService: UserMetadataStoreService,
    private _dialog: MatDialog,
    private metadataService: UserMetadataService,
    private dataSetupService: DataSetupService,
    private chubUploadService: ChubUploadService,
    private toastr: ToastrService,
    private tradeStrategySevice: TradeStrategyService,
    private dynamicFieldsService: DynamicFieldsService,
    protected userTagService: UserTagService
  ) {
    this.category = data.category;
    this.title = data.title;
    this.strategyTypeId = data.strategyTypeId;
    this.tradeThesis = data.tradeThesis;
    this.tags = data.tags;
    this.tradeChubFiles = data.tradeChubFiles;
    this.addTrade = data.addTrade;
    this.tradeStatus = data.tradeStatus;
  }

  ngAfterViewInit(): void {
    this.tradeTagsComponent.tags = this.tags;
    this.uploadFilesComponent.tradeChubFiles = this.tradeChubFiles;
  }

  ngOnInit() {
    this.strategyTypes = this.strategyCreateService.getStrategies();
    this.loadSourceTypes();
    this.loadTechnicalIndicators();
    this.loadSurroundingEvents();
    this.loadMindsets();
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
      this.loadSourceTypes();
      this.toastr.success('Added new value successfully', 'Success');
    });
  }

  addTechnicalIndicator(value: string, field: DynamicFieldDto) {
    this.dataSetupService.createTechnicalIndicatorType(this.createEditableItem(value)).subscribe(result => {
      this.loadTechnicalIndicators();
      this.toastr.success('Added new value successfully', 'Success');
    });
  }

  addSurroundingEvent(value: string, field: DynamicFieldDto) {
    this.dataSetupService.createSurrEventType(this.createEditableItem(value)).subscribe(result => {
      this.loadSurroundingEvents();
      this.toastr.success('Added new value successfully', 'Success');
    });
  }

  addMindset(value: string, field: DynamicFieldDto) {
    this.dataSetupService.createMindsetType(this.createEditableItem(value)).subscribe(resuly => {
      this.loadMindsets();
      this.toastr.success('Added new value successfully', 'Success');
    });
  }

  createEditableItem(value: string): EditableListItem {
    const itm: EditableListItem = new EditableListItem();
    itm.name = value;
    itm.editable = 1;
    return itm;
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

  loadMindsets() {
    this.metadataService.getMindsetTypes().subscribe(result => {
      let mindsetTypes = [];
      mindsetTypes.push(new MindsetType());
      mindsetTypes = mindsetTypes.concat(result);
      if (!this.tradeThesis.mindsetId) {
        this.tradeThesis.mindsetId = mindsetTypes[0].id;
      }
      this.userMetadataStoreService.mindsets = mindsetTypes;
      /*
      if (field) {
        this.updateDropdownValues(field, mindsetTypes);
      }
      */
    });
  }

  loadSourceTypes() {
    this.metadataService.getTradeSourceTypes().subscribe(result => {
      let sourceTypes: SourceType[] = [];
      sourceTypes.push(new SourceType());
      sourceTypes = sourceTypes.concat(result);
      if (!this.tradeThesis.sourceId) {
        this.tradeThesis.sourceId = sourceTypes[0].id;
      }
      this.userMetadataStoreService.sources = sourceTypes;
      /*
      if (field) {
        this.updateDropdownValues(field, sourceTypes);
      }
      */
    });
  }

  loadSurroundingEvents() {
    this.metadataService.getSurroundingTypes().subscribe(result => {
      let surroundingTypes: SurroundingType[] = [];
      surroundingTypes.push(new SurroundingType());
      surroundingTypes = surroundingTypes.concat(result);

      if (!this.tradeThesis.surroundingEventId) {
        this.tradeThesis.surroundingEventId = surroundingTypes[0].id;
      }
      this.userMetadataStoreService.events = surroundingTypes;
      /*
      if (field) {
        this.updateDropdownValues(field, surroundingTypes);
      }
      */
    });
  }

  loadTechnicalIndicators() {
    this.metadataService.getTechIndicators().subscribe(result => {
      let technicalIndicators: TechnicalIndicator[] = [];
      technicalIndicators.push(new TechnicalIndicator());
      technicalIndicators = technicalIndicators.concat(result);
      if (!this.tradeThesis.technicalIndicatorId) {
        this.tradeThesis.technicalIndicatorId = technicalIndicators[0].id;
      }
      this.userMetadataStoreService.technicalIndicators = technicalIndicators;
      /*
      if (field) {
        this.updateDropdownValues(field, technicalIndicators);
      }
      */
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

  updateDropdownValues(field: DynamicFieldDto, values: any[]) {
    this.dropdownItemAddedEvent.emit(field);
  }

  closeModal() {
    this.dialogRef.close();
  }

  saveFieldSettings() {
    this.dialogRef.close({
      strategyTypeId: this.strategyTypeId,
      tradeThesis: this.tradeThesis,
      tags: this.tradeTagsComponent.tags,
      tradeChubFiles: this.tradeChubFiles
    });
  }

}