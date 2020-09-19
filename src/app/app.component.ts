import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import * as fromGlobalConfig from './modules/utilities/reducers/global-config.reducer';
import { State, Store } from '@ngrx/store';
import { updateCurrentRoute } from './modules/utilities/actions/global-configs.actions';
import { PwaService } from './modules/shared/services/pwa.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Trade Analytix';

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
          let currentRoute = '';
          if(res.url.split('/').length > 3) {
            currentRoute = res.url.split('/')[2];
          }else {
            currentRoute = res.url.split('/').pop()
          }
          this.globalStore.dispatch(updateCurrentRoute({currentRoute: currentRoute}))
      }
    })
  }
}
