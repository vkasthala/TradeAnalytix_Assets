import { DataSource } from '@angular/cdk/table';
import { TradeStrategyGridRow } from '../models/trade-strategy-grid-row.model';
import { CollectionViewer } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { TradeStrategyGridService } from './trade-strategy-grid.service';
import { TradeStrategyGridRequest } from '../models/trade-strategy-grid-request.model';
import { catchError, finalize } from 'rxjs/operators';

export class TradeStrategyGridStore extends DataSource<TradeStrategyGridRow>{

    private tradeStrategySubject = new BehaviorSubject<TradeStrategyGridRow[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    totalCount: number = 0;

    constructor(private tradeStrategyGridService: TradeStrategyGridService) {
        super();
    }

    connect(collectionViewer: CollectionViewer): Observable<TradeStrategyGridRow[] | readonly TradeStrategyGridRow[]> {
        return this.tradeStrategySubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.tradeStrategySubject.complete();
        this.loadingSubject.complete();
    }

    loadTradeStrategies(tradeStrategyGridRequest: TradeStrategyGridRequest) {
        this.loadingSubject.next(true);
        this.tradeStrategyGridService.loadTradeStrategies(tradeStrategyGridRequest).subscribe(result => {
            if (result) {
                this.tradeStrategySubject.next(result.rows);
                this.totalCount = result.totalCount;
            }
        });
    }

}
