import { NavigationExtras, Router, CanDeactivate } from '@angular/router';
import { Injectable } from "@angular/core";
import { EditTradePlanComponent } from "./edit-trade-plan.component";

@Injectable()
export class TradePlansCanDeactivateGuard implements CanDeactivate<EditTradePlanComponent> {
  canDeactivate(component: EditTradePlanComponent): boolean {
    if (component) {
      return confirm("Warning: Do you want to discard all the changes?");
    }
    return true;
  }
}
