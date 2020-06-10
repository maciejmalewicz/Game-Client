import { ArmyMovementEvent } from './armyMovementEvent';
import { AreaUnit } from '../../areaUnit';
import { Army } from '../../battles/army';
import { ArmyTransferEventMessage } from './armyTransferEventMessage';

export class ArmyTransferEvent extends ArmyTransferEventMessage {
    static commonLabel = "ARMY_TRANSFER_EVENT";
    fromArea: AreaUnit;
    toArea: AreaUnit;
    army: Army;
}