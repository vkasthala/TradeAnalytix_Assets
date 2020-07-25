import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TradeStrategy } from './modules/TradeStrategy';

@Injectable({
  providedIn: 'root'
})
export class TradeDataService {

  private content = new BehaviorSubject<TradeStrategy>(null);
  public share = this.content.asObservable();

  constructor() { }

  updateData(tradeStrategy:TradeStrategy) {
    this.content.next(tradeStrategy);
  }
}
