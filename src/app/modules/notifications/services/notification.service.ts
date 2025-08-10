import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpService } from '../../shared/services/http.service';
import { NotificationGridRequest } from '../models/notification-grid-request.model';
import { NotificationGridResponse } from '../models/notification-grid-response.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private apiUrl = environment.apiUrl;

  notificationCount: number = 0;

  constructor(private http: HttpService) { }

  getNotifications(gridRequest: NotificationGridRequest): Observable<NotificationGridResponse> {
    return this.http.post<NotificationGridRequest, NotificationGridResponse>(this.apiUrl + '/notification/page', gridRequest);
  }

  getTopNotifications(count: number): Observable<Notification[]> {
    return this.http.post<any, Notification[]>(this.apiUrl + '/notification/top-notifications/' + count, '');
  }

  markAsRead(notificationId: number): Observable<void> {
    return this.http.post<any, void>(this.apiUrl + '/notification/mark-notification-as-read/' + notificationId, '');
  }

  loadNotificationCount(): void {
    this.http.get<number>(this.apiUrl + '/notification/unread-notification-count').subscribe(result => {
      this.notificationCount = result;
    });
  }

}
