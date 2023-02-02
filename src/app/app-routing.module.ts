import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LandingComponent } from './modules/login/components/landing.component';
import { PrivacyPolicyComponent } from './modules/privacy-policy/components/privacy-policy.component';
import { SupportComponent } from './modules/support/support.component';
import { TermsAndConditionsComponent } from './modules/terms-conditions/components/terms-conditions.component';
import { TradeBookComponent } from './modules/tradebook/tradebook.component';
import { ZerodhaComponent } from './modules/zerodha/zerodha.component';

const routes: Routes = [
  {
    path : '',
    redirectTo: 'landing',
    pathMatch : 'full'
  },
  {
    path: 'landing',
    component : LandingComponent
  },
  {
    path: 'support',
    component : SupportComponent
  },
  {
    path: 'zerodha',
    component : ZerodhaComponent
  },
  {
    path: 'tradebook',
    component : TradeBookComponent
  },
  {
    path: 'terms-conditions',
    component : TermsAndConditionsComponent
  },
  {
    path: 'privacy-policy',
    component : PrivacyPolicyComponent
  },
  {
    path : '',
    loadChildren : () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path : '**',
    redirectTo : 'landing',
    pathMatch : 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
