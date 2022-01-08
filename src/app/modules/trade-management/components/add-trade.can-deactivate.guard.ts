import { CanDeactivate } from '@angular/router';
import { Injectable } from "@angular/core";
import { AddNewTradeComponent } from './add-trade/add-new-trade.component';



@Injectable()
export class AddTradeCanDeactivateGuard implements CanDeactivate<AddNewTradeComponent> {
  canDeactivate(component: AddNewTradeComponent): boolean {
    if (component) {
      return confirm("Warning: Do you want to discard all the changes?");
    }
    return true;
  }
}
