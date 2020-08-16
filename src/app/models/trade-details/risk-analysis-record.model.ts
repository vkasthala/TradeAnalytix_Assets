import {OptionResult} from './option-result.model';
import {StockResult} from './stock-result.model';
import {SummaryResult} from './summary-result.model';

export class RiskAnalysisRecord {

    stockPriceResult: StockResult;

    optionResults: OptionResult[];

    totalSummary: SummaryResult;

}
