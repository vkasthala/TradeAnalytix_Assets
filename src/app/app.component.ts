import { Component } from '@angular/core';
import { PwaService } from './services/pwa.service';
import { Router, NavigationEnd } from '@angular/router';
import * as fromGlobalConfig from './modules/utilities/reducers/global-config.reducer';
import { State, Store } from '@ngrx/store';
import { updateCurrentRoute } from './modules/utilities/actions/global-configs.actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TradeAnalytics';

  constructor(
    private pwaService: PwaService,
    private router: Router,
    private globalStore: Store<fromGlobalConfig.State>
    ) {
    if(this.pwaService.promptEvent) {
      this.pwaService.promptEvent.prompt();
    }
    this.router.events.subscribe(res => { 
      if(res instanceof NavigationEnd) {
          this.globalStore.dispatch(updateCurrentRoute({currentRoute: res.url.split('/').pop()}))
      }
    })
  }
}
