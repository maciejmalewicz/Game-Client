import { ArmyMovementEvent } from './armyMovementEvent';
import { Army } from '../../battles/army';

export class AttackEvent extends ArmyMovementEvent{
    static commonLabel = "ATTACK_EVENT";
}