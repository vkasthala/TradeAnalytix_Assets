import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { HttpService } from '../../shared/services/http.service';
import { DynamicFieldDto } from '../models/dynamic-field-dto.model';
import { DynamicFieldUpdateDto } from '../models/dynamic-field-update-dto.model';

@Injectable({
  providedIn: 'root'
})
export class DynamicFieldsService {

  private apiUrl = environment.apiUrl;

  constructor(private httpService: HttpService) { }

  public getUserDynamicFields(category: string): Observable<DynamicFieldDto[]> {
    return this.httpService.get<DynamicFieldDto[]>(this.apiUrl + '/settings/user-fields/' + category);
  }

  public updateFieldStatus(updateDtos: DynamicFieldUpdateDto[]): Observable<void> {
    return this.httpService.post<DynamicFieldUpdateDto[], void>(this.apiUrl + '/settings/update-field-status', updateDtos);
  }

}
