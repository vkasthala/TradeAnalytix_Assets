import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoldingsComponent } from './holdings.component';
import { HoldingsRoutingModule } from './holdings-routing-module';
import { SharedModule } from 'src/app/modules/shared/shared.module';



@NgModule({
  declarations: [
    HoldingsComponent
  ],
  imports: [
    CommonModule,
    HoldingsRoutingModule,
    // SharedModule
  ]
})
export class HoldingsModule { }
