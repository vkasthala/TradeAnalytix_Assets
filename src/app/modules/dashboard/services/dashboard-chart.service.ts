import { Injectable } from '@angular/core';
import { HttpService } from '../../shared/services/http.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserComment } from '../models/user-comment.model';
import { RecentTrade } from '../models/recent-trade.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardChartService {

  constructor(private httpService: HttpService) { }

  public getUserGoalStatusChart(url: string): Observable<any> {
    return this.httpService.get(environment.apiUrl + url);
  }

  public reportIssue(issue: UserComment): Observable<void> {
    return this.httpService.post<UserComment, void>(environment.apiUrl + "/user/report-an-issue", issue);
  }

  public createUserReview(review: UserComment): Observable<void> {
    return this.httpService.post<UserComment, void>(environment.apiUrl + "/user/review", review);
  }

  public createNewFeature(featureReq: UserComment): Observable<void> {
    return this.httpService.post<UserComment, void>(environment.apiUrl + "/user/new-feature-request", featureReq);
  }

  public createContactUsRequest(contactUsRequest: UserComment): Observable<void> {
    return this.httpService.post<UserComment, void>(environment.apiUrl + "/user/contact-us-request", contactUsRequest);
  }

  public getRecentTrades(): Observable<RecentTrade[]> {
    return this.httpService.get(environment.apiUrl + '/dashboard/recent-trades');
  }  

  public getDailyWorkspace(): Observable<any> {
    return this.httpService.get(environment.apiUrl + '/dashboard/daily-workspace');
  } 

  public updateDailyWorkspace(workspaceReq: DailyWorkspaceUpdate): Observable<any> {
    return this.httpService.post<DailyWorkspaceUpdate, void>(environment.apiUrl + '/dashboard/daily-workspace-update', workspaceReq);
  } 

  public getSurveyQuestions(): Observable<any> {
    return this.httpService.get(environment.apiUrl + '/first-user/questions');
  }

  public updateSurveyResponse(request): Observable<any> {
    return this.httpService.put(environment.apiUrl + '/first-user/update', (request));
  }

}
