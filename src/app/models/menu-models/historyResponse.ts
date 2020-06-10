import { ResponseBase } from '../responseBase';
import { HistoryUnit } from './historyUnit';

export interface HistoryResponse extends ResponseBase{

    games: Array<HistoryUnit>;
}