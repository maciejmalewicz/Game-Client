import { PostponedEventMessage } from '../postponedEventMessage';
import { AreaUnit } from '../../areaUnit';
import { Location } from '../../location';
import { Army } from '../../battles/army';

export abstract class ArmyMovementEvent extends PostponedEventMessage{
    fromArea: AreaUnit;
    toArea: AreaUnit;
    from: Location;
    to: Location;
    army: Army;
}