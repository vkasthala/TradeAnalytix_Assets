import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from '../../shared/services/http.service';
import { Observable } from 'rxjs';
import { EditableListItem } from '../../shared/models/common/editable-list-item.model';
import { BockerageCommission } from '../models/brockerage-commission.model';

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

  public getBrokerageCommissions(): Observable<BockerageCommission[]> {
    return this.httpService.get<BockerageCommission[]>(this.apiUrl + '/metadata/brokerage-commissions');
  }

  public createSourceType(item: EditableListItem): Observable<void> {
    return this.httpService.post<EditableListItem, void>(this.apiUrl + '/metadata/trade-source-type', item);
  }

  public updateSourceType(item: EditableListItem): Observable<void> {
    return this.httpService.put<EditableListItem, void>(this.apiUrl + '/metadata/trade-source-type', item);
  }

  public deleteSourceType(itemId: number): Observable<void> {
    return this.httpService.post<void, void>(this.apiUrl + '/metadata/trade-source-type/' + itemId, null);
  }

  public createTechnicalIndicatorType(item: EditableListItem): Observable<void> {
    return this.httpService.post<EditableListItem, void>(this.apiUrl + '/metadata/technical-indicator-type', item);
  }

  public updateTechnicalIndicatorType(item: EditableListItem): Observable<void> {
    return this.httpService.put<EditableListItem, void>(this.apiUrl + '/metadata/technical-indicator-type', item);
  }

  public deleteTechnicalIndicatorType(itemId: number): Observable<void> {
    return this.httpService.post<void, void>(this.apiUrl + '/metadata/technical-indicator-type/' + itemId, null);
  }

  public createMindsetType(item: EditableListItem): Observable<void> {
    return this.httpService.post<EditableListItem, void>(this.apiUrl + '/metadata/mindset-type', item);
  }

  public updateMindsetType(item: EditableListItem): Observable<void> {
    return this.httpService.put<EditableListItem, void>(this.apiUrl + '/metadata/mindset-type', item);
  }

  public deleteMindsetType(itemId: number): Observable<void> {
    return this.httpService.post<void, void>(this.apiUrl + '/metadata/mindset-type/' + itemId, null);
  }

  public createSurrEventType(item: EditableListItem): Observable<void> {
    return this.httpService.post<EditableListItem, void>(this.apiUrl + '/metadata/surrounding-event-type', item);
  }

  public updateSurrEventType(item: EditableListItem): Observable<void> {
    return this.httpService.put<EditableListItem, void>(this.apiUrl + '/metadata/surrounding-event-type', item);
  }

  public deleteSurrEventType(itemId: number): Observable<void> {
    return this.httpService.post<void, void>(this.apiUrl + '/metadata/surrounding-event-type/' + itemId, null);
  }

  public createBrokerageCommission(item: BockerageCommission): Observable<void> {
    return this.httpService.post<BockerageCommission, void>(this.apiUrl + '/metadata/brokerage-commission', item);
  }

  public updateBrokerageCommission(item: BockerageCommission): Observable<void> {
    return this.httpService.put<BockerageCommission, void>(this.apiUrl + '/metadata/brokerage-commission', item);
  }

  public deleteBrokerageCommission(itemId: number): Observable<void> {
    return this.httpService.post<void, void>(this.apiUrl + '/metadata/brokerage-commission/' + itemId, null);
  }

}
