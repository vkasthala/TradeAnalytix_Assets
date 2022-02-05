import { Injectable } from '@angular/core';
import { UserTag } from '../../settings/models/user-tag.model';
import { UserTagService } from '../../settings/services/user-tag.service';
import { MindsetType } from '../../trade-management/models/mindset-type.model';
import { SourceType } from '../../trade-management/models/source-type.model';
import { SurroundingType } from '../../trade-management/models/surrounding-type.model';
import { TechnicalIndicator } from '../../trade-management/models/technical-indicator.model';
import { UserMetadataService } from '../../trade-management/services/user-metadata.service';

@Injectable({
  providedIn: 'root'
})
export class UserMetadataStoreService {

  sources: SourceType[] = [];
  events: SurroundingType[] = [];
  mindsets: MindsetType[] = [];
  technicalIndicators: TechnicalIndicator[] = [];
  directions: any[];
  contrarian: any[];

  constructor(private metadataService: UserMetadataService) {
    this.load();
  }

  load() {
    this.loadSourceTypes();
    this.loadMindsets();
    this.loadSurroundingEvents();
    this.loadTechnicalIndicators();
    this.initDirections();
    this.initContrarians();
  }

  loadMindsets() {
    this.metadataService.getMindsetTypes().subscribe(result => {
      this.mindsets = result;
    });
  }

  loadSourceTypes() {
    this.metadataService.getTradeSourceTypes().subscribe(result => {
      this.sources = result;
    });
  }

  loadSurroundingEvents() {
    this.metadataService.getSurroundingTypes().subscribe(result => {
      this.events = result;
    });
  }

  loadTechnicalIndicators() {
    this.metadataService.getTechIndicators().subscribe(result => {
      this.technicalIndicators = result;
    });
  }

  initDirections() {
    this.directions = [{ id: 1, name: 'Long' }, { id: 2, name: 'Neutral' }, { id: 3, name: 'Short' }, { id: 4, name: 'Custom' }];
  }

  initContrarians() {
    this.contrarian = [{ id: 1, name: 'Yes' }, { id: 2, name: 'No' }];
  }

}
