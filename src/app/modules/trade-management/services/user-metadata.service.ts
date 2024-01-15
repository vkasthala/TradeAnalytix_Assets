import { Injectable } from '@angular/core';
import { HttpService } from '../../shared/services/http.service';
import { MindsetType } from '../models/mindset-type.model';
import { SourceType } from '../models/source-type.model';
import { SurroundingType } from '../models/surrounding-type.model';
import { TechnicalIndicator } from '../models/technical-indicator.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { EditableListItem } from '../../shared/models/common/editable-list-item.model';

@Injectable({
  providedIn: 'root'
})
export class UserMetadataService {

  private apiUrl = environment.apiUrl;

  constructor(private httpService: HttpService) { }

  public getMindsetTypes(): Observable<MindsetType[]> {
    return this.httpService.get<MindsetType[]>(this.apiUrl + '/metadata/mindset-types');
  }

  public getTradeSourceTypes(): Observable<SourceType[]> {
    return this.httpService.get<MindsetType[]>(this.apiUrl + '/metadata/trade-source-types');
  }

  public getSurroundingTypes(): Observable<SurroundingType[]> {
    return this.httpService.get<SurroundingType[]>(this.apiUrl + '/metadata/surrounding-event-types');
  }

  public getTechIndicators(): Observable<TechnicalIndicator[]> {
    return this.httpService.get<TechnicalIndicator[]>(this.apiUrl + '/metadata/technical-indicator-types');
  }

}
