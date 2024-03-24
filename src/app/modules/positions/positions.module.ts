import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PositionsGridComponent } from './components/positions-grid/positions-grid.component';
import { SharedModule } from '../shared/shared.module';
import { PositionsComponent } from './positions.component';
import { PositionsRoutingModule } from './positions-routing.module';
import { HoldingsComponent } from './components/holdings/holdings.component';

@NgModule({
  declarations: [
    PositionsComponent, 
    PositionsGridComponent,
    HoldingsComponent
  ],
  imports: [
    PositionsRoutingModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PositionsModule { }
