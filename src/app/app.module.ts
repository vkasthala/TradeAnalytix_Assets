import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PwaService } from './services/pwa.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as fromGlobalConfig from './modules/utilities/reducers/global-config.reducer';
import {globalConfigFeatureKey} from './modules/utilities/reducers/global-config.reducer';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './modules/utilities/reducers';
import { UtilitiesModule } from './modules/Utilities/utilities.module';
import { UtilService } from './services/util.service';

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: [globalConfigFeatureKey], rehydrate: true })(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    UtilitiesModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreModule.forFeature(fromGlobalConfig.globalConfigFeatureKey, fromGlobalConfig.reducer),
  ],
  providers: [PwaService, UtilService],
  bootstrap: [AppComponent]
})
export class AppModule { }
