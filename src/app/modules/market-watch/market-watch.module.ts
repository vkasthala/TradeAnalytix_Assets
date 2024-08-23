import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketWatchRoutingModule } from './market-watch-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    MarketWatchRoutingModule
  ]
})
export class MarketWatchModule { }
