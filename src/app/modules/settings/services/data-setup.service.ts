import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from '../../shared/services/http.service';
import { Observable } from 'rxjs';
import { EditableListItem } from '../../shared/models/common/editable-list-item.model';

@Injectable({
  providedIn: 'root'
})
export class DataSetupService {

  private apiUrl = environment.apiUrl;

  constructor(private httpService: HttpService) { }

  public getMindsetTypes(): Observable<EditableListItem[]> {
    return this.httpService.get<EditableListItem[]>(this.apiUrl + '/metadata/mindset-types');
  }

  public getTradeSourceTypes(): Observable<EditableListItem[]> {
    return this.httpService.get<EditableListItem[]>(this.apiUrl + '/metadata/trade-source-types');
  }

  public getSurroundingTypes(): Observable<EditableListItem[]> {
    return this.httpService.get<EditableListItem[]>(this.apiUrl + '/metadata/surrounding-event-types');
  }

  public getTechIndicators(): Observable<EditableListItem[]> {
    return this.httpService.get<EditableListItem[]>(this.apiUrl + '/metadata/technical-indicator-types');
  }
  
}
