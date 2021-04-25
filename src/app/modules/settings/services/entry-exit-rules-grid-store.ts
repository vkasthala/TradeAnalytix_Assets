import { DataSource } from '@angular/cdk/table';
import { EntryExitRulesGridRow } from '../models/entry-exit-rules-grid-row.model';
import { CollectionViewer } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { EntryExitRulesService } from './entry-exit-rules.service';
import { EntryExitRulesGridRequest } from '../models/entry-exit-rules-grid-request.model';
import { SettingsService } from './settings.service';

import { EntryExitRule } from'../models/entry-exit-rules.model';

export class EntryExitRulesGridStore extends DataSource<EntryExitRulesGridRow>{

    private entryExitSubject = new BehaviorSubject<EntryExitRule[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    totalCount: number = 0;

    constructor(private entryExitGridService: EntryExitRulesService,
        private settingsService: SettingsService) {
        super();
    }

    connect(collectionViewer: CollectionViewer): Observable<EntryExitRule[] | readonly EntryExitRule[]> {
        return this.entryExitSubject.asObservable();
    }
    
    disconnect(collectionViewer: CollectionViewer): void {
        this.entryExitSubject.complete();
        this.loadingSubject.complete();
    }

    loadEntryExitRulesStore(entryExitRulesGridRequest: EntryExitRulesGridRequest) {
        this.loadingSubject.next(true);
        this.settingsService.getUserEntryExitRules(entryExitRulesGridRequest).subscribe(result => {
          if (result) {
            this.entryExitSubject.next(result.rows);
            this.totalCount = result.totalCount;
          }
        });
      }
    }
