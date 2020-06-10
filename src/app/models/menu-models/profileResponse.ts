import { ResponseBase } from '../responseBase';
import { HistoryUnit } from './historyUnit';

export interface ProfileResponse extends ResponseBase{
    login: string,
    experience: number,
    history: Array<HistoryUnit>
}