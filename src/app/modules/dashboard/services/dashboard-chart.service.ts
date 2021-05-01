import { Injectable } from '@angular/core';
import { HttpService } from '../../shared/services/http.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardChartService {

  constructor(private httpService: HttpService) { }

  public getUserGoalStatusChart(url: string): Observable<any> {
    return this.httpService.get(environment.apiUrl + url);
  }

}
