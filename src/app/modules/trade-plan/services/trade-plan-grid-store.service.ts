import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TradePlanGridRequest } from '../models/trade-plan-grid-request.model';
import { TradePlanGridRow } from '../models/trade-plan-grid-row.model';
import { TradePlansService } from './trade-plans.service';

@Injectable({
  providedIn: 'root'
})
export class TradePlanGridStoreService extends DataSource<TradePlanGridRow>{

  private tradePlanSubject = new BehaviorSubject<TradePlanGridRow[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  protected gridData: any;
  totalCount: number = 0;

  constructor(private tradePlanService: TradePlansService) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<TradePlanGridRow[] | readonly TradePlanGridRow[]> {
    return this.tradePlanSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.tradePlanSubject.complete();
    this.loadingSubject.complete();
  }

  loadTradePlanStore(tradePlanGridRequest: TradePlanGridRequest) {
    this.loadingSubject.next(true);
    this.tradePlanService.getTradePlansGridResult(tradePlanGridRequest).subscribe(result => {
      if (result) {
        this.tradePlanSubject.next(result.rows);
        this.totalCount = result.totalCount;
        localStorage.setItem('tradePlanGridData', JSON.stringify(result.rows));
        this.gridData = JSON.parse(localStorage.getItem('tradePlanGridData'));
      }
    });
  }

}
