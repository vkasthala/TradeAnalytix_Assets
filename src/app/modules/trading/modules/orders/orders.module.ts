import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ExecutedOrdersComponent } from './executed-orders/executed-orders.component';
import { CancelOrderPopupComponent } from './open-orders/cancel-order-popup/cancel-order-popup.component';
import { OpenOrdersComponent } from './open-orders/open-orders.component';
import { OrdersRoutingModule } from './orders-routing-module';
import { OrdersComponent } from './orders.component';


@NgModule({
  declarations: [OrdersComponent, OpenOrdersComponent, ExecutedOrdersComponent, CancelOrderPopupComponent],
  imports: [
    CommonModule,
    SharedModule,
    OrdersRoutingModule
    
  ]
})
export class OrdersModule { }