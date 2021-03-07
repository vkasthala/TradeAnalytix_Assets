import { PlannedTrade } from "./planned-trade.model";
import { TradePlanStrategy } from "./trade-plan-strategy.model";

export class TradePlan {

    id: number;

    day: string;

    marketHeadingId: number;

    premarketActivityStatus: boolean;

    mindSetTypeId: number;

    premarketActivities: string;

    perspective: string;

    tradeItemsPlanned: string;

    tradePlanStrategies: TradePlanStrategy[];

    plannedTrades: PlannedTrade[];

    tradeplanAligned: boolean;

    notAlignedReason: string;

    selfReview: string;

    lessons: string;

    statusId: number;

}
