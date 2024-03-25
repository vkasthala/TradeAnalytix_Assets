import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search/search.component';
import { WatchListComponent } from './components/watch-list/watch-list.component';
import { OrdersModalComponent } from './components/orders-modal/orders-modal.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class WatchListModule { }
