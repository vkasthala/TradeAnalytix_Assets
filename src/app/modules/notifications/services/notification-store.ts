import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { NotificationGridRequest } from '../models/notification-grid-request.model';
import { Notification } from "../models/notification.model";
import { NotificationService } from "./notification.service";

export class NotificationStore extends DataSource<Notification>{

    private notificationSubject = new BehaviorSubject<Notification[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    totalCount: number = 0;
    protected gridData: any;
    constructor(private notificationService: NotificationService) {
        super();
    }

    connect(collectionViewer: CollectionViewer): Observable<Notification[] | readonly Notification[]> {
        return this.notificationSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.notificationSubject.complete();
        this.loadingSubject.complete();
    }

    loadNotifications(notificationGridRequest: NotificationGridRequest) {
        this.loadingSubject.next(true);
        this.notificationService.getNotifications(notificationGridRequest).subscribe(result => {
            if (result) {
                this.notificationSubject.next(result.rows);
                this.totalCount = result.totalCount;
                this.gridData = result.rows;
            }
        });
    }

}
