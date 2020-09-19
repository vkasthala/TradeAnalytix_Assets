import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './modules/login/components/landing.component';

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
    path : '',
    loadChildren : './modules/home/home.module#HomeModule'
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
