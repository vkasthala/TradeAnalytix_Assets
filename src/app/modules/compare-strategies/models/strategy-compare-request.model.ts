import { StrategyInput } from "./strategy-input.model";

export class StrategyCompareRequest {

    strategies: StrategyInput[];

    lowerBound: number;

    upperBound: number;

    riskFreeRate: number;

}
