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

  constructor(private http: HttpService) { }

  getNotifications(gridRequest: NotificationGridRequest): Observable<NotificationGridResponse> {
    return this.http.post<NotificationGridRequest, NotificationGridResponse>(this.apiUrl + '/notification/page', gridRequest);
  }

  markAsRead(notificationId: number): Observable<void> {
    return this.http.post<any, void>(this.apiUrl + '/notification/mark-notification-as-read/' + notificationId, '');
  }

}
