import { CompareStrategyDetails } from "./compare-strategy-details.model";
import { StrategyInput } from "./strategy-input.model";

export class StrategyCompareRequest {

    strategies: StrategyInput[];

    lowerBound: number;

    upperBound: number;

    riskFreeRate: number;

    stockPrice: number;

}
