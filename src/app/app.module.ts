import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LandingComponent } from './modules/login/components/landing.component';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { PwaService } from './modules/shared/services/pwa.service';
import * as fromGlobalConfig from './modules/utilities/reducers/global-config.reducer';
import { globalConfigFeatureKey } from './modules/utilities/reducers/global-config.reducer';
import { reducers } from './modules/utilities/reducers';
import { UtilitiesModule } from './modules/Utilities/utilities.module';
import { UtilService } from './modules/utilities/services/util.service';


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
    HttpClientModule,
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
