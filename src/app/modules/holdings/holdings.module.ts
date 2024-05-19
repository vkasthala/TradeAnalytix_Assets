import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoldingsComponent } from './holdings.component';
import { HoldingsRoutingModule } from './holdings-routing-module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HoldingsComponent
  ],
  imports: [
    HoldingsRoutingModule,
    SharedModule
  ]
})
export class HoldingsModule { }
