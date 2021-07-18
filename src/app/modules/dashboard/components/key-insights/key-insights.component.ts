import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/modules/notifications/services/notification.service';

@Component({
  selector: 'app-key-insights',
  templateUrl: './key-insights.component.html',
  styleUrls: ['./key-insights.component.scss']
})
export class KeyInsightsComponent implements OnInit {

  insights: Notification[];

  constructor(private notificationService: NotificationService) {

  }

  ngOnInit() {
    this.loadTopInsights();
  }

  loadTopInsights() {
    this.notificationService.getTopNotifications(5).subscribe(result => {
      this.insights = result;
    });
  }



}
