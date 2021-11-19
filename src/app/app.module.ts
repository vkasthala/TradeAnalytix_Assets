import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

import { LandingComponent } from './modules/login/components/landing.component';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { PwaService } from './modules/shared/services/pwa.service';
import * as fromGlobalConfig from './modules/utilities/reducers/global-config.reducer';
import { globalConfigFeatureKey } from './modules/utilities/reducers/global-config.reducer';
import { reducers } from './modules/utilities/reducers';
import { UtilitiesModule } from './modules/utilities/utilities.module';
import { UtilService } from './modules/utilities/services/util.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ApiInterceptor } from './modules/shared/classes/api-interceptor';
import { HIGHCHARTS_MODULES, ChartModule } from 'angular-highcharts';

import more from 'highcharts/highcharts-more.src';
import exporting from 'highcharts/modules/exporting.src';
import highmaps from 'highcharts/modules/map.src';
import exportingdata from 'highcharts/modules/export-data.src';
import { DateAdapter } from '@angular/material';
import { CustomDateAdapter } from './modules/shared/adapter/custom-date-adapter';
import { JoinWaitlistComponent } from './modules/login/components/join-waitlist/join-waitlist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HelpComponent } from './modules/help/components/help.component';
import { TradeJournalComponent } from './modules/help/components/trade-journal/trade-journal.component';
import { GettingStartedComponent } from './modules/help/components/getting-started/getting-started.component';
import { ImportTradeComponent } from './modules/help/components/import-trade/import-trade.component';
import { TradePlaneComponent } from './modules/help/components/trade-plan/trade-plan.component';
import { HelpRiskAnalysisComponent } from './modules/help/components/risk-analysis/risk-analysis.component';
import { CompareStrategyComponent } from './modules/help/components/compare-strategy/compare-strategy.component';
import { TradingRulesComponent } from './modules/help/components/trading-rules/trading-rules.component';
import { HelpReportsComponent } from './modules/help/components/help-reports/help-reports.component';
import { HelpDataSetupComponent } from './modules/help/components/data-setup/data-setup.component';

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: [globalConfigFeatureKey], rehydrate: true })(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

export function highchartsModules() {
  // apply Highcharts Modules to this array
  return [more, exporting, highmaps, exportingdata];
}

@NgModule({
  declarations: [
    AppComponent,
    JoinWaitlistComponent,
    LandingComponent,
    HelpComponent,
    GettingStartedComponent,
    TradeJournalComponent,
    ImportTradeComponent,
    TradePlaneComponent,
    HelpRiskAnalysisComponent,
    CompareStrategyComponent,
    TradingRulesComponent,
    HelpReportsComponent,
    HelpDataSetupComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DashboardModule,
    UtilitiesModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    ChartModule,
    ToastrModule.forRoot({
      timeOut: 1500,
      positionClass: 'toast-top-center',
      preventDuplicates: false
    }),

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
  providers: [
    PwaService, UtilService,
    { provide: HIGHCHARTS_MODULES, useFactory: highchartsModules },
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    { provide: DateAdapter, useClass: CustomDateAdapter }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    JoinWaitlistComponent
  ]
})
export class AppModule { }
