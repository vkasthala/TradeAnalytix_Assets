import { CanDeactivate } from '@angular/router';
import { Injectable } from "@angular/core";
import { EditTradeComponent } from './edit-trade/edit-trade.component';



@Injectable()
export class EditTradeCanDeactivateGuard implements CanDeactivate<EditTradeComponent> {
  canDeactivate(component: EditTradeComponent): boolean {
    if (component) {
      return confirm("Warning: Do you want to discard all the changes?");
    }
    return true;
  }
}
