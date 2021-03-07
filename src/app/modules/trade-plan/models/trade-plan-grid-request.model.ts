import { TradePlanGridFilter } from "./trade-plan-grid-filter.model";
import { TradePlanGridPage } from "./trade-plan-grid-page.model";
import { TradePlanGridSort } from "./trade-plan-grid-sort.model";

export class TradePlanGridRequest {

    filter: TradePlanGridFilter;

    page: TradePlanGridPage;

    sort: TradePlanGridSort;

}
