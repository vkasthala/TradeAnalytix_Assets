import { Injectable } from '@angular/core';
import { HttpService } from '../../shared/services/http.service';
import { OptionData } from '../models/option-data.model';
import { OptionType } from '../../shared/models/trade-management/option-type.enum';
import { stringify } from 'querystring';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExternalFeedService {

  private apiUrl = environment.apiUrl;

  constructor(private httpService: HttpService) { }

  public getOptionData(stockCode: string, stockId: number, expiryDate: string, strikePrice: number, optionType: OptionType): Observable<OptionData> {
    let url = this.apiUrl + '/external-feed/option-data';
    let paramsMap: Map<string, string> = new Map();
    paramsMap.set('stock_id', stockId + '');
    paramsMap.set('stock_code', stockCode);
    paramsMap.set('expiry_date', expiryDate);
    paramsMap.set('strike_price', strikePrice + '');
    paramsMap.set('option_type', optionType + '');
    return this.httpService.getWithParams<OptionData>(url, paramsMap, new Map());
  }

}
