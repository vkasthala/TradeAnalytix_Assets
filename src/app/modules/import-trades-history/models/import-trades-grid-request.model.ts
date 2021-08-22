import { ImportTradesGridFilter } from './import-trades-grid-filter.model';
import { ImportTradesGridPage } from './import-trades-grid-page.model';
import { ImportTradesGridSort } from './import-trades-grid-sort.model';

export class ImportTradesGridRequest {

    filters: ImportTradesGridFilter;

    page: ImportTradesGridPage;

    sort: ImportTradesGridSort;

}