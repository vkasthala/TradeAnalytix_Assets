import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { StrategiesGridPage } from 'src/app/modules/trade-strategies/models/strategies-grid-page.model';
import { StrategiesGridSort } from 'src/app/modules/trade-strategies/models/strategies-grid-sort.model';
import { NotificationGridPage } from './models/notification-grid-page.model';
import { NotificationGridRequest } from './models/notification-grid-request.model';
import { Notification } from './models/notification.model';
import { NotificationStore } from './services/notification-store';
import { NotificationService } from './services/notification.service';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements AfterViewInit, OnInit {

  expandIndex: any;
  displayedColumns = ['day', 'msg', 'read'];
  pageSize: number = 20

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: NotificationStore;
  notificationGridRequest: NotificationGridRequest = this.getInitialRequest();

  constructor(private notificationService: NotificationService,
    private router: Router,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.dataSource = new NotificationStore(this.notificationService);
    this.loadPage();
  }

  loadPage() {
    this.dataSource.loadNotifications(this.notificationGridRequest);
  }

  reload() {
    this.notificationGridRequest.page.pageNumber = 0;
    this.loadPage();
  }

  handlePage($event) {

  }

  ngAfterViewInit() {

    this.paginator.page
      .pipe(
        tap(() => {
          console.log('here...');
          this.updatePageSortParams();
          this.loadPage();
        })
      )
      .subscribe();


  }

  getInitialRequest(): NotificationGridRequest {
    let request: NotificationGridRequest = new NotificationGridRequest();
    let pageRequest: NotificationGridPage = new NotificationGridPage();
    pageRequest.pageNumber = 0;
    pageRequest.pageSize = 20;
    request.page = pageRequest;
    return request;
  }

  updatePageSortParams() {
    let pageRequest: StrategiesGridPage = this.notificationGridRequest.page;
    if (!pageRequest) {
      pageRequest = new NotificationGridPage();
      this.notificationGridRequest.page = pageRequest;
    }
    pageRequest.pageNumber = this.paginator.pageIndex;
    pageRequest.pageSize = this.paginator.pageSize;

    let sortRequest: StrategiesGridSort = this.notificationGridRequest.sort;
    if (!sortRequest) {
      sortRequest = new StrategiesGridSort();
      this.notificationGridRequest.sort = sortRequest;
    }
    /*sortRequest.column = this.sort.active;
    if (this.sort.active) {
      sortRequest.order = this.sort.direction;
    }*/
  }

  markAsRead(notification: Notification) {
    this.notificationService.markAsRead(notification.id).subscribe(result => {
      this.loadPage();
      this.notificationService.loadNotificationCount();
    });
  }

}
