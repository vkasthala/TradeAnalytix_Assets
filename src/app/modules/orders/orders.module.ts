import { NgModule } from '@angular/core';
import { OrdersComponent } from './orders.component';
import { OpenOrdersComponent } from './open-orders/open-orders.component';
import { ExecutedOrdersComponent } from './executed-orders/executed-orders.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { OrdersRoutingModule } from './orders-routing-module';

@NgModule({
  declarations: [OrdersComponent, OpenOrdersComponent, ExecutedOrdersComponent],
  imports: [
    CommonModule,
    SharedModule,
    OrdersRoutingModule
    
  ]
})
export class OrdersModule { }