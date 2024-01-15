import { StrategiesGridFilter } from './strategies-grid-filter.model';
import { StrategiesGridPage } from './strategies-grid-page.model';
import { StrategiesGridSort } from './strategies-grid-sort.model';

export class TradeStrategyGridRequest {

    filters: StrategiesGridFilter;

    page: StrategiesGridPage;

    sort: StrategiesGridSort;

}