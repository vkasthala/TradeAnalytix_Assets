import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/modules/notifications/services/notification.service';

@Component({
  selector: 'app-key-insights',
  templateUrl: './key-insights.component.html',
  styleUrls: ['./key-insights.component.scss']
})
export class KeyInsightsComponent implements OnInit {

  insights: Notification[];

  constructor(private notificationService: NotificationService, private router: Router) {

  }

  ngOnInit() {
    this.loadTopInsights();
  }

  loadTopInsights() {
    this.notificationService.getTopNotifications(5).subscribe(result => {
      this.insights = result;
    });
  }

  navigateToInsights() {
    this.router.navigate(['/insights']);
  }

}
