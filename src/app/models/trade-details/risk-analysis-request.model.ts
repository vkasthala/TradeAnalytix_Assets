import { StockEntry } from './stock-entry.model';
import { OptionEntry } from './option-entry.model';

export class RiskAnalysisRequest {
    
    stockPrice: StockEntry;

    options: OptionEntry[];

}
