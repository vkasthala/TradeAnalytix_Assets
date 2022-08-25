import { Injectable } from '@angular/core';
import { DataSetupService } from '../../settings/services/data-setup.service';
import { MindsetType } from '../../trade-management/models/mindset-type.model';
import { SourceType } from '../../trade-management/models/source-type.model';
import { SurroundingType } from '../../trade-management/models/surrounding-type.model';
import { TechnicalIndicator } from '../../trade-management/models/technical-indicator.model';
import { UserMetadataService } from '../../trade-management/services/user-metadata.service';
import { EditableListItem } from '../models/common/editable-list-item.model';

@Injectable({
  providedIn: 'root'
})
export class UserMetadataStoreService {

  sources: SourceType[] = [];
  events: SurroundingType[] = [];
  mindsets: MindsetType[] = [];
  technicalIndicators: TechnicalIndicator[] = [];
  closeTriggers: EditableListItem[] = [];
  gainLossAttributes: EditableListItem[] = [];
  directions: any[];
  contrarian: any[];
  tradeTypes: any[];

  constructor(private metadataService: UserMetadataService, private dataSetupService: DataSetupService) {
    this.load();
  }

  load() {
    this.loadSourceTypes();
    this.loadMindsets();
    this.loadSurroundingEvents();
    this.loadTechnicalIndicators();
    this.initDirections();
    this.initContrarians();
    this.initTradeTypes();
    this.loadCloseTriggers();
    this.loadGainLLossAttributes();
  }

  loadMindsets() {
    this.metadataService.getMindsetTypes().subscribe(result => {
      this.mindsets = [];
      let mindset: MindsetType = new MindsetType();
      mindset.name = '';
      mindset.id = 0;
      this.mindsets.push(mindset);
      this.mindsets = this.mindsets.concat(result);
    });
  }

  loadSourceTypes() {
    this.metadataService.getTradeSourceTypes().subscribe(result => {
      this.sources = [];
      let source: SourceType = new SourceType();
      source.name = '';
      source.id = 0;
      this.sources.push(source);
      this.sources = this.sources.concat(result);
    });
  }

  loadSurroundingEvents() {
    this.metadataService.getSurroundingTypes().subscribe(result => {
      this.events = [];
      let event: SurroundingType = new SurroundingType();
      event.name = '';
      event.id = 0;
      this.events.push(event);
      this.events = this.events.concat(result);
    });
  }

  loadTechnicalIndicators() {
    this.metadataService.getTechIndicators().subscribe(result => {
      this.technicalIndicators = [];
      let techIndicator: TechnicalIndicator = new TechnicalIndicator();
      techIndicator.name = '';
      techIndicator.id = 0;
      this.technicalIndicators.push(techIndicator);
      this.technicalIndicators = this.technicalIndicators.concat(result);
    });
  }

  loadCloseTriggers() {
    this.dataSetupService.getCloseTriggers().subscribe(result => {
      this.closeTriggers = [];
      let closeTrigger: EditableListItem = new EditableListItem();
      closeTrigger.name = '';
      closeTrigger.id = 0;
      this.closeTriggers.push(closeTrigger);
      this.closeTriggers = this.closeTriggers.concat(result);
    });
  }

  loadGainLLossAttributes() {
    this.dataSetupService.getGainOrLossAttributes().subscribe(result => {
      this.gainLossAttributes = [];
      let gainLossAttribute: EditableListItem = new EditableListItem();
      gainLossAttribute.name = '';
      gainLossAttribute.id = 0;
      this.gainLossAttributes.push(gainLossAttribute);
      this.gainLossAttributes = this.gainLossAttributes.concat(result);
    });
  }

  initDirections() {
    this.directions = [{ id: 1, name: 'Long' }, { id: 2, name: 'Neutral' }, { id: 3, name: 'Short' }, { id: 4, name: 'Custom' }];
  }

  initContrarians() {
    this.contrarian = [{ id: 1, name: 'Yes' }, { id: 2, name: 'No' }];
  }

  initTradeTypes() {
    this.tradeTypes = [{ id: 'planned', name: 'Yes' }, { id: 'impromptu', name: 'No' }];;
  }

  getDynamicFieldDropdownOptions(dropdownId: string): any[] {
    let result: any[] = [];
    if ('sourceId' === dropdownId) {
      result = this.sources;
    } else if ('contrarian' === dropdownId) {
      result = this.contrarian;
    } else if ('direction' === dropdownId) {
      result = this.directions;
    } else if ('technicalIndicatorId' === dropdownId) {
      result = this.technicalIndicators;
    } else if ('surroundingEventId' === dropdownId) {
      result = this.events;
    } else if ('tradeType' === dropdownId) {
      result = this.tradeTypes;
    } else if ('mindsetId' === dropdownId) {
      result = this.mindsets;
    } else if ('closeSourceId' === dropdownId) {
      result = this.closeTriggers;
    } else if ('closeSurroundingEventId' === dropdownId) {
      result = this.gainLossAttributes;
    }
    return result;
  }

}
