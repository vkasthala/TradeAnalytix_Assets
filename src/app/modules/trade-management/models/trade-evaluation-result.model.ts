import { RuleDto } from 'src/app/modules/trade-management/models/rule-dto.model';

export class TradeEvaluationResult {

    maxGain: number;

    maxLoss: number;

    atr: number;

    minStopLoss: number;

    maxStopLoss: number;

    contrarianId: number;

    strategyTypeId: number;

    directionId: number;

    rules: RuleDto[];

}
