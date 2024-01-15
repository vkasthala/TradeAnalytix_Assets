import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Brokerage } from '../../import-trades-history/models/brokerage.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class BrokerageService {

  private apiUrl = environment.apiUrl;

  private brokerages: Brokerage[] = [];

  private autoBrokerages: Brokerage[] = [];
  
  constructor(private httpService: HttpService) { }

  public getBrokerages(): Observable<Brokerage[]> {
    if (this.brokerages.length) {
      return new Observable(subscriber => subscriber.next(this.brokerages));
    } else {
      let observable: Observable<Brokerage[]> = this.httpService.get<Brokerage[]>(this.apiUrl + '/brokerages');
      observable.subscribe(result => {
        this.brokerages = result;
      });
      return observable;
    }
  }

  public getAutoBrokerages(): Observable<Brokerage[]> {
    if (this.autoBrokerages.length) {
      return new Observable(subscriber => subscriber.next(this.autoBrokerages));
    } else {
      let observable: Observable<Brokerage[]> = this.httpService.get<Brokerage[]>(this.apiUrl + '/api-brokerages');
      observable.subscribe(result => {
        this.autoBrokerages = result;
      });
      return observable;
    }
  }

}
