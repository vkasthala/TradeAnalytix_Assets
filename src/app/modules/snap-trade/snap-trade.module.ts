import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnapTradeComponentComponent } from './snap-trade-component/snap-trade-component.component';
import { SnapTradeService } from './snap-trade.service';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [SnapTradeComponentComponent],
  imports: [
    CommonModule
  ],
  exports: [SnapTradeComponentComponent],
  providers: [SnapTradeService] 
})
export class SnapTradeModule { }
