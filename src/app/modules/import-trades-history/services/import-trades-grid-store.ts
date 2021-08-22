import { DataSource } from '@angular/cdk/table';
import { ImportTradesGridRow } from '../models/import-trades-grid-row.model';
import { CollectionViewer } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { ImportTradesGridService } from './import-trades-grid.service';
import { ImportTradesGridRequest } from '../models/import-trades-grid-request.model';
import { catchError, finalize } from 'rxjs/operators';

export class ImportTradesGridStore extends DataSource<ImportTradesGridRow>{

    private timportTradesSubject = new BehaviorSubject<ImportTradesGridRow[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    totalCount: number = 0;
    protected gridData: any;
    constructor(private importTradesGridService: ImportTradesGridService) {
        super();
    }

    connect(collectionViewer: CollectionViewer): Observable<ImportTradesGridRow[] | readonly ImportTradesGridRow[]> {
        return this.timportTradesSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.timportTradesSubject.complete();
        this.loadingSubject.complete();
    }

    loadTradeStrategies(importTradesGridRequest: ImportTradesGridRequest) {
        this.loadingSubject.next(true);
        this.importTradesGridService.loadImportTrades(importTradesGridRequest).subscribe(result => {
            console.log('result== ==== ==> ',result);
            
            if (result) {
                this.timportTradesSubject.next(result.rows);
                this.totalCount = result.totalCount;
                localStorage.setItem('importTradesGridData', JSON.stringify(result.rows));
                this.gridData = JSON.parse(localStorage.getItem('importTradesGridData'));
            }
        });
    }

}
