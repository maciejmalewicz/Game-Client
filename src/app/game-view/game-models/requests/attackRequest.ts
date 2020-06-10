import { TransferArmyRequest } from './transferArmyRequest';

export interface AttackRequest extends TransferArmyRequest{
    usingCommander: boolean
}