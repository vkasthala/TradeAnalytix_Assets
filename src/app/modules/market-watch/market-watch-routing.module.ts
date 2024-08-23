import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WatchListComponent } from '../watch-list/components/watch-list/watch-list.component';

const routes: Routes = [{
  path: '',
  component: WatchListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketWatchRoutingModule { }
