import { ArmyMovementEvent } from './armyMovementEvent';
import { Location } from '../../location';
import { Army } from '../../battles/army';

export class ArmyTransferEventMessage extends ArmyMovementEvent {
    static commonLabel = "ARMY_TRANSFER_EVENT";
    from: Location;
    to: Location;
    army: Army;
}