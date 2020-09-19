import { StockEntry } from '../../shared/models/trade-management/stock-entry.model';
import { OptionEntry } from '../../shared/models/trade-management/option-entry.model';

export class RiskAnalysisRequest {
    
    stockPrice: StockEntry;

    options: OptionEntry[];

}
